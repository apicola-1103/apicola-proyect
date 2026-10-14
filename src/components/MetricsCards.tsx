import React from 'react';
import { HarvestRecord } from '../types';
import { formatoDinero } from '../utils/formatters';

interface MetricsCardsProps {
  registros: HarvestRecord[];
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({ registros }) => {
  const totalColmenas = registros.reduce((acc, r) => acc + (r.colmenas || 0), 0);
  const totalMiel = registros.reduce((acc, r) => acc + (r.miel || 0), 0);
  const totalPerdidas = registros.reduce((acc, r) => acc + (r.perdidas || 0), 0);
  const totalGanancia = registros.reduce((acc, r) => acc + (r.ganancia || 0), 0);

  return (
    <div className="metrics-grid">
      <div className="metric-card">
        <div className="metric-header">
          <h4>Colmenas Inspeccionadas</h4>
          <span>🐝</span>
        </div>
        <div className="metric-value highlight-amber">{totalColmenas}</div>
      </div>

      <div className="metric-card">
        <div className="metric-header">
          <h4>Miel Producida</h4>
          <span>🍯</span>
        </div>
        <div className="metric-value">{totalMiel.toFixed(2)} kg</div>
      </div>

      <div className="metric-card">
        <div className="metric-header">
          <h4>Colmenas Perdidas</h4>
          <span>📉</span>
        </div>
        <div className="metric-value">{totalPerdidas}</div>
      </div>

      <div className="metric-card">
        <div className="metric-header">
          <h4>Ganancia Neta Acumulada</h4>
          <span>💰</span>
        </div>
        <div className="metric-value highlight-green">{formatoDinero(totalGanancia)}</div>
      </div>
    </div>
  );
};
