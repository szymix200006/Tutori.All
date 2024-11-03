import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUploadComponent } from './header-upload.component';

describe('HeaderUploadComponent', () => {
  let component: HeaderUploadComponent;
  let fixture: ComponentFixture<HeaderUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
