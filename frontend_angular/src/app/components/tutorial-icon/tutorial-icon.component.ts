import { Component, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { TutorialIcon } from '../../utils/tutorial-icon';
import { RouterModule } from '@angular/router';
import { TutorialCover } from '../../utils/tutorial-cover';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-tutorial-icon',
  standalone: true,
  imports: [RouterModule],
  template: `
    <a class="tutorial-link" [routerLink]="['/tutorials', tutorialId]">
      <section class='tutorial-icon'>
        <img [src]="tutorialPicture" alt="icon-image" class="tutorial-icon-image"/>
        <article class='tutorial-icon-desc'>
          <h2 class="tutorial-icon-title">{{tutorialIcon.title}}</h2>
          <p class="tutorial-icon-author">{{tutorialIcon.user}}</p>
          <small class="tutorial-icon-category">{{tutorialIcon.category}}&nbsp;&nbsp;|&nbsp;&nbsp;{{tutorialAge}}</small>
        </article>
      </section>
    </a>
  `,
  styleUrl: './tutorial-icon.component.css'
})
export class TutorialIconComponent {
  @Input() tutorialIcon!: TutorialCover;// = {
  //   id: 0,
  //   cover: '',
  //   title: '',
  //   user: '',
  //   category: '',
  // };

  tutorialId: number = 0;
  tutorialPicture: string = '';
  tutorialAge: string = '';

  ngOnChanges(changes: SimpleChanges) {
    this.tutorialId = this.tutorialIcon.id;
    this.tutorialPicture = 'data:image/jpg;base64,' + this.tutorialIcon.cover;
    const tutorialDate = new Date(this.tutorialIcon.createdAt);
    const currentDate = new Date();

    const years = currentDate.getFullYear() - tutorialDate.getFullYear();
    
    if(years == 0 || (years == 1 && currentDate.getMonth() < tutorialDate.getMonth())) {
      let months = currentDate.getMonth() - tutorialDate.getMonth();
      months = months < 0 ? 12 + months : months;
      if(months == 0 || (months == 1 && currentDate.getDate() < tutorialDate.getDate())) {
        let days = currentDate.getDate() - tutorialDate.getDate();
        days = days < 0 ? 30 + days : days;
        if(days == 0 || (days == 1 && currentDate.getHours() < tutorialDate.getHours())) {
          let hours = currentDate.getHours() - tutorialDate.getHours();
          hours = hours < 0 ? 24 + hours : hours;
          this.tutorialAge = hours == 1 || hours == 0 ? '1 hour ago' : `${hours} hours ago`;
        } else {
          this.tutorialAge = days == 1 ? `${days} day ago` : `${days} days ago`;
        }
      }
      else {
        this.tutorialAge = months == 1 ? `${months} month ago` : `${months} months ago`;
      }
    } else {
      this.tutorialAge = years == 1 ? `${years} year ago` : `${years} years ago`;
    }

  }
}
