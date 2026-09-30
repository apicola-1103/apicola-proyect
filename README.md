# Control Apícola 🐝

Sistema integral de registro, sanidad, trazabilidad y control de rentabilidad de colmenas para apicultores.

## 🚀 Despliegue en Vercel (Configuración Express y Archivos Estáticos)

Cuando despliegas una aplicación **Express** en Vercel, la plataforma ignora el `express.static()` interno para el CDN y **requiere obligatoriamente que todos los archivos estáticos (CSS, imágenes, JS) residan dentro de la carpeta `public/`**.

El proyecto ya está estructurado con la arquitectura exacta requerida por Vercel:

### Estructura de Archivos para Vercel:
```text
├── public/                     <- Servido directamente por la CDN de Vercel
│   ├── estilos.css             <- /estilos.css con tipo MIME text/css
│   ├── index.html              <- Vista principal
│   ├── pagina.html             <- Vista secundaria
│   └── src/assets/images/      <- Todas las imágenes (/src/assets/images/...)
├── api/
│   └── index.js                <- Handler Serverless para Vercel Express
├── vercel.json                 <- Reglas de reescritura explícitas para CSS e imágenes
├── server.js                   <- Servidor Express compatible tanto local como en nube
└── package.json                <- Script de build que sincroniza los recursos a public/
```

---

### Pasos para actualizar el despliegue en Vercel

1. **Haz commit y push de estos cambios a tu repositorio en GitHub:**
   ```bash
   git add .
   git commit -m "Fix: agregar carpeta public con estilos e imagenes para Vercel Express"
   git push origin main
   ```
2. Vercel detectará el commit y volverá a compilar (*Redeploy*) de manera automática.
3. Al terminar el despliegue, abre la URL de Vercel y tu página cargará con todos los estilos CSS, fuentes, imágenes y calculadora funcionando a la perfección.
