import { Account, Advice, HarvestRecord, User } from '../types';

export const EMAIL_DEMO = 'carlos.mendoza@apicola.com';

export const CUENTAS_INICIALES: Account[] = [
  {
    nombre: 'Carlos Mendoza',
    email: 'carlos.mendoza@apicola.com',
    clave: 'apicola123',
    cedula: '1098765432',
    edad: 38,
    apiario: 'Apiario La Colmena Dorada'
  },
  {
    nombre: 'Elena Restrepo',
    email: 'elena.restrepo@apicola.com',
    clave: 'reina2026',
    cedula: '52890123',
    edad: 45,
    apiario: 'Apiario Los Arrayanes'
  }
];

export const REGISTROS_DEMO_INICIALES: HarvestRecord[] = [
  {
    fecha: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toLocaleDateString('es-CO'),
    colmenas: 24,
    perdidas: 1,
    miel: 68.5,
    precio: 20000,
    ingresos: 1370000,
    gastos: 280000,
    ganancia: 1090000
  },
  {
    fecha: new Date().toLocaleDateString('es-CO'),
    colmenas: 30,
    perdidas: 0,
    miel: 95.0,
    precio: 21000,
    ingresos: 1995000,
    gastos: 350000,
    ganancia: 1645000
  }
];

export const CONSEJOS_INICIALES: Advice[] = [
  {
    id: 1,
    nombre: 'Carlos Mendoza',
    ubicacion: 'Apiario El Roble · Boyacá',
    categoria: 'Sanidad y Varroa',
    metodo: 'Método Orgánico',
    rating: 5,
    texto:
      'Para el control de Varroa sin químicos residuales, combinamos pisos sanitarios de malla (fondo antivarroa) con sublimación de ácido oxálico puro cuando no hay alzas melarias. Las varroas que caen por desparasitación natural no pueden volver a trepar gracias a la rejilla. Este método redujo la mortalidad en época de frío a menos del 3%.',
    fecha: 'Hace 2 días',
    likes: 26,
    likedByUser: false
  },
  {
    id: 2,
    nombre: 'Doña Elena Restrepo',
    ubicacion: 'Apiario Los Arrayanes · Quindío',
    categoria: 'Nutrición y Alimentación',
    metodo: 'Técnica de Estimulación',
    rating: 5,
    texto:
      'En semanas previas a la floración principal, preparamos torta proteica casera con harina de soya desgrasada (15%), polen propio congelado (15%) y azúcar micropulverizada amasada con jarabe de azúcar 2:1. La colocamos directamente sobre los cabezales envuelta en papel parafinado con hendiduras. La reina responde duplicando el área de postura en menos de 10 días.',
    fecha: 'Hace 4 días',
    likes: 31,
    likedByUser: false
  },
  {
    id: 3,
    nombre: 'Javier Ramos',
    ubicacion: 'Finca La Reina · Santander',
    categoria: 'Piqueras y Manejo',
    metodo: 'Control Físico y Sanitario',
    rating: 5,
    texto:
      'Para proteger colmenas y núcleos de hormigas bravas y escarabajos de la colmena (Aethina tumida), montamos los bancos sobre postes cuyas bases reposan en latas llenas de aceite comestible reciclado. Además, reducimos la piquera con listones de madera a solo 3 cm en enjambres jóvenes para que las guardianas defiendan con facilidad la entrada contra pillajes.',
    fecha: 'Hace 1 semana',
    likes: 19,
    likedByUser: false
  },
  {
    id: 4,
    nombre: 'Marta Lucía Gómez',
    ubicacion: 'Apicultura de Montaña · Antioquia',
    categoria: 'Clima y Protección',
    metodo: 'Manejo Tradicional de Campo',
    rating: 5,
    texto:
      'En zonas de alta precipitación, el mayor enemigo es la humedad condensada en el techo que gotea sobre el nido. Nuestra técnica consiste en dar una inclinación hacia adelante de 2 a 3 cm a toda la colmena, e instalar entretapa de madera con malla de ventilación pequeña y cubierta de costal de fique seco. El aire circula sin crear corrientes frías y los panales jamás generan hongos.',
    fecha: 'Hace 1 semana',
    likes: 22,
    likedByUser: false
  },
  {
    id: 5,
    nombre: 'Don Gustavo Ramírez',
    ubicacion: 'Apiario El Prado · Cundinamarca',
    categoria: 'Reinas y Enjambres',
    metodo: 'Método Preventivo',
    rating: 5,
    texto:
      'Para evitar la enjambrazón natural cuando la colmena está a tope de población, aplicamos la técnica de división temprana: trasladamos la reina fundadora con dos bastidores de cría sellada, un bastidor de reservas y nodrizas a un núcleo nuevo a 3 metros. En la colmena madre seleccionamos la mejor celda real operculada. De esta forma duplicamos colmenas y no perdemos enjambres en las copas de los árboles.',
    fecha: 'Hace 2 semanas',
    likes: 28,
    likedByUser: false
  }
];

