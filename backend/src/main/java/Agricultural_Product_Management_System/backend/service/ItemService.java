package Agricultural_Product_Management_System.backend.service;

import Agricultural_Product_Management_System.backend.entity.Item;
import Agricultural_Product_Management_System.backend.model.ItemRequest;
import Agricultural_Product_Management_System.backend.model.ItemUpdateRequest;
import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import Agricultural_Product_Management_System.backend.repository.ItemRepository;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final S3PresignService s3PresignService;
    private final String bucketname;

    public ItemService(@Value("${aws.s3.bucketName}") String bucketName,
            ItemRepository itemRepository,
            S3PresignService s3PresignService) {
        this.itemRepository = itemRepository;
        this.s3PresignService = s3PresignService;
        this.bucketname = bucketName;
    }

    @Transactional
    public Item postItem(ItemRequest request) {
        Item item = new Item();
        item.setName(request.name());
        item.setDescription(request.description());
        item.setPrice(request.price());
        item.setQuantity(request.quantity());
        item.setImageUrl(request.imageUrl());
        return itemRepository.save(item);
    }

    public Page<Item> searchItem(String name, Pageable pageable) {
        Page<Item> items;

        if (name == null || name.isEmpty()) {
            items = itemRepository.findAll(pageable);
        } else {
            items = itemRepository.findAllByNameContainingIgnoreCase(name.trim(), pageable);
        }

        items.forEach(item -> {
            if (item.getImageUrl() != null && !item.getImageUrl().isEmpty()) {
                String key = item.getImageUrl();
                String url = s3PresignService.generateGetUrl(bucketname, key, 3600).toString();
                item.setImageUrl(url);
            }
        });

        return items;
    }

    public Item readItem(Long id) {
        Item item = itemRepository.findById(id).orElse(null);
        if (item.getImageUrl() != null && !item.getImageUrl().isEmpty()) {
            String key = item.getImageUrl();
            String url = s3PresignService.generateGetUrl(bucketname, key, 3600).toString();
            item.setImageUrl(url);
        }
        return item;
    }

    public Item updateItem(Long id, ItemUpdateRequest request) {
        Item existingItem = itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));

        if (request.name() != null && !request.name().isBlank()) {
            existingItem.setName(request.name());
        }
        if (request.description() != null && !request.description().isBlank()) {
            existingItem.setDescription(request.description());
        }
        if (request.price() != null) {
            existingItem.setPrice(request.price());
        }
        if (request.quantity() != null) {
            existingItem.setQuantity(request.quantity());
        }
        if (request.imageUrl() != "") {
            existingItem.setImageUrl(request.imageUrl());
        }

        return itemRepository.save(existingItem);
    }

    public void deleteItem(Long id) {
        Item existingItem = itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));

        itemRepository.delete(existingItem);
    }
}
