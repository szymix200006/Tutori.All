package com.example.demo.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Blob;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Media {
    @Id
    @GeneratedValue
    private Integer id;
    @Column(name = "media_object")
    private Blob mediaObject;

    @ManyToMany(mappedBy = "mediaList")
    @JsonIgnore
    private List<Tutorial> tutorialList;
}
