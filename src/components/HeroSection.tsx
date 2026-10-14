import React from 'react';
import heroImg from '../assets/images/apiary_beekeeping_hero_1790193106400.jpg';

export const HeroSection: React.FC = () => {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-kicker">
        <span>🐝</span>
        <span>Plataforma Especializada para Apicultores</span>
      </div>

      <h1 className="hero-title">
        La plataforma integral para el registro, salud y rentabilidad de <span>tus colmenas</span>
      </h1>

      <p className="hero-subtitle">
        Control Apícola facilita la gestión diaria de tus apiarios: registra inspecciones y cosechas de miel en kilogramos, monitorea la pérdida de enjambres y calcula automáticamente ingresos netos y gastos operativos.
      </p>

      <div className="hero-cta-group">
        <a href="#consejos" className="btn-hero-primary">
          <span>💡 Ver Consejos para Cuidar Colmenas</span>
        </a>
        <a href="#calculadora" className="btn-hero-secondary">
          <span>📊 Probar Calculadora Apícola</span>
        </a>
      </div>

      {/* Marquee Media Carrier */}
      <div className="hero-media-carrier">
        <img
          src={heroImg}
          alt="Apiario sostenible con colmenas de madera al amanecer"
          className="hero-banner-img"
          referrerPolicy="no-referrer"
        />
        <div className="hero-overlay-bar">
          <div className="hero-stat-pill">
            <div className="stat-item">
              <div className="stat-num">+35%</div>
              <div className="stat-lbl">Eficiencia en control de cosecha</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">100%</div>
              <div className="stat-lbl">Trazabilidad por colmena y kilo</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">COP $</div>
              <div className="stat-lbl">Balance neto automático al instante</div>
            </div>
          </div>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>
            Datos protegidos localmente · Compatible con trabajo en campo
          </div>
        </div>
      </div>
    </section>
  );
};
