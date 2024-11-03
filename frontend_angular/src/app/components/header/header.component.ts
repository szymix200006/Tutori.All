import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Input } from '@angular/core';
import { TokenServiceService } from '../../services/token-service.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <header class="header">
        <a routerLink='' class='header-logo'>
          <img [src]="logoSrc" alt="header-logo" />
        </a>
        <nav class="navbar">
            <a routerLink='login' class='navbar-link' *ngIf="!authenticated else logoutBtn">
                <button class='navbar-login-button' [style]="{color: loginBtnColor}">
                    Login
                </button>
            </a>
            <ng-template #logoutBtn>
              <a class='navbar-link'>
                  <button class='navbar-login-button' [style]="{color: loginBtnColor}" (click)="logout()">
                      Logout
                  </button>
              </a>
            </ng-template>
            <a routerLink='upload' class='navbar-link'>
                <button class="primary">
                    <span class="material-symbols-outlined navbar-upload-button-icon">upload</span>
                    Upload
                </button>
            </a>
        </nav>
</header>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  platformId = inject(PLATFORM_ID);
  @Input() logoSrc: string = '';
  @Input() loginBtnColor: string = '';
  tokenService = inject(TokenServiceService);
  authenticated = false;

  ngOnInit(): void {
      if(isPlatformBrowser(this.platformId)) {
        this.authenticated = this.tokenService.isAuthenticated();
      }
  }

  logout(): void {
    this.tokenService.logout();
    this.authenticated = false;
  }
  
}
