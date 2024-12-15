import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderUploadComponent } from '../../components/header-upload/header-upload.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { LatexServiceService } from '../../services/latex-service.service';
import { TutorialServiceService } from '../../services/tutorial-service.service';
import { ToastrService } from 'ngx-toastr';
import { Base64ConvertService } from '../../services/base64-convert.service';
import { TutorialCategory } from '../../utils/tutorial-category';

@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [HeaderUploadComponent, ReactiveFormsModule, CommonModule],
  template: `
    <main class="upload-page">
      <app-header-upload/>
      <section class="upload">
        <section class="upload-info">
          <form class="upload-form" [formGroup]="latexForm" (submit)="onLatexFormSubmit()">
            <section class="form-column">
              <label for="title" class="form-input-wrapper form-label">
                Title 
                <input type="text" formControlName="title" id="title" class="form-input">
                <small *ngIf="title?.invalid && (title?.dirty || title?.touched)">Title is required.</small>
              </label>
              <label for="title" class="form-input-wrapper form-label">
                Category 
                <select name="category" id="category" formControlName="category" class="form-input">
                  <option *ngFor="let category of categories" [value]="category" [selected]="category === 'other'">{{category.toUpperCase()}}</option>
                </select>
              </label>
              <label for="title" class="form-input-wrapper">
                Cover
                <div class="form-file-wrapper">
                  <label for="cover" class="cover-label light bold">Choose file </label>
                  <span class="cover-text">{{coverPlaceHolder}}</span>
                  <input type="file" (change)="onCoverUpload($event)" id="cover" class="tutorial-cover-file">
                </div>
                <small *ngIf="cover?.invalid && (cover?.dirty || cover?.touched)">Cover is required.</small>
              </label>
              <small *ngFor="let error of errors">{{error}}</small>
              <button class="secondary dark" type="button">
                <label for="latex-files">Add Files</label>
              </button>
              <input type="file" id="latex-files" multiple (change)="onFileUpload($event)" class="no-display-file-input"/>
              
              <section class="upload-files">
                <ul class="upload-selected-files-list">
                  <li *ngFor="let file of latexForm.value.files" class="upload-selected-file">
                    <span>{{file.name}}</span>
                    <button (click)="deleteFile(file.name)" class="upload-delete-selected-file">
                      <span class="material-symbols-outlined upload-delete-selected-file-icon">close</span>
                    </button>
                  </li>
                </ul>
              </section>
              <button class="primary submit-latex-button" type="submit">Publish</button>
            </section>
            <section class="form-column">
              <textarea placeholder="Write here" class="upload-latex" formControlName="contents" (change)="onLatexChange()"></textarea>
              <small *ngIf="contents?.invalid && (contents?.dirty || contents?.touched)">Latex is required</small>
            </section>
          </form>
        </section>
        <section class="upload-preview-container">
          <article class="upload-preview" #outputContainer></article>
        </section>
      </section>
    </main>
  `,
  styleUrl: './upload-page.component.css'
})
export class UploadPageComponent {
  @ViewChild('outputContainer', { static: true }) outputContainer!: ElementRef;
  latexService: LatexServiceService = inject(LatexServiceService);
  tutorialService: TutorialServiceService = inject(TutorialServiceService);
  toasterService = inject(ToastrService);
  base64ConvertService = inject(Base64ConvertService);
  errors: string[] = [];
  categories = Object.values(TutorialCategory);
  coverPlaceHolder = 'No file choosen yet';

  latexForm = new FormGroup<{title: FormControl<string | null>, cover: FormControl<File|null>, contents: FormControl<string | null>,category: FormControl<string|null>, files: FormControl<File[] | null>}>({
    title: new FormControl('', [Validators.required]),
    cover: new FormControl(null, [Validators.required]),
    contents: new FormControl('', [Validators.required]),
    category: new FormControl(''),
    files: new FormControl([])
  });

  get title() {
    return this.latexForm.get('title');
  }

  get contents() {
    return this.latexForm.get('contents');
  }

  get cover() {
    return this.latexForm.get('cover');
  }

  selectedFiles: File[] = [];

  onFileUpload(event: Event) {
    const inputFile = event.target as HTMLInputElement;

    if(inputFile.files) {
      this.selectedFiles = Array.from(inputFile.files);
      const updatedFiles = this.latexForm.value.files?.concat(this.selectedFiles);
      this.latexForm.patchValue({...this.latexForm, files: updatedFiles});
    }
  }

  onCoverUpload(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    if(inputElement.files) {
      const newCover = inputElement.files[0];
      this.coverPlaceHolder = inputElement.files[0].name;
      this.latexForm.patchValue({...this.latexForm, cover: newCover})
    }
  }

  deleteFile(fileName: string){
    const updatedFiles = 
      this.latexForm.value.files?.filter(file => file.name !== fileName);

    this.latexForm.patchValue({...this.latexForm, files: updatedFiles});
  }

  onLatexChange() {
    if(this.latexForm.value.contents){
      this.outputContainer.nativeElement.replaceChildren();
      this.outputContainer.nativeElement.appendChild(this.latexService.generate(this.latexForm.value.contents, this.latexForm.value.files));
    }
  }

  async onLatexFormSubmit() {
    this.errors = [];
    if(this.latexForm.valid 
      && (this.latexForm.value.title !== null && this.latexForm.value.title !== undefined)
      && (this.latexForm.value.cover !== null && this.latexForm.value.cover !== undefined)
      && (this.latexForm.value.contents !== null && this.latexForm.value.contents !== undefined)
      && (this.latexForm.value.files !== null && this.latexForm.value.files !== undefined)
      &&(this.latexForm.value.category !== null && this.latexForm.value.category !== undefined)
    ) {
        const parsedFiles = (await this.base64ConvertService.convertArrayFilesToBase64(this.latexForm.value.files)).map(file => {
          return file.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
        });
        const coverData = new FormData();
        const mediaList = new FormData();
       // const nameList = new FormData();
        coverData.append('file', this.latexForm.value.cover);
        for(const file of this.latexForm.value.files) {
          mediaList.append('files', file);
          mediaList.append('names', file.name);
        }
      this.tutorialService.saveTutorial({title: this.latexForm.value.title, contents: this.latexForm.value.contents, category: this.latexForm.value.category}).subscribe({
        next: response => {
          this.toasterService.info(`Tutorial saved with id ${response}`);
          this.tutorialService.saveTutorialCover(response, coverData).subscribe();
          this.tutorialService.saveTutorialMedia(response, mediaList).subscribe();
        },
        error: error => {
          if(error.error.validationErrors) {
            this.errors = error.error.validationErrors;
          } else {
            this.errors.push(error.error.error);
          }
        }
      })
    }
  }
}
