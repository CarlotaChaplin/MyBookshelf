package com.senac.mybookshelf.repository;

import com.senac.mybookshelf.model.Book;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    List<Book> findByUser_Id(Integer userId);
}
