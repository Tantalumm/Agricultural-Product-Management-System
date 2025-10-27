package Agricultural_Product_Management_System.backend.model;

import jakarta.validation.constraints.NotBlank;

public record ItemRequest(
    @NotBlank String name,
    @NotBlank String description,
    @NotBlank Double price,
    @NotBlank Integer quantity,
    @NotBlank String imageUrl
) {}
