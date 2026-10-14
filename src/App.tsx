import React, { useState, useEffect } from 'react';
import { User, HarvestRecord, Advice } from './types';
import {
  EMAIL_DEMO,
  REGISTROS_DEMO_INICIALES,
  cargarRegistrosDeUsuario,
  cerrarSesionUsuario,
  guardarConsejos,
  guardarRegistrosDeUsuario,
  guardarUsuarioActual,
  obtenerConsejos,
  obtenerUsuarioActual
} from './services/storage';

// Landing Components
import { LandingHeader } from './components/LandingHeader';
import { HeroSection } from './components/HeroSection';
import { BentoGrid } from './components/BentoGrid';
import { CalculatorSection } from './components/CalculatorSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AdviceSection } from './components/AdviceSection';
import { AuthSection } from './components/AuthSection';
import { LandingFooter } from './components/LandingFooter';

// Dashboard Components
import { DashboardNavbar } from './components/DashboardNavbar';
import { DashboardWelcome } from './components/DashboardWelcome';
import { MetricsCards } from './components/MetricsCards';
import { RecordForm } from './components/RecordForm';
import { RecordsTable } from './components/RecordsTable';
import { ConfirmModal } from './components/ConfirmModal';
import { NotificationToast } from './components/NotificationToast';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'landing' | 'dashboard'>('landing');
  const [user, setUser] = useState<User | null>(() => obtenerUsuarioActual());
  const [registros, setRegistros] = useState<HarvestRecord[]>([]);
  const [consejos, setConsejos] = useState<Advice[]>(() => obtenerConsejos());

  // Modal & Toast States
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'single' | 'wipe';
    index?: number;
  }>({
    isOpen: false,
    mode: 'single'
  });

  const [toastState, setToastState] = useState<{
    visible: boolean;
    message: string;
    showUndo: boolean;
  }>({
    visible: false,
    message: '',
    showUndo: false
  });

  const [lastDeleted, setLastDeleted] = useState<{ item: HarvestRecord; index: number } | null>(null);

  // Sync records whenever user changes or view changes
  useEffect(() => {
    if (user && user.email) {
      const datos = cargarRegistrosDeUsuario(user.email);
      setRegistros(datos);
    } else {
      setRegistros([]);
    }
  }, [user]);

  const showToast = (message: string, showUndo: boolean = false) => {
    setToastState({ visible: true, message, showUndo });
    setTimeout(() => {
      setToastState((prev) => ({ ...prev, visible: false }));
    }, 5500);
  };

  const handleOpenAuth = () => {
    if (user) {
      setActiveView('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveView('landing');
      const authEl = document.getElementById('iniciar-sesion');
      if (authEl) {
        authEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogin = (newUser: User, recordar: boolean) => {
    guardarUsuarioActual(newUser, recordar);
    setUser(newUser);
    const userRecords = cargarRegistrosDeUsuario(newUser.email);
    setRegistros(userRecords);
    setActiveView('dashboard');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleLogout = () => {
    cerrarSesionUsuario();
    setUser(null);
    setRegistros([]);
    setActiveView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToLanding = () => {
    setActiveView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Records Operations
  const handleAddRecord = (nuevo: HarvestRecord) => {
    if (!user || !user.email) return;
    const actualizados = [nuevo, ...registros];
    setRegistros(actualizados);
    guardarRegistrosDeUsuario(user.email, actualizados);
  };

  const handleRequestDelete = (index: number) => {
    setModalState({
      isOpen: true,
      mode: 'single',
      index
    });
  };

  const handleRequestWipe = () => {
    setModalState({
      isOpen: true,
      mode: 'wipe'
    });
  };

  const handleConfirmModalAction = () => {
    if (!user || !user.email) return;

    if (modalState.mode === 'single' && modalState.index !== undefined) {
      const idx = modalState.index;
      const eliminado = registros[idx];
      if (eliminado) {
        const actualizados = [...registros];
        actualizados.splice(idx, 1);
        setRegistros(actualizados);
        guardarRegistrosDeUsuario(user.email, actualizados);
        setLastDeleted({ item: eliminado, index: idx });
        setModalState({ isOpen: false, mode: 'single' });
        showToast(`🗑️ Registro del ${eliminado.fecha} eliminado`, true);
      }
    } else if (modalState.mode === 'wipe') {
      setRegistros([]);
      guardarRegistrosDeUsuario(user.email, []);
      setModalState({ isOpen: false, mode: 'wipe' });
      showToast('🗑️ Historial vaciado correctamente', false);
    }
  };

  const handleUndo = () => {
    if (!lastDeleted || !user || !user.email) return;
    const actualizados = [...registros];
    actualizados.splice(lastDeleted.index, 0, lastDeleted.item);
    setRegistros(actualizados);
    guardarRegistrosDeUsuario(user.email, actualizados);
    setLastDeleted(null);
    setToastState({ visible: false, message: '', showUndo: false });
    showToast('↺ Registro restaurado exitosamente', false);
  };

  const handleResetDemo = () => {
    if (!user || !user.email || user.email.toLowerCase() !== EMAIL_DEMO) return;
    const iniciales = JSON.parse(JSON.stringify(REGISTROS_DEMO_INICIALES));
    setRegistros(iniciales);
    guardarRegistrosDeUsuario(user.email, iniciales);
    showToast('🔄 Registros de demostración restablecidos', false);
  };

  // Advice Operations
  const handleAddAdvice = (nuevo: Advice) => {
    const actualizados = [nuevo, ...consejos];
    setConsejos(actualizados);
    guardarConsejos(actualizados);
  };

  const handleToggleLike = (id: number) => {
    const actualizados = consejos.map((c) => {
      if (c.id === id) {
        const liked = !c.likedByUser;
        const count = liked ? (c.likes || 0) + 1 : Math.max(0, (c.likes || 1) - 1);
        return { ...c, likes: count, likedByUser: liked };
      }
      return c;
    });
    setConsejos(actualizados);
    guardarConsejos(actualizados);
  };

  const isDemo = user?.email?.toLowerCase() === EMAIL_DEMO;
  const targetRecord = modalState.index !== undefined ? registros[modalState.index] : null;

  return (
    <div>
      {/* 1. PUBLIC VIEW (Landing Page) */}
      {activeView === 'landing' && (
        <div id="landing">
          <LandingHeader onOpenAuth={handleOpenAuth} />
          <HeroSection />
          <BentoGrid />
          <CalculatorSection />
          <TestimonialsSection />
          <AdviceSection
            consejos={consejos}
            onAddAdvice={handleAddAdvice}
            onToggleLike={handleToggleLike}
          />
          <AuthSection onLogin={handleLogin} />
          <LandingFooter onOpenAuth={handleOpenAuth} />
        </div>
      )}

      {/* 2. PRIVATE VIEW (Dashboard) */}
      {activeView === 'dashboard' && user && (
        <div id="app" style={{ display: 'block' }}>
          <DashboardNavbar
            user={user}
            onGoToLanding={handleGoToLanding}
            onLogout={handleLogout}
          />

          <main className="main-content">
            <DashboardWelcome user={user} />
            <MetricsCards registros={registros} />
            <RecordForm onAddRecord={handleAddRecord} />
            <RecordsTable
              user={user}
              registros={registros}
              onDeleteRecord={handleRequestDelete}
              onRequestWipe={handleRequestWipe}
              onResetDemo={handleResetDemo}
            />
          </main>
        </div>
      )}

      {/* Global In-App Confirmation Modal */}
      <ConfirmModal
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        recordToDelete={targetRecord}
        totalRecordsCount={registros.length}
        isDemo={isDemo}
        onClose={() => setModalState({ isOpen: false, mode: 'single' })}
        onConfirm={handleConfirmModalAction}
      />

      {/* Global Notification Toast */}
      <NotificationToast
        visible={toastState.visible}
        message={toastState.message}
        showUndo={toastState.showUndo}
        onUndo={handleUndo}
      />
    </div>
  );
};

export default App;
