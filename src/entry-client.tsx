import './i18n';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter, matchPath } from 'react-router-dom';
import Root, { loadHelp, loadVehicleDetail } from './Root.tsx';
import { initGtagOnFirstInteraction } from './lib/analytics';
import './styles/index.css';

initGtagOnFirstInteraction();

// Precarga el chunk de la ruta actual ANTES de hidratar, para que el primer
// render coincida con el HTML prerenderizado (sin fallback de Suspense).
async function preloadCurrentRoute() {
  const { pathname } = window.location;
  if (matchPath('/flota/:slug', pathname)) await loadVehicleDetail();
  else if (matchPath('/ayuda', pathname)) await loadHelp();
}

preloadCurrentRoute().then(() => {
  hydrateRoot(
    document.getElementById('root')!,
    <BrowserRouter>
      <Root />
    </BrowserRouter>,
  );
});
