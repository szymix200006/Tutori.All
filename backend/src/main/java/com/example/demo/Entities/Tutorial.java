package com.example.demo.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Blob;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Tutorial {
    @Id
    @GeneratedValue
    private Integer id;
    private String cover;
    private String title;
    private String contents;
    private String category;

    @CreatedDate
    @Column(name="created_date", nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

   @CreatedBy
   @Column(nullable = false, updatable = false)
   private Integer createdBy;

   @OneToMany(mappedBy = "tutorial", cascade = CascadeType.ALL)
   @JsonIgnore
   private List<DocumentBlob> mediaList;


}
