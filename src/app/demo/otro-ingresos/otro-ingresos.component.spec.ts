import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtroIngresosComponent } from './otro-ingresos.component';

describe('OtroIngresosComponent', () => {
  let component: OtroIngresosComponent;
  let fixture: ComponentFixture<OtroIngresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtroIngresosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtroIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
