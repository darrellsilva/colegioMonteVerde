import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleGastoDashboardComponent } from './detalle-gasto-dashboard.component';

describe('DetalleGastoDashboardComponent', () => {
  let component: DetalleGastoDashboardComponent;
  let fixture: ComponentFixture<DetalleGastoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleGastoDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleGastoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
