import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialSorterComponent } from './tutorial-sorter.component';

describe('TutorialSorterComponent', () => {
  let component: TutorialSorterComponent;
  let fixture: ComponentFixture<TutorialSorterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorialSorterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialSorterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
