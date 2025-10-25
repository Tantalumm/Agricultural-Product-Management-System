package Agricultural_Product_Management_System.backend.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequest (
  @NotBlank String username,
  @NotBlank @Size(min = 8) String password
){}
