import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoApoderadoComponent } from './info-apoderado.component';

describe('InfoApoderadoComponent', () => {
  let component: InfoApoderadoComponent;
  let fixture: ComponentFixture<InfoApoderadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoApoderadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoApoderadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
