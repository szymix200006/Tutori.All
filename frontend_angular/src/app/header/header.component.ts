import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="header">
        <a routerLink='' class='header-logo'>
          <img src="/Logo_Small.png" alt="header-logo" />
        </a>
        <nav class="navbar">
            <a routerLink='login' class='navbar-link'>
                <button class='navbar-login-button'>
                    Login
                </button>
            </a>
            <a routerLink='#' class='navbar-link'>
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

}
