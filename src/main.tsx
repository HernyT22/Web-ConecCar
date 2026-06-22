import './i18n';
import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './app/App.tsx';
import ScrollToTop from './app/components/ScrollToTop.tsx';
import { useHtmlLang } from './i18n/useHtmlLang.ts';
import './styles/index.css';

const VehicleDetail = lazy(() => import('./app/pages/VehicleDetail.tsx'));
const Help = lazy(() => import('./app/pages/Help.tsx'));

function PageLoadingFallback() {
  return <div className="min-h-screen" aria-busy="true" />;
}

const Root = () => {
  useHtmlLang();
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

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>
);
