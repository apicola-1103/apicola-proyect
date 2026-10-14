# Control Apícola 🐝

Sistema integral de registro, sanidad, trazabilidad y control de rentabilidad de colmenas para apicultores. Reescrito como una aplicación React con TypeScript y Vite.

## 🚀 Características

- **Landing Page Informativa**:
  - Resumen de beneficios y estadísticas de apiarios.
  - Bento grid interactivo con trazabilidad en campo, censo y control financiero.
  - Calculadora apícola interactiva con estimación de cosecha, ingresos, costos y ganancia neta en COP.
  - Muro colaborativo de intercambio de consejos de cuidado y sanidad apícola con filtros y votaciones.
  - Testimonios reales de apicultores en Boyacá, Antioquia y Santander.
- **Autenticación Unificada y Demo Rápido**:
  - Acceso seguro con cuentas únicas de apicultor.
  - Botón de acceso de 1 clic con cuenta demo (Carlos Mendoza).
- **Dashboard Privado**:
  - Banner de bienvenida personalizado con fecha actual en español.
  - Indicadores clave: colmenas inspeccionadas, miel producida (kg), pérdidas y ganancia acumulada.
  - Formulario de nuevo registro de inspección y cosecha con cálculo automático de ingresos y rentabilidad.
  - Historial de registros con aislamiento por apicultor, eliminación con modal accesible y opción de deshacer (*undo*).

## 🛠️ Tecnologías

- **React 18**
- **TypeScript**
- **Vite**
- **CSS Modular con Variables**
- **Persistencia local (LocalStorage / SessionStorage) con aislamiento de cuentas**

## 💻 Desarrollo

```bash
npm run dev
```

Inicia el servidor de desarrollo en `http://localhost:3000`.

## 📦 Construcción

```bash
npm run build
```
