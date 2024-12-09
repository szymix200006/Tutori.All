package com.example.demo.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DocumentBlob {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private String media;

    @ManyToOne
    @JoinColumn(name = "document_id")
    private Tutorial tutorial;
}
