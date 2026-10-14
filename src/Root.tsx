import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { restoreSavedLanguage } from './i18n';
import App from './app/App.tsx';
import ScrollToTop from './app/components/ScrollToTop.tsx';
import { useHtmlLang } from './i18n/useHtmlLang.ts';

// En SSR las rutas se importan de forma estática (top-level await); en el
// cliente quedan como chunks lazy que entry-client precarga antes de hidratar.
export const loadVehicleDetail = () => import('./app/pages/VehicleDetail.tsx');
export const loadHelp = () => import('./app/pages/Help.tsx');

const VehicleDetail = import.meta.env.SSR
  ? (await loadVehicleDetail()).default
  : lazy(loadVehicleDetail);
const Help = import.meta.env.SSR ? (await loadHelp()).default : lazy(loadHelp);

function PageLoadingFallback() {
  return <div className="min-h-screen" aria-busy="true" />;
}

const Root = () => {
  useHtmlLang();
  useEffect(restoreSavedLanguage, []);
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/flota/:slug"
          element={
            <Suspense fallback={<PageLoadingFallback />}>
              <VehicleDetail />
            </Suspense>
          }
        />
        <Route
          path="/ayuda"
          element={
            <Suspense fallback={<PageLoadingFallback />}>
              <Help />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default Root;
