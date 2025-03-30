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

export interface otrosCobro{
  id: string;
  activo: boolean;
  titulo: string;
  infoPagoAlumno: [
    {
      fechaPago: string;
      montoPago: number;
      idAlumno: string;
    }
  ];
}

export interface alumnosPago{
  nombre: string;
  apellido: string;
  estado: boolean;
}

export interface sesion{
  email: string;
  password: string;
}
