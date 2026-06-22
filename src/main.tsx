import './i18n';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './app/App.tsx';
import VehicleDetail from './app/pages/VehicleDetail.tsx';
import Help from './app/pages/Help.tsx';
import ScrollToTop from './app/components/ScrollToTop.tsx';
import { useHtmlLang } from './i18n/useHtmlLang.ts';
import './styles/index.css';

const Root = () => {
  useHtmlLang();
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/flota/:slug" element={<VehicleDetail />} />
        <Route path="/ayuda" element={<Help />} />
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
