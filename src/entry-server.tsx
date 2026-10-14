import './i18n';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import Root from './Root.tsx';
import { vehicles, getVehicleBySlug } from './data/vehicles';
import { buildHead, type HeadSpec } from './seo/head';

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <Root />
    </StaticRouter>,
  );
}

/** Head por ruta; null = la ruta conserva el head estático de index.html. */
export function headFor(url: string): HeadSpec | null {
  if (url === '/') return buildHead({ kind: 'home' }, { pathname: url });
  const m = matchPath('/flota/:slug', url);
  const vehicle = m?.params.slug ? getVehicleBySlug(m.params.slug) : undefined;
  return vehicle ? buildHead({ kind: 'vehicle', vehicle }, { pathname: url }) : null;
}

export const ROUTES: string[] = ['/', '/ayuda', ...vehicles.map((v) => `/flota/${v.slug}`)];
