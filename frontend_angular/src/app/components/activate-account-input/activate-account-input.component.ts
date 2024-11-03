import { Component, ElementRef, Input, Output, Self, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormControl, ControlValueAccessor } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';

@Component({
  selector: 'app-activate-account-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <input type="text" size="1" maxlength="1" class="account-activation-input" [formControl]="control" (keyup)="onDigitChange($event)" #accountactivationinput>
  `,
  styleUrl: './activate-account-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ActivateAccountInputComponent),
      multi: true,
    }
  ]
})
export class ActivateAccountInputComponent implements ControlValueAccessor{
  @ViewChild('accountactivationinput') input!: ElementRef<HTMLInputElement>;
  @Input() control: FormControl = new FormControl;
  @Output() next: EventEmitter<any> = new EventEmitter();
  @Output() previous: EventEmitter<any> = new EventEmitter();

  value: string | null = null;
  onChange: any = () => {};
  onTouch: any = () => {};
  touched = false;
  disabled = false;

  constructor() {}
  focus() {
    this.input.nativeElement.focus();
  }
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onDigitChange(event: KeyboardEvent) {
    this.value = event.target ? (event.target as HTMLInputElement).value : '';
    this.onChange(this.value);
    const code = event.key;
    if(code === 'Backspace') {
      this.previous.emit();
    } else {
      this.next.emit();
    }
  }
}
