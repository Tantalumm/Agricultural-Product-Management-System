package controller;

import entity.Item;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.ItemService;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor

public class ItemController {

    private final ItemService itemService;

    @PostMapping("/item")
    public Item postItem(@RequestBody Item item) {
        return itemService.postItem(item);
    }
}
