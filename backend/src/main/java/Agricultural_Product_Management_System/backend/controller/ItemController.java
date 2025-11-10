package Agricultural_Product_Management_System.backend.controller;

import Agricultural_Product_Management_System.backend.entity.Item;
import Agricultural_Product_Management_System.backend.model.ItemRequest;
import Agricultural_Product_Management_System.backend.service.S3PresignService;
import Agricultural_Product_Management_System.backend.service.S3Service;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import Agricultural_Product_Management_System.backend.service.ItemService;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.URI;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

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
            String imageUpload = s3Service.uploadFile(file);

            String imageUrl = extractKey(imageUpload);

            itemService.postItem(new ItemRequest(request.name(), request.description(),
                    request.price(), request.quantity(), imageUrl));

            return "Item created successfully with image URL: " + imageUrl;
        } catch (Exception ex) {
            ex.printStackTrace();
            return "Error while uploading file: " + ex.getMessage();
        }
    }

    @GetMapping("/search")
    public Page<Item> SearchItem(@RequestParam(required = false) String name,
                                 @RequestParam(defaultValue = "0") int page,
                                 @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return itemService.searchItem(name, pageable);
    }

    @GetMapping("/read/{id}")
    public Item ReadItem(@PathVariable Long id) {
        return itemService.readItem(id);
    }

    @PutMapping("/update/{id}")
    public String UpdateItem(@PathVariable Long id,
                           @ModelAttribute ItemRequest request,
                           @RequestParam("file") MultipartFile file) {
        try{
            String imageUrl = s3Service.uploadFile(file);

            itemService.updateItem(id, new ItemRequest(request.name(), request.description(), request.price(), request.quantity(), imageUrl));
            return "Item Update Successfully";
        }
        catch (Exception ex){
            ex.printStackTrace();
            return "Item Update Failed" + ex.getMessage();
        }
    }

    @DeleteMapping("/delete/{id}")
    public String DeleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return "Item deleted successfully";
    }

    private static String extractKey(String s3Url) {
        URI uri = URI.create(s3Url);
        // uri.getPath() จะได้เช่น "/images/%E0%B8%A1%E0%B8%B2..."
        String encodedPath = uri.getPath();
        String pathNoLeadingSlash = encodedPath.startsWith("/") ? encodedPath.substring(1) : encodedPath;
        // decode %E0%B8... -> UTF-8 จริง
        return URLDecoder.decode(pathNoLeadingSlash, StandardCharsets.UTF_8);
    }
}
