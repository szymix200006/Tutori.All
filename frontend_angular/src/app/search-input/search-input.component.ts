import { Component } from '@angular/core';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [],
  template: `
    <section class='search'>
      <span class="material-symbols-outlined search-input-icon">search</span>
      <input type="text" name="search" placeholder="Find your tutorial" class='search-input' />
    </section>
  `,
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {

}
