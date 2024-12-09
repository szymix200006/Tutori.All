import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TutorialResponse } from '../../utils/tutorial-response';
import { TutorialServiceService } from '../../services/tutorial-service.service';
import { LatexServiceService } from '../../services/latex-service.service';

@Component({
  selector: 'app-tutorial-page',
  standalone: true,
  imports: [RouterModule],
  template: `
    <main class="tutorial-page" #tutorialPage>

    </main>
  `,
  styleUrl: './tutorial-page.component.css'
})
export class TutorialPageComponent {
  @ViewChild('tutorialPage', { static: true }) tutorialPage!: ElementRef;
  tutorialId: number;
  tutorialService: TutorialServiceService = inject(TutorialServiceService);
  latexService: LatexServiceService = inject(LatexServiceService);

 constructor(private router: Router) {
  this.tutorialId = parseInt(router.url.split('/').pop()!);
  console.log(this.tutorialId)
  this.tutorialService.getTutorialById(this.tutorialId).subscribe({
    next: (response) => {
      this.tutorialPage.nativeElement.append(this.latexService.generate(response.contents, response.files));
    },
    error: (error) => {
      this.tutorialPage.nativeElement.append(`<h1>${error.message}</h1>`);
    }
  })
 } 
}
