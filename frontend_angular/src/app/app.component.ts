import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  template: `
    <main class='app-container'>
      <app-header *ngIf="router.url !== '/login'"/>
      <router-outlet />
    </main>

  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend_angular';

  constructor(public router: Router) {}
}
