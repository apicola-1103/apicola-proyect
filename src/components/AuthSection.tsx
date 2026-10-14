import React, { useState } from 'react';
import { User } from '../types';
import { EMAIL_DEMO, guardarCuentas, obtenerCuentas } from '../services/storage';

interface AuthSectionProps {
  onLogin: (user: User, recordar: boolean) => void;
}

export const AuthSection: React.FC<AuthSectionProps> = ({ onLogin }) => {
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [clave, setClave] = useState<string>('');
  const [apiario, setApiario] = useState<string>('');
  const [cedula, setCedula] = useState<string>('');
  const [edad, setEdad] = useState<string>('');
  const [recordar, setRecordar] = useState<boolean>(true);
  const [mostrarClave, setMostrarClave] = useState<boolean>(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'error' | 'success'; texto: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje(null);

    const nombreLimpio = nombre.trim();
    const emailLimpio = email.trim().toLowerCase();
    const apiarioLimpio = apiario.trim();
    const cedulaLimpia = cedula.trim();

    if (!nombreLimpio) {
      setMensaje({ tipo: 'error', texto: '⚠️ Por favor ingresa el Nombre Completo del Apicultor.' });
      return;
    }

    if (!emailLimpio || !clave) {
      setMensaje({
        tipo: 'error',
        texto: '⚠️ Por favor ingresa el Correo Electrónico y la Clave de tu cuenta única.'
      });
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio);
    if (!emailValido) {
      setMensaje({
        tipo: 'error',
        texto: '⚠️ Por favor ingresa un formato de correo electrónico válido (ejemplo: apicultor@apicola.com).'
      });
      return;
    }

    if (clave.length < 6) {
      setMensaje({ tipo: 'error', texto: '⚠️ La clave de acceso debe contener al menos 6 caracteres.' });
      return;
    }

    let edadNum = 35;
    if (edad) {
      const parsed = Number(edad);
      if (isNaN(parsed) || parsed < 1 || parsed > 120) {
        setMensaje({ tipo: 'error', texto: '⚠️ Ingresa una edad válida entre 1 y 120 años.' });
        return;
      }
      edadNum = parsed;
    }

    const cuentas = obtenerCuentas();
    const cuentaExistente = cuentas.find((c) => c.email.toLowerCase() === emailLimpio);

    let loggedUser: User;

    if (cuentaExistente) {
      if (cuentaExistente.clave !== clave) {
        setMensaje({
          tipo: 'error',
          texto: '⚠️ La clave ingresada no coincide con la clave única registrada para este correo. Por favor verifícala.'
        });
        return;
      }

      if (nombreLimpio && nombreLimpio !== cuentaExistente.nombre) {
        cuentaExistente.nombre = nombreLimpio;
      }
      if (apiarioLimpio && apiarioLimpio !== cuentaExistente.apiario) {
        cuentaExistente.apiario = apiarioLimpio;
      }
      if (cedulaLimpia && cedulaLimpia !== cuentaExistente.cedula) {
        cuentaExistente.cedula = cedulaLimpia;
      }
      if (edad) {
        cuentaExistente.edad = edadNum;
      }
      guardarCuentas(cuentas);

      loggedUser = {
        nombre: cuentaExistente.nombre,
        email: cuentaExistente.email,
        cedula: cuentaExistente.cedula || 'No registrada',
        edad: cuentaExistente.edad || 35,
        apiario: cuentaExistente.apiario || 'Apiario Familiar'
      };

      setMensaje({
        tipo: 'success',
        texto: `✅ ¡Sesión iniciada con éxito! Bienvenido/a nuevamente, ${loggedUser.nombre}.`
      });
    } else {
      const nuevaCuenta = {
        nombre: nombreLimpio,
        email: emailLimpio,
        clave,
        cedula: cedulaLimpia || 'Sin documento',
        edad: edadNum,
        apiario: apiarioLimpio || `Apiario ${nombreLimpio}`,
        fechaCreacion: new Date().toISOString()
      };

      cuentas.push(nuevaCuenta);
      guardarCuentas(cuentas);

      loggedUser = {
        nombre: nuevaCuenta.nombre,
        email: nuevaCuenta.email,
        cedula: nuevaCuenta.cedula,
        edad: nuevaCuenta.edad,
        apiario: nuevaCuenta.apiario
      };

      setMensaje({
        tipo: 'success',
        texto: `✅ ¡Cuenta única creada e iniciada con éxito! Bienvenido/a a Control Apícola, ${loggedUser.nombre}.`
      });
    }

    setTimeout(() => {
      onLogin(loggedUser, recordar);
    }, 450);
  };

  const handleLlenarDemo = () => {
    setNombre('Carlos Mendoza');
    setEmail(EMAIL_DEMO);
    setClave('apicola123');
    setApiario('Apiario La Colmena Dorada');
    setCedula('1098765432');
    setEdad('38');

    const demoUser: User = {
      nombre: 'Carlos Mendoza',
      email: EMAIL_DEMO,
      cedula: '1098765432',
      edad: 38,
      apiario: 'Apiario La Colmena Dorada'
    };

    setMensaje({
      tipo: 'success',
      texto: `✅ ¡Accediendo con la cuenta de demostración (Carlos Mendoza)!`
    });

    setTimeout(() => {
      onLogin(demoUser, true);
    }, 350);
  };

  return (
    <section className="access-section" id="iniciar-sesion">
      <div className="access-wrapper">
        <div className="access-content">
          <div
            className="hero-kicker"
            style={{
              background: 'rgba(254, 240, 138, 0.1)',
              borderColor: 'rgba(254, 240, 138, 0.25)',
              color: '#fef08a',
              display: 'inline-flex',
              marginBottom: '16px'
            }}
          >
            <span>🔐</span>
            <span>Acceso al Sistema</span>
          </div>
          <h2>Inicia sesión para registrar tus colmenas y cosechas</h2>
          <p>
            Ingresa a tu panel privado de Control Apícola: lleva el registro diario de colmenas activas, miel cosechada (kg),
            costos operativos y balance neto automático en pesos (COP).
          </p>

          <div className="access-perks">
            <div className="perk-item">
              <span>✓</span>
              <p>
                <strong>Formulario de registro en campo:</strong> conteo de colmenas, pérdidas, kilos de miel y gastos.
              </p>
            </div>
            <div className="perk-item">
              <span>✓</span>
              <p>
                <strong>Historial financiero en tiempo real:</strong> cálculo automático de ingresos brutos y ganancia neta.
              </p>
            </div>
            <div className="perk-item">
              <span>✓</span>
              <p>
                <strong>Almacenamiento seguro en tu navegador:</strong> tus registros se guardan localmente para mayor privacidad.
              </p>
            </div>
          </div>
        </div>

        {/* Auth Form Card */}
        <div className="auth-card">
          <div className="auth-card-head">
            <h3>🔑 Iniciar Sesión con Cuenta Única</h3>
            <p>Ingresa con tus credenciales de apicultor o crea tu cuenta única completando los datos.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="authNombre">Nombre Completo del Apicultor *</label>
              <input
                type="text"
                id="authNombre"
                placeholder="Ej: Carlos Mendoza"
                autoComplete="name"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="authEmail">Correo Electrónico Único *</label>
              <input
                type="email"
                id="authEmail"
                placeholder="tu.correo@ejemplo.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="field-hint info">
                🔒 Cada apicultor tiene un correo único para proteger el acceso a sus registros.
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="authClave">Clave / Contraseña *</label>
              <div className="password-input-wrap">
                <input
                  type={mostrarClave ? 'text' : 'password'}
                  id="authClave"
                  placeholder="Ingresa tu clave de acceso (mínimo 6 caracteres)"
                  autoComplete="current-password"
                  minLength={6}
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn-toggle-password"
                  onClick={() => setMostrarClave(!mostrarClave)}
                  title={mostrarClave ? 'Ocultar clave' : 'Ver clave'}
                >
                  {mostrarClave ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="authApiario">Nombre del Apiario o Finca (Opcional)</label>
              <input
                type="text"
                id="authApiario"
                placeholder="Ej: Apiario La Colmena Dorada"
                value={apiario}
                onChange={(e) => setApiario(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="authCedula">Cédula o Documento de Identidad (Opcional)</label>
              <input
                type="text"
                id="authCedula"
                placeholder="Ej: 1098765432"
                autoComplete="username"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="authEdad">Edad del Apicultor (Opcional)</label>
              <input
                type="number"
                id="authEdad"
                min={1}
                max={120}
                placeholder="Ej: 38"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  id="recordarSesion"
                  checked={recordar}
                  onChange={(e) => setRecordar(e.target.checked)}
                />
                <span>Recordar sesión en este equipo</span>
              </label>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
              <button type="submit" id="btnSubmitAuth" className="btn-primary">
                <span>🐝 Iniciar Sesión / Entrar con mi Cuenta</span>
              </button>

              <button type="button" className="btn-demo" onClick={handleLlenarDemo}>
                ⚡ Probar con cuenta de demostración (Carlos Mendoza)
              </button>
            </div>

            {mensaje && (
              <div className={`message-box ${mensaje.tipo}`} style={{ display: 'block' }}>
                {mensaje.texto}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
