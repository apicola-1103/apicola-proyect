export interface User {
  nombre: string;
  email: string;
  cedula?: string;
  edad?: number;
  apiario?: string;
}

export interface Account {
  nombre: string;
  email: string;
  clave: string;
  cedula?: string;
  edad?: number;
  apiario?: string;
  fechaCreacion?: string;
}

export interface HarvestRecord {
  id?: string | number;
  fecha: string;
  colmenas: number;
  perdidas: number;
  miel: number;
  precio: number;
  ingresos: number;
  gastos: number;
  ganancia: number;
}

export interface Advice {
  id: number;
  nombre: string;
  ubicacion: string;
  categoria: string;
  metodo: string;
  rating: number;
  texto: string;
  fecha: string;
  likes: number;
  likedByUser?: boolean;
}
