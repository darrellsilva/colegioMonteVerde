import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosGeneralesComponent } from './gastos-generales.component';

describe('GastosGeneralesComponent', () => {
  let component: GastosGeneralesComponent;
  let fixture: ComponentFixture<GastosGeneralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GastosGeneralesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GastosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
