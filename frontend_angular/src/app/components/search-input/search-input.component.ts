import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form class='search' [formGroup]="searchInputForm" (submit)="navigateToTutorials()">
      <button class="search-input-icon" type='submit'>
        <span class="material-symbols-outlined">search</span>
      </button>
      <input type="text" name="query" placeholder="Find your tutorial" class='search-input' formControlName="searchQuery" (keydown.enter)="navigateToTutorials()"/>
    </form>
  `,
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  searchInputForm: FormGroup = new FormGroup({
    searchQuery: new FormControl('')
  });

  constructor(private router: Router) {}

  navigateToTutorials(): void {
    this.router.navigate(['/tutorials'], {queryParams: {query: this.searchInputForm.value.searchQuery}});
  }
}
