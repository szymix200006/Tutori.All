import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="header">
        <a routerLink='' class='header-logo'>
          <img [src]="logoSrc" alt="header-logo" />
        </a>
        <nav class="navbar">
            <a routerLink='login' class='navbar-link'>
                <button class='navbar-login-button' [style]="{color: loginBtnColor}">
                    Login
                </button>
            </a>
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
export class HeaderComponent {
  @Input() logoSrc: string = '';
  @Input() loginBtnColor: string = '';
}
