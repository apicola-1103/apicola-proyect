import React, { useState } from 'react';
import { formatoDinero } from '../utils/formatters';

export const CalculatorSection: React.FC = () => {
  const [colmenas, setColmenas] = useState<number>(25);
  const [kilosPorColmena, setKilosPorColmena] = useState<number>(22);
  const [precioKilo, setPrecioKilo] = useState<number>(20000);
  const [gastosPorColmena, setGastosPorColmena] = useState<number>(90000);

  // Calculations
  const mielTotal = colmenas * kilosPorColmena;
  const ingresosTotal = mielTotal * precioKilo;
  const gastosTotal = colmenas * gastosPorColmena;
  const gananciaNeta = ingresosTotal - gastosTotal;
  const margen = ingresosTotal > 0 ? ((gananciaNeta / ingresosTotal) * 100).toFixed(1) : '0';

  return (
    <section className="section-container" id="calculadora">
      <div className="section-head">
        <h2>Calculadora Interactiva de Rendimiento y Ganancia</h2>
        <p>Simula la producción y el retorno estimado de tu apiario ajustando los parámetros de tu operación.</p>
      </div>

      <div className="calculator-box">
        <div className="calc-inputs-col">
          <h3>Parámetros del Apiario</h3>
          <p>Mueve los controles para calcular los ingresos proyectados en pesos colombianos (COP).</p>

          <div className="calc-slider-group">
            <div className="calc-slider-header">
              <span>Colmenas en Producción</span>
              <span className="calc-slider-val">{colmenas} colmenas</span>
            </div>
            <input
              type="range"
              className="calc-range-input"
              min="5"
              max="150"
              value={colmenas}
              onChange={(e) => setColmenas(Number(e.target.value))}
            />
          </div>

          <div className="calc-slider-group">
            <div className="calc-slider-header">
              <span>Producción Estimada (kg por colmena/año)</span>
              <span className="calc-slider-val">{kilosPorColmena} kg</span>
            </div>
            <input
              type="range"
              className="calc-range-input"
              min="8"
              max="45"
              value={kilosPorColmena}
              onChange={(e) => setKilosPorColmena(Number(e.target.value))}
            />
          </div>

          <div className="calc-slider-group">
            <div className="calc-slider-header">
              <span>Precio de Venta por Kilo</span>
              <span className="calc-slider-val">{formatoDinero(precioKilo)} COP</span>
            </div>
            <input
              type="range"
              className="calc-range-input"
              min="12000"
              max="35000"
              step="1000"
              value={precioKilo}
              onChange={(e) => setPrecioKilo(Number(e.target.value))}
            />
          </div>

          <div className="calc-slider-group">
            <div className="calc-slider-header">
              <span>Gastos Operativos Anuales por Colmena</span>
              <span className="calc-slider-val">{formatoDinero(gastosPorColmena)} COP</span>
            </div>
            <input
              type="range"
              className="calc-range-input"
              min="30000"
              max="200000"
              step="5000"
              value={gastosPorColmena}
              onChange={(e) => setGastosPorColmena(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="calc-results-col">
          <div>
            <div className="calc-res-title">Proyección Anual Estimada</div>

            <div className="calc-metric-row">
              <span className="calc-metric-label">Cosecha Total Proyectada</span>
              <span className="calc-metric-val">{mielTotal.toFixed(1)} kg</span>
            </div>

            <div className="calc-metric-row">
              <span className="calc-metric-label">Ingresos Brutos Estimados</span>
              <span className="calc-metric-val">{formatoDinero(ingresosTotal)}</span>
            </div>

            <div className="calc-metric-row">
              <span className="calc-metric-label">Costos Operativos Totales</span>
              <span className="calc-metric-val">{formatoDinero(gastosTotal)}</span>
            </div>

            <div className="calc-metric-row">
              <span className="calc-metric-label">Margen de Rentabilidad</span>
              <span className="calc-metric-val" style={{ color: '#86efac' }}>
                {margen}%
              </span>
            </div>
          </div>

          <div className="calc-profit-highlight">
            <div className="calc-profit-lbl">Ganancia Neta Anual Proyectada</div>
            <div className="calc-profit-val">{formatoDinero(gananciaNeta)} COP</div>
          </div>
        </div>
      </div>
    </section>
  );
};
