import React from 'react';
import logoImg from '../assets/images/apicola_project_logo.jpg';

interface LandingFooterProps {
  onOpenAuth: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ onOpenAuth }) => {
  return (
    <footer className="landing-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img
            src={logoImg}
            alt="Logo Control Apícola"
            className="brand-emblem-mini"
            style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover' }}
            referrerPolicy="no-referrer"
          />
          <span style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>Control Apícola</span>
          <span>· Sistema de Registro para Apicultores</span>
        </div>

        <div className="footer-nav">
          <a href="#hero">Inicio</a>
          <a href="#caracteristicas">Características</a>
          <a href="#calculadora">Calculadora</a>
          <a href="#consejos">Consejos</a>
          <button
            type="button"
            onClick={onOpenAuth}
            style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '13px' }}
          >
            Iniciar Sesión / Cuenta Única
          </button>
        </div>

        <div>© Control Apícola. Todos los derechos reservados.</div>
      </div>
    </footer>
  );
};
