package Agricultural_Product_Management_System.backend.service;

import Agricultural_Product_Management_System.backend.entity.Item;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import Agricultural_Product_Management_System.backend.repository.ItemRepository;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

    public Item postItem(Item item) {
        return itemRepository.save(item);
    }
}
