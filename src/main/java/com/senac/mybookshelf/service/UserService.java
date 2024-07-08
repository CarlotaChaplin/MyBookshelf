package com.senac.mybookshelf.service;

import com.senac.mybookshelf.model.User;
import com.senac.mybookshelf.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public User login(String email, String password) {
        var user = this.findByEmail(email);
        if (passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }
}
