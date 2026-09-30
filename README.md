# Control Apícola 🐝

Sistema integral de registro, sanidad, trazabilidad y control de rentabilidad de colmenas para apicultores.

## 🚀 Despliegue en Vercel

Este proyecto está configurado para desplegarse sin fricción en **Vercel**, tanto como sitio web estático optimizado en CDN global como con funciones backend de Express sin servidor (*Serverless Functions*).

### Archivos de Configuración para Vercel:
- `vercel.json`: Reglas de reescritura de URL (`/pagina.html`, API `/api/*` y fallback SPA para `/index.html`).
- `api/index.js`: Enrutador serverless compatible con la arquitectura de microfunciones de Vercel.
- `.vercelignore`: Lista de archivos excluidos del empaquetado para mantener el despliegue ligero.

---

### Paso a paso para desplegar en Vercel

#### Opción 1: Desde la Interfaz Web de Vercel (Recomendado)
1. Sube tu código a un repositorio en **GitHub**, **GitLab** o **Bitbucket**.
2. Ingresa a tu cuenta en [vercel.com](https://vercel.com) y haz clic en **"Add New..." > "Project"**.
3. Selecciona tu repositorio `apicola-proyect`.
4. En **Framework Preset**, puedes dejarlo en **Other** (Vercel detectará automáticamente `vercel.json` y `package.json`).
5. **Configuración de Build**:
   - **Build Command**: `npm run build` (o dejar por defecto)
   - **Output Directory**: Dejar vacío o por defecto (raíz)
   - **Install Command**: `npm install`
6. *(Opcional)* Si utilizas Supabase para sincronización en la nube, agrega las variables de entorno en la sección **Environment Variables**:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
7. Haz clic en **Deploy**. ¡Tu aplicación estará en línea con certificado SSL gratuito y CDN global!

#### Opción 2: Usando Vercel CLI
Si prefieres desplegar desde la terminal:
```bash
# 1. Instalar la CLI de Vercel (si no la tienes)
npm i -g vercel

# 2. Iniciar sesión y desplegar
vercel

# 3. Para desplegar directamente a producción
vercel --prod
```

---

## 💻 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor local en el puerto 3000
npm run dev
```

La aplicación estará accesible en `http://localhost:3000`.