export function obtenerUsuarioActual(): User | null {
  try {
    const sesion = localStorage.getItem('usuarioApicola') || sessionStorage.getItem('usuarioApicola');
    if (sesion) {
      return JSON.parse(sesion);
    }
  } catch (e) {
    console.error('Error al leer usuario:', e);
  }
  return null;
}

export function guardarUsuarioActual(user: User, recordar: boolean = true) {
  if (recordar) {
    localStorage.setItem('usuarioApicola', JSON.stringify(user));
  } else {
    sessionStorage.setItem('usuarioApicola', JSON.stringify(user));
  }
}

export function cerrarSesionUsuario() {
  localStorage.removeItem('usuarioApicola');
  sessionStorage.removeItem('usuarioApicola');
}

export function obtenerCuentas(): Account[] {
  try {
    const raw = localStorage.getItem('cuentasApicola');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error al leer cuentas:', e);
  }
  localStorage.setItem('cuentasApicola', JSON.stringify(CUENTAS_INICIALES));
  return [...CUENTAS_INICIALES];
}

export function guardarCuentas(cuentas: Account[]) {
  localStorage.setItem('cuentasApicola', JSON.stringify(cuentas));
}

export function obtenerClaveRegistros(email?: string): string {
  if (!email) return 'registrosApicola_demo_carlos';
  const normalizado = email.trim().toLowerCase();
  if (normalizado === EMAIL_DEMO) {
    return 'registrosApicola_demo_carlos';
  }
  return `registrosApicola_usuario_${normalizado}`;
}

export function cargarRegistrosDeUsuario(email?: string): HarvestRecord[] {
  const key = obtenerClaveRegistros(email);
  try {
    const guardados = localStorage.getItem(key);
    if (guardados !== null) {
      const parsed = JSON.parse(guardados);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error al cargar registros del usuario:', e);
  }

  // Si es la cuenta de demo (Carlos Mendoza)
  if (email && email.trim().toLowerCase() === EMAIL_DEMO) {
    const datosViejos = localStorage.getItem('registrosApicola');
    if (datosViejos) {
      try {
        const parsedViejo = JSON.parse(datosViejos);
        if (Array.isArray(parsedViejo) && parsedViejo.length > 0) {
          localStorage.setItem(key, JSON.stringify(parsedViejo));
          return parsedViejo;
        }
      } catch (e) {}
    }
    localStorage.setItem(key, JSON.stringify(REGISTROS_DEMO_INICIALES));
    return JSON.parse(JSON.stringify(REGISTROS_DEMO_INICIALES));
  }

  return [];
}

export function guardarRegistrosDeUsuario(email: string, registros: HarvestRecord[]) {
  const key = obtenerClaveRegistros(email);
  localStorage.setItem(key, JSON.stringify(registros));
}

export function obtenerConsejos(): Advice[] {
  try {
    const guardados = localStorage.getItem('consejosApicola');
    if (guardados) {
      const parsed = JSON.parse(guardados);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error al cargar consejos:', e);
  }
  localStorage.setItem('consejosApicola', JSON.stringify(CONSEJOS_INICIALES));
  return [...CONSEJOS_INICIALES];
}

export function guardarConsejos(consejos: Advice[]) {
  localStorage.setItem('consejosApicola', JSON.stringify(consejos));
}
