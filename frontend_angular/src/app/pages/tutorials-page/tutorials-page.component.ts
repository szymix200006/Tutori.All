import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TutorialIconComponent } from "../../components/tutorial-icon/tutorial-icon.component";
import { TutorialIcon } from '../../utils/tutorial-icon';
import { TutorialServiceService } from '../../services/tutorial-service.service';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, Subscriber } from 'rxjs';
import { TutorialCover } from '../../utils/tutorial-cover';
import { response } from 'express';
import { TutorialSorterComponent } from "../../components/tutorial-sorter/tutorial-sorter.component";
import { TutorialCategory } from '../../utils/tutorial-category';

@Component({
  selector: 'app-tutorials-page',
  standalone: true,
  imports: [TutorialIconComponent, CommonModule, TutorialSorterComponent],
  template: `
    <main class="tutorials">
      <nav class="tutorial-filters">
        <app-tutorial-sorter (sortTutorialsEmitter)="sortTutorials($event)"/>
        <button class="tutorial-filter" *ngFor="let category of categories" (click)="toggleCategory(category, $event)">{{category.toUpperCase()}}</button>
        <button class="tutorial-filter-reset" *ngIf="category !== ''" (click)="resetCategory()">Reset</button>
      </nav>
      <section class="tutorials-list">
        <app-tutorial-icon *ngFor="let tutorialIcon of filterByCategory(this.category)" [tutorialIcon]="tutorialIcon"/>
      </section>
    </main>
  `,
  styleUrl: './tutorials-page.component.css'
})
export class TutorialsPageComponent implements OnInit, OnDestroy{
  query: string = '';
  tutorialIcons$!: TutorialCover[];
  tutorialService: TutorialServiceService = inject(TutorialServiceService);
  paramSub: any = null;
  tutorialSub: any = null;
  categories = Object.values(TutorialCategory);
  category: string = '';
  activeButton: HTMLButtonElement | null = null;

  constructor(private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
      this.paramSub = this.route.queryParams.subscribe(params => {
        this.query = params['query'];
      })
      this.tutorialSub = this.tutorialService.getTutorials(this.query).subscribe(response => this.tutorialIcons$ = response);
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
    this.tutorialSub.unsubscribe();
  }

  sortTutorials(sortType: string) {
    switch(sortType) {
      case "oldests": {
        this.sortByOldests();
        break;
      }
      case "latests": {
        this.sortByLatests();
        break;
      }
      default: this.sortByMostPopular();
    }
  }

  private sortByMostPopular() {

  }

  private sortByLatests() {
    this.tutorialIcons$.sort((tutorial1, tutorial2) => {
      const date1 = new Date(tutorial1.createdAt).getTime();
      const date2 = new Date(tutorial2.createdAt).getTime();
      return date2 - date1;
    })
  }

  private sortByOldests() {
    this.tutorialIcons$.sort((tutorial1, tutorial2) => {
      const date1 = new Date(tutorial1.createdAt).getTime();
      const date2 = new Date(tutorial2.createdAt).getTime();
      return date1 - date2;
    })
  }

  filterByCategory(category: string): TutorialCover[] {
    if(category !== '') {
      return this.tutorialIcons$.filter(tutorial => tutorial.category === category);
    }
    return this.tutorialIcons$;
  }

  toggleCategory(value: string, event?: Event) {
    this.category = value;
    if(event) {
      const button = event.target as HTMLButtonElement;
      button.classList.add('active');
      this.activeButton?.classList.remove('active');
      this.activeButton = button;
    }
  }

  resetCategory() {
    this.activeButton?.classList.remove('active');
    this.activeButton = null;
    this.toggleCategory('');
  }
}
