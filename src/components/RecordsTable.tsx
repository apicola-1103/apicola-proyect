import React from 'react';
import { HarvestRecord, User } from '../types';
import { EMAIL_DEMO } from '../services/storage';
import { formatoDinero } from '../utils/formatters';

interface RecordsTableProps {
  user: User;
  registros: HarvestRecord[];
  onDeleteRecord: (index: number) => void;
  onRequestWipe: () => void;
  onResetDemo: () => void;
}

export const RecordsTable: React.FC<RecordsTableProps> = ({
  user,
  registros,
  onDeleteRecord,
  onRequestWipe,
  onResetDemo
}) => {
  const isDemo = user.email && user.email.toLowerCase() === EMAIL_DEMO;

  return (
    <div className="card-section">
      <div className="section-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <h3>📊 Historial de Registros</h3>
          <span className={`badge-tipo-cuenta ${isDemo ? 'demo' : 'personal'}`}>
            {isDemo ? 'Datos Demo' : 'Cuenta Única'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
            {registros.length} {registros.length === 1 ? 'registro guardado' : 'registros guardados'}
          </span>

          {isDemo && (
            <button
              type="button"
              className="btn-secondary-action"
              onClick={onResetDemo}
              title="Restablecer los 2 registros iniciales de la cuenta demo"
            >
              🔄 Restablecer datos demo
            </button>
          )}

          {registros.length > 0 && (
            <button
              type="button"
              className="btn-danger-action"
              onClick={onRequestWipe}
              title="Eliminar todos los registros de esta cuenta"
            >
              🗑️ Vaciar todo
            </button>
          )}
        </div>
      </div>

      {registros.length === 0 ? (
        <div className="empty-state">
          <span>🐝</span>
          <p>
            <strong>Aún no tienes registros guardados</strong>
          </p>
          <p style={{ fontSize: '13px', marginTop: '4px' }}>
            Completa el formulario superior para registrar la primera cosecha o inspección.
          </p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th className="num">Colmenas</th>
                <th className="num">Pérdidas</th>
                <th className="num">Miel (kg)</th>
                <th className="num">Precio/kg</th>
                <th className="num">Ingresos</th>
                <th className="num">Gastos</th>
                <th className="num">Ganancia</th>
                <th style={{ textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((reg, index) => {
                const gananciaClase = reg.ganancia >= 0 ? 'badge-ganancia-positiva' : 'badge-ganancia-negativa';
                return (
                  <tr key={index}>
                    <td>
                      <strong>{reg.fecha}</strong>
                    </td>
                    <td className="num">{reg.colmenas}</td>
                    <td className="num">{reg.perdidas}</td>
                    <td className="num">{Number(reg.miel).toFixed(2)} kg</td>
                    <td className="num">{formatoDinero(reg.precio)}</td>
                    <td className="num">{formatoDinero(reg.ingresos)}</td>
                    <td className="num">{formatoDinero(reg.gastos)}</td>
                    <td className={`num ${gananciaClase}`}>{formatoDinero(reg.ganancia)}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        className="btn-delete-row"
                        onClick={() => onDeleteRecord(index)}
                        title="Eliminar este registro"
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
