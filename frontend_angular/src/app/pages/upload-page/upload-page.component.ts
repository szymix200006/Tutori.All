import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderUploadComponent } from '../../components/header-upload/header-upload.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { LatexServiceService } from '../latex-service.service';
import { inject } from '@angular/core';
import { LatexServiceService } from '../../services/latex-service.service';
import { TutorialServiceService } from '../../services/tutorial-service.service';
import { TokenServiceService } from '../../services/token-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [HeaderUploadComponent, ReactiveFormsModule, CommonModule],
  template: `
    <main class="upload-page">
      <app-header-upload/>
      <section class="upload">
      <section class="upload-column">
        <h1 class="upload-header">
          Write your LaTeX here
        </h1>
        <form class="upload-form" [formGroup]="latexForm" (submit)="onLatexFormSubmit()">
          <section class="tutorial-info">
            <label for="title" class="tutorial-info-label">
              Title 
              <input type="text" formControlName="title" id="title" class="tutorial-info-input-text">
              <small *ngIf="title?.invalid && (title?.dirty || title?.touched)">Title is required.</small>
            </label>
            <label for="cover" class="tutorial-info-label">Cover <input type="file" formControlName="cover" id="cover" class="tutorial-info-input-file"></label>
            <small *ngFor="let error of errors">{{error}}</small>
          </section>
          <textarea placeholder="Write here" class="upload-latex" formControlName="contents" (change)="onLatexChange()"></textarea>
          <small *ngIf="contents?.invalid && (contents?.dirty || contents?.touched)">Latex is required</small>
            <button class="primary">
              <label for="latex-files">Add Files</label>
            </button>
          <input type="file" id="latex-files" multiple (change)="onFileUpload($event)" class="no-display-file-input"/>
          <input type="submit" value="Submit">
        </form>
        <section class="upload-files">
          <h3 class="upload-selected-files-header" *ngIf="latexForm.value.files && latexForm.value.files.length > 0">Selected files</h3>
          <ul class="upload-selected-files-list">
            <li *ngFor="let file of latexForm.value.files" class="upload-selected-file">
              {{file.name}}
              <button (click)="deleteFile(file.name)" class="upload-delete-selected-file">
                <span class="material-symbols-outlined upload-delete-selected-file-icon">close</span>
              </button>
            </li>
          </ul>
        </section>
      </section>
      <section class="upload-column">
        <h1 class="upload-header">
          Preview
        </h1>
        <article class="upload-preview-content" #outputContainer>

        </article>
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
  errors: string[] = [];

  latexForm = new FormGroup<{title: FormControl<string | null>, cover: FormControl<File|null>, contents: FormControl<string | null>, files: FormControl<File[] | null>}>({
    title: new FormControl('', [Validators.required]),
    cover: new FormControl(),
    contents: new FormControl('', [Validators.required]),
    files: new FormControl([])
  });

  get title() {
    return this.latexForm.get('title');
  }

  get contents() {
    return this.latexForm.get('contents');
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

  onLatexFormSubmit() {
    this.errors = [];
    if(this.latexForm.valid 
      && (this.latexForm.value.title !== null && this.latexForm.value.title !== undefined)
      && (this.latexForm.value.cover !== null && this.latexForm.value.cover !== undefined)
      && (this.latexForm.value.contents !== null && this.latexForm.value.contents !== undefined)
      && (this.latexForm.value.files !== null && this.latexForm.value.files !== undefined)) {
      this.tutorialService.saveTutorial({title: this.latexForm.value.title, cover: this.latexForm.value.cover, contents: this.latexForm.value.contents, files: this.latexForm.value.files}).subscribe({
        next: response => {
          this.toasterService.info(`Tutorial saved with id ${response}`);
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
