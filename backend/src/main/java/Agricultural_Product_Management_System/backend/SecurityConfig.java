package Agricultural_Product_Management_System.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import java.util.List;

@Configuration
public class SecurityConfig {
    @Bean
    SecurityFilterChain FilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // ปิด CSRF สำหรับ REST API
                .cors(cors -> cors.configurationSource(request -> {
                    var corsConfig = new org.springframework.web.cors.CorsConfiguration();
                    corsConfig.setAllowedOrigins(List.of("http://localhost:3000")); // อนุญาตให้โดเมนนี้เข้าถึง
                    corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    corsConfig.setAllowedHeaders(List.of("Authorization", "Content-Type"));
                    corsConfig.setAllowCredentials(true);  // หากต้องการให้ส่ง cookie หรือ credentials
                    return corsConfig;
                }))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/register", "/auth/login", "/item/create").permitAll() // เปิดทางให้สมัคร
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // กันเคส CORS preflight
                        .anyRequest().authenticated()
                );
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

