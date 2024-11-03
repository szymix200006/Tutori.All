import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateAccountInputComponent } from './activate-account-input.component';

describe('ActivateAccountInputComponent', () => {
  let component: ActivateAccountInputComponent;
  let fixture: ComponentFixture<ActivateAccountInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivateAccountInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivateAccountInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
