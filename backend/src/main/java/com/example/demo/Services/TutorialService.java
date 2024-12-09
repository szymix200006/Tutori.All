package com.example.demo.Services;

import com.example.demo.Entities.*;
import com.example.demo.Repositories.TutorialRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TutorialService {
    private final TutorialMapper tutorialMapper;
    private final TutorialRepository tutorialRepository;
    private final FileStorageService fileStorageService;
    public Integer save(TutorialRequest tutorialRequest, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Tutorial tutorial = tutorialMapper.toBook(tutorialRequest);
        tutorial.setUser(user);
        return tutorialRepository.save(tutorial).getId();
    }

    public TutorialResponse findById(Integer tutorialId) {
        return tutorialRepository.findById(tutorialId).map(tutorialMapper::toTutorialResponse).orElseThrow(() -> new EntityNotFoundException("No tutorial matches provided id"));
    }

    public List<TutorialCover> findAllTutorials(String query) {
        return tutorialRepository.findAllWithQuery(query).stream().map(tutorialMapper::toTutorialCover).toList();
    }

    public void uploadTutorialCoverPicture(MultipartFile file, Authentication connectedUser, Integer tutorialId) {
        Tutorial tutorial = tutorialRepository.findById(tutorialId)
                .orElseThrow(() -> new EntityNotFoundException("No tutorial with provided id"));
        User user = ((User) connectedUser.getPrincipal());
        var tutorialCover = fileStorageService.saveFile(file, user.getId());
        tutorial.setCover(tutorialCover);
        tutorialRepository.save(tutorial);
    }

    public void uploadTutorialFiles(List<MultipartFile> files,List<String> names, Authentication connectedUser, Integer tutorialId) {
        Tutorial tutorial = tutorialRepository.findById(tutorialId)
                .orElseThrow(() -> new EntityNotFoundException("No tutorial with provided Id"));
        User user = ((User) connectedUser.getPrincipal());
        List<DocumentBlob> tutorialFiles = new ArrayList<>();
        for(int i = 0; i < files.size(); i++) {
            DocumentBlob blob = DocumentBlob
                    .builder()
                    .media(fileStorageService.saveFile(files.get(i), user.getId()))
                    .tutorial(tutorial)
                    .name(names.get(i))
                    .build();
            tutorialFiles.add(blob);
        }
        tutorial.setMediaList(tutorialFiles);
        tutorialRepository.save(tutorial);
    }
}
