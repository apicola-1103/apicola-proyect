import React from 'react';
import logoImg from '../assets/images/apicola_project_logo.jpg';

interface LandingHeaderProps {
  onOpenAuth: () => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({ onOpenAuth }) => {
  return (
    <header className="landing-header">
      <a href="#hero" className="brand-lockup">
        <img
          src={logoImg}
          alt="Emblema Control Apícola"
          className="brand-emblem-mini"
          style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'cover' }}
          referrerPolicy="no-referrer"
        />
        <span className="brand-name">Control Apícola</span>
      </a>

      <nav className="landing-nav">
        <a href="#caracteristicas">Características</a>
        <a href="#calculadora">Calculadora Apícola</a>
        <a href="#testimonios">Testimonios</a>
        <a href="#consejos">Consejos</a>
        <button
          type="button"
          className="nav-login-link"
          onClick={onOpenAuth}
          style={{ background: 'var(--color-honey-light)', border: '1px solid rgba(245, 158, 11, 0.25)', cursor: 'pointer' }}
        >
          🔑 Iniciar Sesión / Cuenta Única
        </button>
      </nav>
    </header>
  );
};
