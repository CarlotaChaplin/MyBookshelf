package com.senac.mybookshelf.service;

import com.senac.mybookshelf.model.Book;
import com.senac.mybookshelf.model.User;
import com.senac.mybookshelf.repository.BookRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {
    @Autowired
    BookRepository bookRepository;
    
    public Book create(Book book, User user) {
        book.setId(null);
        book.setUser(user);
        bookRepository.save(book);
        return book;
    }
    
    public Book getByID(Integer id) {
        return bookRepository.findById(id).orElse(null);
    }
    
    public List<Book> getAll(Integer userId) {
        return bookRepository.findByUser_Id(userId);
    }
    
    public Book update(Integer Id, Book book) {
        Book newBook = getByID(Id);
        newBook.setName(book.getName());
        newBook.setTitle(book.getTitle());
        newBook.setGender(book.getGender());
        bookRepository.save(newBook);
        return newBook;
    }
    
    public void delete(Integer Id) {
        Book book = getByID(Id);
        bookRepository.deleteById(book.getId());
    }
}
