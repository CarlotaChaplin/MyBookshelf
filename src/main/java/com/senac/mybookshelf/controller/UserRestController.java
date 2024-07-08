package com.senac.mybookshelf.controller;

import com.senac.mybookshelf.model.User;
import com.senac.mybookshelf.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserRestController {
    @Autowired
    UserService service;
    
    @GetMapping("/me")
    public ResponseEntity<User> me(HttpServletRequest request) {
        HttpSession sessao = request.getSession(); 
        if (sessao == null) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        
        var user = sessao.getAttribute("user");
        if (user == null) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        
        return new ResponseEntity(user, HttpStatus.OK);
    }
    
    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user, HttpServletRequest request) {
        var created = service.save(user);
        
        HttpSession sessao = request.getSession(); 
        if(sessao != null){
            sessao.setAttribute("user", created);
        } 
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
    
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user, HttpServletRequest request) {
        var login = service.login(user.getEmail(), user.getPassword());
        if (login == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        
        HttpSession sessao = request.getSession(); 
        if(sessao != null){
            sessao.setAttribute("user", login);
        } 
        
        return new ResponseEntity<>(login, HttpStatus.OK);
    }
}
