package Agricultural_Product_Management_System.backend.controller;

import Agricultural_Product_Management_System.backend.dto.LoginRequest;
import Agricultural_Product_Management_System.backend.dto.LoginResponse;
import Agricultural_Product_Management_System.backend.dto.RegisterRequest;
import Agricultural_Product_Management_System.backend.dto.RegisterResponse;
import Agricultural_Product_Management_System.backend.entity.User;
import Agricultural_Product_Management_System.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest request){
        User user = authService.registerUser(request);
        return ResponseEntity.ok(RegisterResponse.from(user));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request){
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

}
