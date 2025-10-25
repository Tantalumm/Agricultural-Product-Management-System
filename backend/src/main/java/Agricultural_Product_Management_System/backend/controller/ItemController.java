package Agricultural_Product_Management_System.backend.controller;

import Agricultural_Product_Management_System.backend.model.ItemRequest;
import Agricultural_Product_Management_System.backend.service.S3Service;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import Agricultural_Product_Management_System.backend.service.ItemService;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@RestController
@RequestMapping("/item")
@RequiredArgsConstructor
public class ItemController {

    private final S3Service s3Service;

    private final ItemService itemService;

    @PostMapping("/create")
    public String postItem(@ModelAttribute ItemRequest request,
                           @RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = s3Service.uploadFile(file);

            itemService.postItem(new ItemRequest(request.name(), request.description(),
                    request.price(), request.quantity(), imageUrl));

            return "Item created successfully with image URL: " + imageUrl;
        } catch (Exception ex) {
            ex.printStackTrace();
            return "Error while uploading file: " + ex.getMessage();
        }
    }
}
