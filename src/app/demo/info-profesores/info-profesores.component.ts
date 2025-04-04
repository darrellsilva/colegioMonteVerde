import { Component, OnInit } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-info-profesores',
  imports: [],
  templateUrl: './info-profesores.component.html',
  styleUrl: './info-profesores.component.scss'
})
export class InfoProfesoresComponent implements OnInit {
  private currentModal: any;
  asignaturas: any = [];

  ngOnInit(): void {
    this.asignaturas = [
      { asignatura: 'Lenguaje y comunicacion' },
      { asignatura: 'Matematica' },
      { asignatura: 'Historia y Geografia' },
      { asignatura: 'Ciencias Naturales' },
      { asignatura: 'Artes Visuales' },
      { asignatura: 'Musica' },
      { asignatura: 'Educacion Fisica' },
      { asignatura: 'Tecnologia' },
      { asignatura: 'Religion' },
      { asignatura: 'Orientacion' },
    ];
  }

  openModal(modalId: string) {
    if (this.currentModal) {
      this.currentModal.hide();
    }
    const modalElement = document.getElementById(modalId);
    this.currentModal = new bootstrap.Modal(modalElement);
    this.currentModal.show();
  }
}
