import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { TokenServiceService } from '../../services/token-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  template: `
    <main class="login">
      <header class="login-header">
        <img src="/Logo_Big_Black.png" alt="logo-black">
      </header>
      <section class="form-wrapper">
        <form [formGroup]="loginForm" (submit)="submitLoginForm()" class='login-form'>
          <h3 class="form-header">Login</h3>
          <section class="input-wrapper">
            <label for="email" class="form-label">Email</label>
            <input required type="text" id="email" class="form-input" formControlName="email">
            <small *ngIf="email?.invalid && (email?.dirty || email?.touched)" class='form-error'>
              {{email?.hasError('required') ? 'Email is required' : (email?.hasError('email') ? 'Invalid email' : '')}}
            </small>
          </section>

          <section class="input-wrapper">
            <label for="password" class="form-label">Password</label>
            <input required type="password" id="password" class="form-input" formControlName="password">
            <small *ngIf="password?.invalid && (password?.dirty || password?.touched)" class='form-error'>
              {{password?.hasError('required') && 'Password is required'}}
            </small>
          </section>

          <section class="auth-errors">
            <small *ngFor="let error of errors">{{error}}</small>
          </section>

          <span class="signup-link">Don't have an account? <a  routerLink="/signup">Sign up</a></span>

          <button type="submit" class="primary">Login</button>
        </form>
        <img src="/Login.png" alt="form-image" class='form-image'>
      </section>
    </main>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userService = inject(UserServiceService);
  tokenService = inject(TokenServiceService);
  errors: string[] = [];

  constructor(private router: Router) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  get email() {
    return this.loginForm.get('email');
  } 

  get password() {
    return this.loginForm.get('password');
  }

  submitLoginForm(): void {
    this.errors = [];
    if(this.loginForm.valid){
      this.userService.authenticate(this.loginForm.getRawValue())
      .subscribe({
        next: response => {
          this.tokenService.token = response.token as string;
          this.tokenService.currentUserSignal.set(response);
          this.router.navigateByUrl('');
        },
        error: error => {
          if(error.error.validationErrors) {
            this.errors = error.error.validationErrors;
          } else {
            this.errors.push(error.error.error);
          }
        }
      });
    }
    
  }
}
