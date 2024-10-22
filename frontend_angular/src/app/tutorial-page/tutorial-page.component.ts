import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tutorial-page',
  standalone: true,
  imports: [RouterModule],
  template: `
    <main class="tutorial-page">

    </main>
  `,
  styleUrl: './tutorial-page.component.css'
})
export class TutorialPageComponent {
 constructor(private route: ActivatedRoute) {

 } 
}
