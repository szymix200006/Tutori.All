package com.example.demo.Entities;

import jakarta.persistence.Lob;
import lombok.*;

import java.sql.Blob;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TutorialResponse {
    private Integer id;
    private String title;
    private byte[] cover;
    private String contents;
    private String user;
    private LocalDateTime createdAt;
    private List<BlobResponse> files;
}
