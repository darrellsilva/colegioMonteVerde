import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/indexReducer/indexReducer';
import { alumnos, ventasCursos } from '../../store/state/totalState';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VentasCursoService } from '../../theme/shared/service/ventas-curso.service';
import { listarVentasCurso } from '../../store/action/totalActions';
import { SpinnerServiceService } from '../../theme/shared/service/spinner-service.service';

@Component({
  selector: 'app-ventas-curso',
  imports: [ReactiveFormsModule],
  templateUrl: './ventas-curso.component.html',
  styleUrl: './ventas-curso.component.scss'
})
export class VentasCursoComponent implements OnInit {

  listAlumnos: alumnos[] = [];
  formRegisterVentas: FormGroup;
  alumnoSeleccionado: alumnos;
  idAlumnoSeleccionado: string = '';
  ventasRealizadas: ventasCursos[] = [];
  registroVentas: any = [];


  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private ventasCursos: VentasCursoService,
    private spinner: SpinnerServiceService
  ) {
    this.formRegisterVentas = this.fb.group({
      cantidad: [''],
      monto: [''],
      productoVendido: ['']
    });
  }

  ngOnInit(): void {
    this.store.select('ventasCurso').subscribe((ventasCurso: ventasCursos[]) => {
      if (ventasCurso.length > 0) {
        this.ventasRealizadas = ventasCurso
        this.registroVentas = ventasCurso[0].registroVenta;
        console.log('ventasCurso', this.ventasRealizadas);
      }
    });

    this.store.select('listarAlumnos').subscribe((alumnos: alumnos[]) => {
      if (alumnos.length > 0) {
        this.listAlumnos = alumnos;
      }
    });
  }

  seleccionarAlumno($event: Event) {
    const selectElement = $event.target as HTMLSelectElement;
    const selectedId = selectElement.value;
    this.idAlumnoSeleccionado = selectedId;
    this.alumnoSeleccionado = this.listAlumnos.find((alumno) => alumno.id === selectedId);
    console.log('seleccionarAlumno', this.alumnoSeleccionado);
  }

  guardarVenta() {
    this.spinner.funcionalidadSpinner(true)
    const compras = {
      registroVenta: []
    };

    this.guardadoAlumnos(
      this.idAlumnoSeleccionado ?? '',
      this.formRegisterVentas.value.cantidad,
      this.alumnoSeleccionado === undefined ? '' : this.alumnoSeleccionado.nombre.concat(' ').concat(this.alumnoSeleccionado.apellido),
      this.formRegisterVentas.value.monto,
      this.formRegisterVentas.value.productoVendido,
      this.relacionNumero(this.ventasRealizadas[0]),
      compras
    );

    this.ventasRealizadas.forEach((venta) => {
      venta.registroVenta.forEach((registroVenta) => {
        this.guardadoAlumnos(registroVenta.idAlumno, registroVenta.cantidad, registroVenta.alumno, registroVenta.monto, registroVenta.productoVendido, registroVenta.numeroIdentificador,compras);
      });
    });



    this.ventasCursos.editarVentasCurso(this.ventasRealizadas[0].id, compras).subscribe((ventasCurso) => {
      this.formRegisterVentas.reset();
      this.spinner.funcionalidadSpinner(false)
      console.log('guardado exitoso');
      this.store.dispatch(listarVentasCurso());
    });
  }

  private guardadoAlumnos(idAlumno, cantidad, alumno, monto, productoVendido, numeroIdentificador, compras = { registroVenta: [] }) {
    const alumnoRegisterNuevo = {
          idAlumno: idAlumno,
          cantidad: cantidad,
          alumno: alumno,
          numeroIdentificador: numeroIdentificador,
          monto: monto,
          productoVendido: productoVendido
        };
        compras.registroVenta.push(alumnoRegisterNuevo);
      }

  montoFinal(registroVentas: any) {
    let ventaFinal = 0
    registroVentas.forEach((registroVenta) => {
      ventaFinal = ventaFinal + registroVenta.monto;
    })
    return ventaFinal;
  }

  private relacionNumero(ventasCurso: ventasCursos) {
    let encontroNumero = false;
    let numeroPedido = 0;

    while (!encontroNumero){
      numeroPedido = Math.floor(Math.random() * 1000000);
      const encontroPedido = ventasCurso.registroVenta.find((venta) => venta.numeroIdentificador === numeroPedido);
      if (!encontroPedido) {
        encontroNumero = true;
      }
    }
    return numeroPedido;
  }

  eliminarPedido(numeroIdentificador: any) {
    const confirmarBorrado = confirm('¿Esta seguro de eliminar el pedido?');

    if (confirmarBorrado) {
      const pedidoEliminado = this.registroVentas.filter((pedido: any) => pedido.numeroIdentificador !== numeroIdentificador);
      const pedidoModificado = {
        registroVenta: pedidoEliminado
      }

      this.ventasCursos.editarVentasCurso(this.ventasRealizadas[0].id, pedidoModificado).subscribe((ventasCurso) => {
        this.store.dispatch(listarVentasCurso());
      });
    }
  }
}
