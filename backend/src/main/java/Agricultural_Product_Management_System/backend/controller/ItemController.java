package Agricultural_Product_Management_System.backend.controller;

import Agricultural_Product_Management_System.backend.entity.Item;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import Agricultural_Product_Management_System.backend.service.ItemService;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ItemController {

    private final ItemService itemService;

    @PostMapping("/item")
    public Item postItem(@RequestBody Item item) {
        return itemService.postItem(item);
    }
}
