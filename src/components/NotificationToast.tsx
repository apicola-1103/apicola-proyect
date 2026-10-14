import React from 'react';

interface NotificationToastProps {
  visible: boolean;
  message: string;
  showUndo?: boolean;
  onUndo?: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  visible,
  message,
  showUndo = false,
  onUndo
}) => {
  if (!visible) return null;

  return (
    <div className="toast-floating">
      <span>✅</span>
      <span>{message}</span>
      {showUndo && onUndo && (
        <button type="button" className="toast-btn-undo" onClick={onUndo}>
          ↺ Deshacer
        </button>
      )}
    </div>
  );
};
