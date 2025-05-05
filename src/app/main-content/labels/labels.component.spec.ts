import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LablesComponent } from './labels.component';

describe('LablesComponent', () => {
  let component: LablesComponent;
  let fixture: ComponentFixture<LablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
