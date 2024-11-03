import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialsPageComponent } from './tutorials-page.component';

describe('TutorialsPageComponent', () => {
  let component: TutorialsPageComponent;
  let fixture: ComponentFixture<TutorialsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorialsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
