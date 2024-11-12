package com.example.demo.Entities;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.sql.Blob;
import java.util.List;

public record TutorialRequest(
        @NotNull(message = "Title cannot be null")
        @NotEmpty(message = "Title cannot be empty")
        String title,

        byte[] cover,
        @NotNull(message = "Contents cannot be null")
        @NotEmpty(message = "Contents cannot be empty")
        String contents,

        List<byte[]> files
)
{
}
