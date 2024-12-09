import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SortOptions } from '../../utils/sort-options';

@Component({
  selector: 'app-tutorial-sorter',
  standalone: true,
  imports: [],
  template: `
    <select name="sort" id="sort" class="tutorial-sort-button" (change)="sortTutorials($event)">
          <option value="popular">
            Most popular
          </option>
          <option value="latests">
            From the latests
          </option>
          <option value="oldests">
            From the oldests
          </option>
    </select>
  `,
  styleUrl: './tutorial-sorter.component.css'
})
export class TutorialSorterComponent {
  @Output() sortTutorialsEmitter = new EventEmitter<any>();

  sortTutorials(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.sortTutorialsEmitter.emit(selectElement.value);
  }
}
