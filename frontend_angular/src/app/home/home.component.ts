import { Component } from '@angular/core';
import { SearchInputComponent } from '../search-input/search-input.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchInputComponent],
  template: `
    <article class='home'>
        <video autoPlay muted loop class='home-background-video'>
            <source src='/Homepage_Background.mp4' type='video/mp4'/>
        </video>
        <section class="home-hero-section">
          <h1 class="home-hero-header">All tutorials in one place</h1>
          <span class="home-hero-description">Discover tutorials created by our community</span>
          <app-search-input/>
        </section>
    </article>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
