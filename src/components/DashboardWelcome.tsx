import React from 'react';
import { User } from '../types';
import { EMAIL_DEMO } from '../services/storage';
import { obtenerFechaActualEspanol } from '../utils/formatters';

interface DashboardWelcomeProps {
  user: User;
}

export const DashboardWelcome: React.FC<DashboardWelcomeProps> = ({ user }) => {
  const isDemo = user.email && user.email.toLowerCase() === EMAIL_DEMO;
  const fechaTexto = obtenerFechaActualEspanol();

  return (
    <div className="welcome-banner">
      <div className="welcome-info">
        <h3>
          Bienvenido/a, <span>{user.nombre}</span> 👋
        </h3>
        <p>
          Administración de: {user.apiario || 'Apiario Principal'} · {user.email}
        </p>
        {isDemo ? (
          <div className="banner-badge demo">⚡ Cuenta de Demostración · Datos de prueba aislados</div>
        ) : (
          <div className="banner-badge personal">🔒 Cuenta Única Personal · Datos privados independientes</div>
        )}
      </div>
      <div className="welcome-meta">{fechaTexto}</div>
    </div>
  );
};
