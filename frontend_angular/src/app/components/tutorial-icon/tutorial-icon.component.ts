import { Component, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { TutorialIcon } from '../../utils/tutorial-icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tutorial-icon',
  standalone: true,
  imports: [RouterModule],
  template: `
    <a class="tutorial-link" [routerLink]="['/tutorials', tutorialId]">
      <section class='tutorial-icon'>
        <img [src]="tutorialIcon.imageSrc" alt="icon-image" class="tutorial-icon-image"/>
        <article class='tutorial-icon-desc'>
          <h2 class="tutorial-icon-title">{{tutorialIcon.title}}</h2>
          <p class="tutorial-icon-author">{{tutorialIcon.author}}</p>
          <small class="tutorial-icon-category">{{tutorialIcon.category}}</small>
        </article>
      </section>
    </a>
  `,
  styleUrl: './tutorial-icon.component.css'
})
export class TutorialIconComponent {
  @Input() tutorialIcon: TutorialIcon = {
    id: 0,
    imageSrc: '',
    title: '',
    author: '',
    category: '',
  };

  tutorialId: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    this.tutorialId = this.tutorialIcon.id;
  }
}
