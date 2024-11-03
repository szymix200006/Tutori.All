import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-upload',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="header">
        <a routerLink='' class='header-logo'>
          <img src="/Logo_Small_Black.png" alt="header-logo" />
        </a>
        <button class="primary">
          <span class="material-symbols-outlined publish-button-icon">add</span>
          Publish
        </button>
           
       
</header>
  `,
  styleUrl: './header-upload.component.css'
})
export class HeaderUploadComponent {

}
