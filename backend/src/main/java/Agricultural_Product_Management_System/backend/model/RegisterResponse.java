package Agricultural_Product_Management_System.backend.model;

import Agricultural_Product_Management_System.backend.entity.User;

public record RegisterResponse (
    Long id,
    String username,
    String email,
    String name
){
    public static RegisterResponse from(User user) {   // ← ใช้ชื่อสั้นได้เลย
        return new RegisterResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getName()
        );
    }
}
