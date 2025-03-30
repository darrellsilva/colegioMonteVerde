import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensualidadAlumnosComponent } from './mensualidad-alumnos.component';

describe('MensualidadAlumnosComponent', () => {
  let component: MensualidadAlumnosComponent;
  let fixture: ComponentFixture<MensualidadAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensualidadAlumnosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensualidadAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
