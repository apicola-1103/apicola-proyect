import React, { useState } from 'react';
import { HarvestRecord } from '../types';

interface RecordFormProps {
  onAddRecord: (nuevo: HarvestRecord) => void;
}

export const RecordForm: React.FC<RecordFormProps> = ({ onAddRecord }) => {
  const [colmenas, setColmenas] = useState<string>('');
  const [perdidas, setPerdidas] = useState<string>('');
  const [miel, setMiel] = useState<string>('');
  const [precio, setPrecio] = useState<string>('');
  const [gastos, setGastos] = useState<string>('');
  const [mensaje, setMensaje] = useState<{ tipo: 'error' | 'success'; texto: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje(null);

    if (colmenas === '' || perdidas === '' || miel === '' || precio === '' || gastos === '') {
      setMensaje({ tipo: 'error', texto: '⚠️ Por favor completa todos los campos del registro.' });
      return;
    }

    const numColmenas = Number(colmenas);
    const numPerdidas = Number(perdidas);
    const numMiel = Number(miel);
    const numPrecio = Number(precio);
    const numGastos = Number(gastos);

    if (numColmenas < 0 || numPerdidas < 0 || numMiel < 0 || numPrecio < 0 || numGastos < 0) {
      setMensaje({ tipo: 'error', texto: '⚠️ Los valores no pueden ser números negativos.' });
      return;
    }

    const ingresos = numMiel * numPrecio;
    const ganancia = ingresos - numGastos;

    const nuevoRegistro: HarvestRecord = {
      fecha: new Date().toLocaleDateString('es-CO'),
      colmenas: numColmenas,
      perdidas: numPerdidas,
      miel: numMiel,
      precio: numPrecio,
      ingresos,
      gastos: numGastos,
      ganancia
    };

    onAddRecord(nuevoRegistro);

    setColmenas('');
    setPerdidas('');
    setMiel('');
    setPrecio('');
    setGastos('');

    setMensaje({ tipo: 'success', texto: '✅ Registro guardado exitosamente en tu historial.' });
    setTimeout(() => {
      setMensaje(null);
    }, 3500);
  };

  return (
    <div className="card-section">
      <div className="section-header">
        <h3>📋 Nuevo Registro de Cosecha e Inspección</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="colmenas">Cantidad de colmenas inspeccionadas</label>
            <input
              type="number"
              id="colmenas"
              min="0"
              placeholder="Ej: 20"
              value={colmenas}
              onChange={(e) => setColmenas(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="perdidas">Colmenas perdidas / inactivas</label>
            <input
              type="number"
              id="perdidas"
              min="0"
              placeholder="Ej: 2"
              value={perdidas}
              onChange={(e) => setPerdidas(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="miel">Cantidad de miel cosechada (kg)</label>
            <input
              type="number"
              id="miel"
              min="0"
              step="0.01"
              placeholder="Ej: 50.5"
              value={miel}
              onChange={(e) => setMiel(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="precio">Precio de venta por kg (COP)</label>
            <input
              type="number"
              id="precio"
              min="0"
              step="0.01"
              placeholder="Ej: 18000"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gastos">Gastos operativos e insumos (COP)</label>
            <input
              type="number"
              id="gastos"
              min="0"
              step="0.01"
              placeholder="Ej: 200000"
              value={gastos}
              onChange={(e) => setGastos(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button type="submit" className="btn-primary" style={{ margin: 0, width: '100%' }}>
              <span>💾 Guardar Registro</span>
            </button>
          </div>
        </div>

        {mensaje && (
          <div className={`message-box ${mensaje.tipo}`} style={{ display: 'block' }}>
            {mensaje.texto}
          </div>
        )}
      </form>
    </div>
  );
};
