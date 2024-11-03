import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TutorialIconComponent } from "../../components/tutorial-icon/tutorial-icon.component";
import { TutorialIcon } from '../../utils/tutorial-icon';
import { TutorialServiceService } from '../../services/tutorial-service.service';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tutorials-page',
  standalone: true,
  imports: [TutorialIconComponent, CommonModule],
  template: `
    <main class="tutorials">
      <app-tutorial-icon *ngFor="let tutorialIcon of tutorialIcons$ | async" [tutorialIcon]="tutorialIcon"/>
    </main>
  `,
  styleUrl: './tutorials-page.component.css'
})
export class TutorialsPageComponent implements OnInit{
  query: string = '';
  tutorialIcons$: Observable<TutorialIcon[]>;
  tutorialService: TutorialServiceService = inject(TutorialServiceService);

  constructor(private route: ActivatedRoute) {
    this.tutorialIcons$ = this.tutorialService.getAllTutorialIcons();
  }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.query = params['query'];
      })
  }
}
