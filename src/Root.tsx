import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import { restoreSavedLanguage } from './i18n';
import App from './app/App.tsx';
import ScrollToTop from './app/components/ScrollToTop.tsx';
import { useHtmlLang } from './i18n/useHtmlLang.ts';

// En SSR las rutas se importan de forma estática (top-level await); en el
// cliente quedan como chunks lazy que entry-client precarga antes de hidratar.
// NotFound no se precarga en entry-client: el 404 real se sirve como HTML
// estático sin JS (ver scripts/prerender.mjs), así que este chunk solo se
// pide ante una navegación SPA a una ruta inválida.
export const loadVehicleDetail = () => import('./app/pages/VehicleDetail.tsx');
export const loadHelp = () => import('./app/pages/Help.tsx');
export const loadNotFound = () => import('./app/pages/NotFound.tsx');

const VehicleDetail = import.meta.env.SSR
  ? (await loadVehicleDetail()).default
  : lazy(loadVehicleDetail);
const Help = import.meta.env.SSR ? (await loadHelp()).default : lazy(loadHelp);
const NotFound = import.meta.env.SSR ? (await loadNotFound()).default : lazy(loadNotFound);

function PageLoadingFallback() {
  return <div className="min-h-screen" aria-busy="true" />;
}

// LazyMotion con domAnimation (variants + enter/exit, sin drag ni layout
// animations) para toda la app vía m.*; Fleet carga domMax aparte y solo
// para sí misma, porque es la única sección que usa el prop `layout`.
const Root = () => {
  useHtmlLang();
  // restoreSavedLanguage ahora es async (puede esperar el import() del
  // idioma guardado) — no se pasa directo como efecto para que React no
  // trate la Promise devuelta como función de cleanup.
  useEffect(() => {
    restoreSavedLanguage();
  }, []);
  return (
    <LazyMotion features={domAnimation} strict>
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
        <Route
          path="*"
          element={
            <Suspense fallback={<PageLoadingFallback />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </LazyMotion>
  );
};

export default Root;
