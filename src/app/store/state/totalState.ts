export interface alumnos {
  id: string;
  nombre: string;
  apellido: string;
  emailPadre: string;
  mesesPago: [
    {
      mes: string;
      monto: number;
    }
  ];
}

export interface otrosCobro {
  id: string;
  activo: boolean;
  titulo: string;
  montoCobrar: number;
  idCobro: string;
  montoTotalRecaudado: number;
  cantidadAlumnosPago: number;
  infoGasto: [
    // {
    //   descripcionGasto: string;
    //   fechaGasto: string;
    //   totalGasto: number;
    //   imgBoleta: string;
    //   filePath: string;
    // }
  ];
  infoPagoAlumno: [
    // {
    //   fechaPago: string;
    //   montoPago: number;
    //   idAlumno: string;
    // }
  ];
}

export interface alumnosPago {
  nombre: string;
  apellido: string;
  estado: boolean;
}

export interface sesion {
  email: string;
  password: string;
}

export interface infoApoderado {
  nombre: string;
  apellido: string;
  correoPersonal: string;
  telefono: string;
  correoInstitucional: string;
  alumno: string;
  rolUsuario: string;
}

export interface correoInstitucional {
  correoInstitucional: string;
}

export interface spinner {
  spinner: boolean;
}

export interface guardadoExitoso {
  guardado: boolean;
}

export interface otrosIngresos {
  id: string;
  descripcionIngreso: string;
  montoIngreso: number;
}

export interface ventasCursos {
  id: string;
  registroVenta: informacionVenta[];
  venta: string;
}

export interface gastosGenerales {
  id: string;
  detalleGasto: string;
  fechaGasto: string;
  foto: string;
  montoGasto: string;
  pathImagen: string;
}

export interface informacionVenta {
  idAlumno: string;
  alumno: string;
  cantidad: number;
  numeroIdentificador: number;
  productoVendido: string;
  monto: number;
}
