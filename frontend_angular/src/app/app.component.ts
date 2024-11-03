import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  template: `
    <main class='app-container'>
      <app-header *ngIf="(router.url !== '/login') && (router.url !== '/signup') && (router.url !== '/upload') && (router.url !== '/activate-account') && (router.url !== '/'); else homeAppHeader" logoSrc="/Logo_Small_Black.png" loginBtnColor="black"/>
      <ng-template #homeAppHeader>
      <app-header  *ngIf="(router.url !== '/login') && (router.url !== '/signup') && (router.url !== '/activate-account') && (router.url !== '/upload')" logoSrc="/Logo_Small.png" loginBtnColor="white"/>
      </ng-template>
      <router-outlet />
    </main>

  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend_angular';

  constructor(public router: Router) {}
}
