package service;

import entity.Item;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import repository.ItemRepository;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

    public Item postItem(Item item) {
        return itemRepository.save(item);
    }
}
