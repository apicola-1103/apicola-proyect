import React, { useEffect } from 'react';
import { HarvestRecord } from '../types';
import { formatoDinero } from '../utils/formatters';

interface ConfirmModalProps {
  isOpen: boolean;
  mode: 'single' | 'wipe';
  recordToDelete?: HarvestRecord | null;
  totalRecordsCount?: number;
  isDemo?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  mode,
  recordToDelete,
  totalRecordsCount = 0,
  isDemo = false,
  onClose,
  onConfirm
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div
            className="modal-icon-wrap"
            style={{
              background: '#fee2e2',
              color: mode === 'wipe' ? '#dc2626' : '#ef4444'
            }}
          >
            {mode === 'wipe' ? '⚠️' : '🗑️'}
          </div>
          <div>
            <h4 className="modal-title">
              {mode === 'wipe' ? '¿Eliminar todos los registros?' : '¿Eliminar este registro?'}
            </h4>
            <p className="modal-desc">
              {mode === 'wipe'
                ? isDemo
                  ? "Se borrarán todos los registros de la cuenta demo de prueba. Puedes restablecerlos cuando desees con el botón 'Restablecer demo'."
                  : 'Se eliminarán permanentemente todos los registros guardados en tu cuenta única.'
                : 'Esta acción quitará el registro del historial de tu apiario.'}
            </p>
          </div>
          <button type="button" className="modal-btn-close" onClick={onClose} aria-label="Cerrar ventana modal">
            &times;
          </button>
        </div>

        <div className="modal-body">
          {mode === 'single' && recordToDelete ? (
            <div className="modal-detail-box">
              <div className="modal-detail-item">
                <span className="modal-detail-label">Fecha</span>
                <span className="modal-detail-val">{recordToDelete.fecha}</span>
              </div>
              <div className="modal-detail-item">
                <span className="modal-detail-label">Colmenas</span>
                <span className="modal-detail-val">
                  {recordToDelete.colmenas} colmenas ({recordToDelete.perdidas} pérdidas)
                </span>
              </div>
              <div className="modal-detail-item">
                <span className="modal-detail-label">Miel Cosechada</span>
                <span className="modal-detail-val">{Number(recordToDelete.miel).toFixed(2)} kg</span>
              </div>
              <div className="modal-detail-item">
                <span className="modal-detail-label">Ganancia</span>
                <span
                  className="modal-detail-val"
                  style={{ color: recordToDelete.ganancia >= 0 ? '#10b981' : '#ef4444' }}
                >
                  {formatoDinero(recordToDelete.ganancia)}
                </span>
              </div>
            </div>
          ) : (
            <div
              style={{
                background: '#fff1f2',
                border: '1px solid #fecdd3',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '13px',
                color: '#9f1239',
                lineHeight: 1.5
              }}
            >
              ⚠️ Tienes actualmente <strong>{totalRecordsCount}</strong> registro(s) guardados. Esta acción dejará tu historial en blanco.
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-modal-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="btn-modal-confirm-delete" onClick={onConfirm}>
            {mode === 'wipe' ? '🗑️ Sí, Vaciar Todo el Historial' : '🗑️ Sí, Eliminar Registro'}
          </button>
        </div>
      </div>
    </div>
  );
};
