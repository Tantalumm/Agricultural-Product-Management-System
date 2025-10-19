package Agricultural_Product_Management_System.backend.service;

import Agricultural_Product_Management_System.backend.dto.RegisterRequest;
import Agricultural_Product_Management_System.backend.entity.User;
import Agricultural_Product_Management_System.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    @Transactional
    public User registerUser(RegisterRequest request) {
        if (userRepository.existsByUsername(request.username())) {
            throw new IllegalArgumentException("Username is already taken");
        }
        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email is already registered");
        }
        User user = new User();
        user.setUsername(request.username().trim());
        user.setName(request.name().trim());
        user.setEmail(request.email().toLowerCase().trim());
        user.setPassword(encoder.encode(request.password()));
        return userRepository.save(user);
    }
}


