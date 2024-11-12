package com.example.demo.Repositories;

import com.example.demo.Entities.Tutorial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TutorialRepository extends JpaRepository<Tutorial, Integer> {
    @Query("""
            SELECT tutorial 
            FROM Tutorial tutorial 
            WHERE tutorial.title 
            LIKE '%:query%'
           """)
    List<Tutorial> findAllWithQuery(String query);
}
