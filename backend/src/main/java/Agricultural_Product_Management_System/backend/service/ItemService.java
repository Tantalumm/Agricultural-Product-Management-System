package Agricultural_Product_Management_System.backend.service;

import Agricultural_Product_Management_System.backend.entity.Item;
import Agricultural_Product_Management_System.backend.model.ItemRequest;
import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import Agricultural_Product_Management_System.backend.repository.ItemRepository;


@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

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
        if(name == null || name.isEmpty())
        {
            return itemRepository.findAll(pageable);
        }
        return itemRepository.findAllByNameContainingIgnoreCase(name.trim(), pageable);
    }

    public Item readItem(Long id) {
        return itemRepository.findById(id).orElse(null);
    }
}
