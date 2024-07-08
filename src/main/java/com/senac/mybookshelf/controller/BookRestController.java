package com.senac.mybookshelf.controller;

import com.senac.mybookshelf.model.Book;
import com.senac.mybookshelf.model.User;
import com.senac.mybookshelf.service.BookService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/book")
public class BookRestController {
    @Autowired
    BookService service;
    
    private User getUserSession(HttpServletRequest request) {
        HttpSession sessao = request.getSession(); 
        if (sessao == null) {
            return null;
        }

        var user = (User) sessao.getAttribute("user");
        return user;
    }
    
    @GetMapping
    public ResponseEntity<List> getAll(HttpServletRequest request) {
        HttpSession sessao = request.getSession(); 
        if (sessao == null) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        
        var user = (User) sessao.getAttribute("user");
        if (user == null) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        List<Book> books = service.getAll(user.getId());
        return new ResponseEntity<>(books, HttpStatus.OK);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List> search(HttpServletRequest request, @RequestParam String title) {
        var user = this.getUserSession(request);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        
        var search = service.search(user.getId(), title);
        return new ResponseEntity<>(search, HttpStatus.ACCEPTED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Book> getById(@PathVariable Integer id) {
        var book = service.getByID(id);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }
    
    @PostMapping
    public ResponseEntity<Book> create(@RequestBody Book book, HttpServletRequest request) {
        HttpSession sessao = request.getSession(); 
        if (sessao == null) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        
        var user = (User) sessao.getAttribute("user");
        if (user == null) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        var created = service.create(book, user);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Book> update(@PathVariable Integer id, @RequestBody Book book) {
        var updated = service.update(id, book);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Integer id) {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
}
