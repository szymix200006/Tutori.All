import { Component } from '@angular/core';
import { HeaderUploadComponent } from '../header-upload/header-upload.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LatexServiceService } from '../latex-service.service';
import { inject } from '@angular/core';

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
        <form class="upload-form" [formGroup]="latexForm">
          <textarea placeholder="Write here" class="upload-latex" formControlName="latex"></textarea>
            <button class="primary">
              <label for="latex-files">Add Files</label>
            </button>
          <input type="file" id="latex-files" multiple (change)="onFileUpload($event)"/>
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
        <article class="upload-preview-content">

        </article>
      </section>
      </section>
    </main>
  `,
  styleUrl: './upload-page.component.css'
})
export class UploadPageComponent {
  // latexService: LatexServiceService = inject(LatexServiceService);

  latexForm = new FormGroup<{latex: FormControl<string | null>, files: FormControl<File[] | null>}>({
    latex: new FormControl(''),
    files: new FormControl([])
  });

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

  // onLatexChange() {
  //   const element = document.querySelector('.upload-preview-content') as HTMLElement;
  //   if(this.latexForm.value.latex) {
  //     this.latexService.renderLatex(this.latexForm.value.latex, element);
  //   }
  // }
}
