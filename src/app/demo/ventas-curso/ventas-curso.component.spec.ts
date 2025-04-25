import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasCursoComponent } from './ventas-curso.component';

describe('VentasCursoComponent', () => {
  let component: VentasCursoComponent;
  let fixture: ComponentFixture<VentasCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasCursoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
