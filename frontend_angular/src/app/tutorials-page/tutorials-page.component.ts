import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TutorialIconComponent } from "../tutorial-icon/tutorial-icon.component";
import { TutorialIcon } from '../tutorial-icon';
import { TutorialServiceService } from '../tutorial-service.service';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tutorials-page',
  standalone: true,
  imports: [TutorialIconComponent, CommonModule],
  template: `
    <main class="tutorials">
      <app-tutorial-icon *ngFor="let tutorialIcon of tutorialIcons" [tutorialIcon]="tutorialIcon"/>
    </main>
  `,
  styleUrl: './tutorials-page.component.css'
})
export class TutorialsPageComponent implements OnInit {
  query: string = '';
  tutorialIcons: TutorialIcon[] = [];
  tutorialService: TutorialServiceService = inject(TutorialServiceService);

  constructor(private route: ActivatedRoute) {
    this.tutorialService.getAllTutorialIcons().then((tutorialIconList: TutorialIcon[]) => {
      this.tutorialIcons = tutorialIconList;
    });
  }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.query = params['query'];
      })
  }
}
