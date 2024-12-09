package com.example.demo.Entities;

import jakarta.persistence.Lob;
import lombok.*;

import java.sql.Blob;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TutorialCover {
    private Integer id;
    private String title;
    private byte[] cover;
    private String user;
    private String category;
    private String createdAt;
}
