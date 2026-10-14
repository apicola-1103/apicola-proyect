export function formatoDinero(valor: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(valor);
}

export function obtenerFechaActualEspanol(): string {
  const opcionesFecha: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const fechaTexto = new Date().toLocaleDateString('es-CO', opcionesFecha);
  return `📅 ${fechaTexto.charAt(0).toUpperCase() + fechaTexto.slice(1)}`;
}
