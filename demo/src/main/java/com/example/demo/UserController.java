package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepo repo;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (repo.existsById(user.getEmail())) {
            return "User already exists";
        }
        repo.save(user);
        return "User registered successfully";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User existing = repo.findByEmailAndPassword(user.getEmail(), user.getPassword());
        if (existing != null) {
            return "Login successful";
        }
        return "Invalid credentials";
    }
}
