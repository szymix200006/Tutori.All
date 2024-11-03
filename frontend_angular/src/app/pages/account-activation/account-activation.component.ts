import { Component, inject, QueryList, ViewChildren } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivateAccountInputComponent } from '../../components/activate-account-input/activate-account-input.component';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-account-activation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ActivateAccountInputComponent],
  template: `
    <main class="account-activation">
      <section *ngIf="activated == false else accountActivated">
        <form [formGroup]="digitForm" (submit)="onDigitFormSubmit()" class="account-activation-form">
          <h1 class="account-activation-header">Confirm your account with the code that has been sent to you</h1>
          <section class="account-activation-inputs">
            <app-activate-account-input *ngFor="let control of getDigitFormArray(); let i = index" [formControl]="getSpecificDigitFormControl(control)"
            (next)="onFocusNext(i)" (previous)="onFocusPrevious(i)"/>
          </section>
        <button class="primary" type="submit">Confirm</button>
        </form>
      </section>
      <ng-template #accountActivated>
        <section *ngIf="isOkay == true else accountDismissed" class='confirmation-okay'>
          <h1>Account activated!</h1>
          <button class="primary" (click)="redirectToLogin()">Go to Login</button>
        </section>
        <ng-template #accountDismissed>
          <h1>Account activation failed!</h1>
        </ng-template>
      </ng-template>
    </main>
  `,
  styleUrl: './account-activation.component.css'
})
export class AccountActivationComponent {
  userService = inject(UserServiceService);
  activated = false;
  isOkay = true;

  @ViewChildren(ActivateAccountInputComponent) digitInputs!: QueryList<ActivateAccountInputComponent>;

  digitForm = new FormGroup<{[key: string]: FormControl<string | null>}>({
    digit_1: new FormControl('', Validators.maxLength(1)),
    digit_2: new FormControl('', Validators.maxLength(1)),
    digit_3: new FormControl('', Validators.maxLength(1)),
    digit_4: new FormControl('', Validators.maxLength(1)),
    digit_5: new FormControl('', Validators.maxLength(1)),
    digit_6: new FormControl('', Validators.maxLength(1)),
  });

  constructor(public router: Router) {}

  redirectToLogin() {
    this.router.navigateByUrl('login');
  }



  onInputChange(event: KeyboardEvent): void {
    const element = event.target as HTMLInputElement;
    const code = event.key;
    const siblingInput = code === 'Backspace' ? element.previousSibling as HTMLInputElement : element.nextSibling as HTMLInputElement;
    console.log(element)
    if(siblingInput) {
      siblingInput.focus();
    }
  }

  onFocusNext(i: number):void {
    if(i < this.digitInputs.length - 1) {
      this.digitInputs.get(i + 1)?.focus();
    }
  }

  onFocusPrevious(i: number) {
    if(i <= this.digitInputs.length - 1) {
      this.digitInputs.get(i - 1)?.focus();
    }
  }

  getDigitFormArray(): string[] {
    return Object.keys(this.digitForm.controls);
  }

  getSpecificDigitFormControl(name: string): FormControl {
    return this.digitForm.controls[name as keyof typeof this.digitForm];
  }

  onDigitFormSubmit(): void {
    if(this.digitForm.valid) {
      this.activated = true;
      let code = Object.values(this.digitForm.value).join('');
      this.userService.confirmAccount(code).subscribe({
        next: () => this.isOkay = true,
        error: () => this.isOkay = false
      });
    }
  }
}
