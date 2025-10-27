package Agricultural_Product_Management_System.backend.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest
(
    @NotBlank String username,
    @Email String email,
    @NotBlank String name,
    @NotBlank @Size(min = 8) String password
){}
