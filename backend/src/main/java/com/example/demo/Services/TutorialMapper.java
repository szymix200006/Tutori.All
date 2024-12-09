package com.example.demo.Services;

import com.example.demo.Entities.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TutorialMapper {
    public Tutorial toBook(TutorialRequest tutorialRequest) {
        return Tutorial.builder()
                .title(tutorialRequest.title())
                //.cover(tutorialRequest.cover())
                .contents(tutorialRequest.contents())
                .category(tutorialRequest.category())
//                .mediaList(tutorialRequest.files())
                .build();
    }

    public TutorialResponse toTutorialResponse(Tutorial tutorial) {
        List<BlobResponse> tutorialFiles = new ArrayList<>();
        for(DocumentBlob tutorialMedia : tutorial.getMediaList()) {
            BlobResponse blobResponse = BlobResponse
                    .builder()
                    .file(FileUtils.readFileFromLocation(tutorialMedia.getMedia()))
                    .fileName(tutorialMedia.getName())
                    .build();
            tutorialFiles.add(blobResponse);
        }

        return TutorialResponse
                .builder()
                .id(tutorial.getId())
                .user(tutorial.getUser().getFullUsername())
                .contents(tutorial.getContents())
                .cover(FileUtils.readFileFromLocation(tutorial.getCover()))
                .createdAt(tutorial.getCreatedDate())
                .title(tutorial.getTitle())
                .files(tutorialFiles)
                .build();
    }

    public TutorialCover toTutorialCover(Tutorial tutorial) {
        return TutorialCover.builder()
                .cover(FileUtils.readFileFromLocation(tutorial.getCover()))
                .id(tutorial.getId())
                .title(tutorial.getTitle())
                .user(tutorial.getUser().getFullUsername())
                .category(tutorial.getCategory())
                .createdAt(tutorial.getCreatedDate().toString())
                .build();
    }
}
