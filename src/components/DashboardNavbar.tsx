import React from 'react';
import logoImg from '../assets/images/apicola_project_logo.jpg';
import { User } from '../types';

interface DashboardNavbarProps {
  user: User;
  onGoToLanding: () => void;
  onLogout: () => void;
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ user, onGoToLanding, onLogout }) => {
  return (
    <header className="app-navbar">
      <div className="app-brand" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img
          src={logoImg}
          alt="Logo Control Apícola"
          style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover' }}
          referrerPolicy="no-referrer"
        />
        <h2>Control Apícola</h2>
      </div>

      <div className="navbar-user-section">
        <button type="button" className="btn-back-landing" onClick={onGoToLanding}>
          <span>🏡 Ver Landing & Consejos</span>
        </button>
        <div className="user-badge">
          <div className="user-name">{user.nombre}</div>
          <div className="user-meta">{user.email ? `✉️ ${user.email}` : `Cédula: ${user.cedula}`}</div>
        </div>

        <button type="button" className="btn-logout" onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};
