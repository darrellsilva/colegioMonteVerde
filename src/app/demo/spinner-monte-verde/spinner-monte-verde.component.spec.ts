import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerMonteVerdeComponent } from './spinner-monte-verde.component';

describe('SpinnerMonteVerdeComponent', () => {
  let component: SpinnerMonteVerdeComponent;
  let fixture: ComponentFixture<SpinnerMonteVerdeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerMonteVerdeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerMonteVerdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
