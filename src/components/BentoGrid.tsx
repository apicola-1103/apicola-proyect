import React from 'react';
import harvestImg from '../assets/images/beekeeper_harvesting_honey_1790193205163.jpg';
import marketImg from '../assets/images/honey_jars_market_produce_1790193214848.jpg';

export const BentoGrid: React.FC = () => {
  return (
    <section className="section-container" id="caracteristicas">
      <div className="section-head">
        <h2>Herramientas diseñadas para el trabajo apícola real</h2>
        <p>Desde el conteo de cajones en el apiario hasta el cálculo de ganancias tras la extracción de miel.</p>
      </div>

      <div className="bento-grid">
        {/* Tarjeta 1 (Ancha) */}
        <div className="bento-card col-span-2">
          <div className="bento-card-header">
            <span className="bento-badge">Trazabilidad en Campo</span>
            <h3>Registro de Cosecha y Extracción de Miel</h3>
            <p>
              Monitorea con precisión los kilogramos obtenidos en cada extracción estacional y evalúa el rendimiento
              promedio por colmena activa.
            </p>
          </div>
          <div className="bento-img-wrapper">
            <img
              src={harvestImg}
              alt="Apicultor inspeccionando marco de miel con abejas"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Tarjeta 2 */}
        <div className="bento-card">
          <div className="bento-card-header">
            <span className="bento-badge">Sanidad y Población</span>
            <h3>Censo y Detección de Pérdidas</h3>
            <p>
              Anota colmenas zanganeras, enjambrazones o bajas por plagas (Varroa o escarabajo) para tomar medidas
              preventivas a tiempo.
            </p>
          </div>
          <div
            style={{
              background: 'var(--color-surface-subtle)',
              padding: '18px',
              borderRadius: 'var(--radius-sm)',
              border: '1px dashed var(--color-border)',
              marginTop: 'auto'
            }}
          >
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
              Indicador de alerta
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-danger)' }}>
              📉 Reducción del margen de pérdida estacional
            </div>
          </div>
        </div>

        {/* Tarjeta 3 */}
        <div className="bento-card">
          <div className="bento-card-header">
            <span className="bento-badge">Control Financiero</span>
            <h3>Cálculo de Insumos y Ganancia Neta</h3>
            <p>
              Resta automáticamente costos de cera estampada, alimento suplementario, transporte y empaques frente al total
              de ventas.
            </p>
          </div>
          <div
            style={{
              background: 'var(--color-surface-subtle)',
              padding: '18px',
              borderRadius: 'var(--radius-sm)',
              border: '1px dashed var(--color-border)',
              marginTop: 'auto'
            }}
          >
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
              Fórmula Automática
            </div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: 'var(--color-success)',
                fontFamily: "'JetBrains Mono', monospace"
              }}
            >
              Ganancia = (kg × Precio) - Gastos
            </div>
          </div>
        </div>

        {/* Tarjeta 4 (Ancha) */}
        <div className="bento-card col-span-2">
          <div className="bento-card-header">
            <span className="bento-badge">Comercialización</span>
            <h3>Precios de Mercado y Fraccionamiento</h3>
            <p>
              Define precios competitivos por kilogramo al por mayor o al detal para maximizar el retorno de inversión de
              cada temporada de floración.
            </p>
          </div>
          <div className="bento-img-wrapper">
            <img
              src={marketImg}
              alt="Frascos de miel pura artesanal y panal de cera"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
