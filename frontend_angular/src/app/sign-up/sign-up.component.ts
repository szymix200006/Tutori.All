import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <main class="login">
      <header class="login-header">
        <img src="/Logo_Big_Black.png" alt="logo-black">
      </header>
      <section class="form-wrapper">
        <form [formGroup]="signUpForm" (submit)="submitSignInForm()" class='login-form'>
          <h3 class="form-header">Sign Up</h3>
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

          <section class="input-wrapper">
            <label for="repeatPassword" class="form-label">Repeat Password</label>
            <input required type="password" id="repeatPassword" class="form-input" formControlName="repeatPassword">
            <small *ngIf="repeatPassword?.invalid && (repeatPassword?.dirty || repeatPassword?.touched)" class='form-error'>
              {{repeatPassword?.hasError('required') ? 'Repeat Password is required' : ''}}
            </small>
            <small *ngIf="this.signUpFormSubmitted" class='form-error'>
              {{signUpForm.hasError('notMatchingPasswords') || repeatPassword?.dirty ? 'Passwords are not matching' : ''}}
            </small>
          </section>

          <span class="signup-link">Already have an account? <a  routerLink="/login">Login</a></span>

          <button type="submit" class="primary">Login</button>
        </form>
        <img src="/Sign_Up.jpg" alt="form-image" class='form-image'>
      </section>
    </main>
  `,
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUpFormSubmitted: boolean = false;
  doesPasswordsMatches: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');
    return password && repeatPassword && password.value !== repeatPassword.value ? {notMatchingPasswords: true} : null;
  }

  signUpForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required])
  }, {validators: this.doesPasswordsMatches});

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get repeatPassword() {
    return this.signUpForm.get('repeatPassword');
  }

  submitSignInForm(): void {
    this.signUpFormSubmitted = true;
    if(this.signUpForm.valid){
      console.log(this.signUpForm.value.email, this.signUpForm.value.password, this.signUpForm.value.repeatPassword); 
      this.signUpFormSubmitted = false;
    }
    
    // } else if(this.signUpForm.hasError('noMatchingPasswords')) {
    //   this.notMatchingPasswords = true;
    // }
  }
}
