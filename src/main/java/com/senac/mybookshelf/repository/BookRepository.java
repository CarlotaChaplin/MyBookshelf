package com.senac.mybookshelf.repository;

import com.senac.mybookshelf.model.Book;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    List<Book> findByUser_Id(Integer userId);
    
    @Query("SELECT b FROM Book b WHERE b.user.id = :userId AND b.title like %:title%")
    List<Book> findByUserIdAndTitle(@Param("userId") Integer userId, @Param("title") String title);
}
