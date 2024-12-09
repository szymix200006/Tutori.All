package com.example.demo.Entities;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BlobResponse {
    private byte[] file;
    private String fileName;
}
