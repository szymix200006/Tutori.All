import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <main class="login">
      <form [formGroup]="loginForm" (submit)="submitLoginForm()">
        <label for="email" class="form-label">Email</label>
        <input required type="text" id="email" class="form-input" formControlName="email">
        <small *ngIf="email?.invalid && (email?.dirty || email?.touched)" class='form-error'>
          {{email?.hasError('required') ? 'Email is required' : (email?.hasError('email') ? 'Invalid email' : '')}}
        </small>

        <label for="password" class="form-label">Password</label>
        <input required type="password" id="password" class="form-input" formControlName="password">
        <small *ngIf="password?.invalid && (password?.dirty || password?.touched)" class='form-error'>
          {{password?.hasError('required') && 'Password is required'}}
        </small>

        <button type="submit" class="primary">Login</button>
      </form>
    </main>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
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
    console.log(this.loginForm.value.email, this.loginForm.value.password);
  }
}
