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

export interface infoApoderado{
  nombre: string;
  apellido: string;
  correoPersonal: string;
  telefono: string;
  correoInstitucional: string;
  alumno: string;
  rolUsuario: string;
}

export interface correoInstitucional{
  correoInstitucional: string;
}

export interface spinner{
  spinner: boolean;
}
