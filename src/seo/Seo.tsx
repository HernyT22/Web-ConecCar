import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { Vehicle } from '@/data/vehicles';
import { buildHead, type HeadTag } from './head';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from './site';

type SeoProps = { page: 'home' } | { page: 'vehicle'; vehicle: Vehicle } | { page: 'notfound' };

const MARK = 'data-seo';

const create = (tag: string, attrs: HeadTag, text?: string) => {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  el.setAttribute(MARK, '1');
  if (text !== undefined) el.textContent = text;
  document.head.appendChild(el);
};

/**
 * Aplica buildHead() al document.head. Al desmontar elimina lo que creó y
 * restaura title/description de index.html.
 */
const Seo = (props: SeoProps) => {
  const { pathname } = useLocation();
  const vehicle = props.page === 'vehicle' ? props.vehicle : null;

  useEffect(() => {
    const head = buildHead(
      props.page === 'notfound' ? { kind: 'notfound' } : vehicle ? { kind: 'vehicle', vehicle } : { kind: 'home' },
      { pathname, dev: import.meta.env.DEV },
    );

    // Head prerenderizado (data-seo): se reemplaza sin duplicar. En ese caso
    // los valores "originales" de index.html ya no están en el DOM.
    const prerendered = document.head.querySelectorAll(`[${MARK}]`);
    const hadPrerender = prerendered.length > 0;
    prerendered.forEach((el) => el.remove());

    let descEl = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    const originalTitle = hadPrerender ? DEFAULT_TITLE : document.title;
    const originalDescription = hadPrerender ? DEFAULT_DESCRIPTION : descEl?.getAttribute('content') ?? null;

    document.title = head.title;
    for (const m of head.meta) {
      if (m.name === 'description' && descEl) descEl.setAttribute('content', m.content);
      else create('meta', m);
    }
    for (const l of head.link) create('link', l);
    for (const j of head.jsonLd) create('script', { type: 'application/ld+json' }, JSON.stringify(j));

    return () => {
      document.head.querySelectorAll(`[${MARK}]`).forEach((el) => el.remove());
      document.title = originalTitle;
      if (originalDescription !== null) {
        descEl = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
        if (descEl) descEl.setAttribute('content', originalDescription);
        else {
          descEl = document.createElement('meta');
          descEl.setAttribute('name', 'description');
          descEl.setAttribute('content', originalDescription);
          document.head.appendChild(descEl);
        }
      }
    };
  }, [pathname, vehicle]);

  return null;
};

export default Seo;
