import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProfesoresComponent } from './info-profesores.component';

describe('InfoProfesoresComponent', () => {
  let component: InfoProfesoresComponent;
  let fixture: ComponentFixture<InfoProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoProfesoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
