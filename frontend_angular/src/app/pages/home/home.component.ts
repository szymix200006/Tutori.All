import { Component } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';

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
          <h4 class="light">All tutorials in one place</h4>
          <span class="home-hero-description">Discover tutorials created by our community</span>
          <app-search-input/>
        </section>
    </article>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
