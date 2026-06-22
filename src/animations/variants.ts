import type { Variants, Transition } from 'framer-motion';

/* Tokens de animación — todo el sistema toca acá si hay que afinar */
export const ANIM_DURATION = 0.5;
export const ANIM_STAGGER = 0.08;
export const ANIM_EASE = [0.22, 1, 0.36, 1] as const; // ease-out-quart

const baseTransition: Transition = {
  duration: ANIM_DURATION,
  ease: ANIM_EASE,
};

/* Fade-in puro (sin movimiento) — Hero al cargar */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: ANIM_EASE } },
};

/* Container que dispara stagger entre hijos */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: ANIM_STAGGER, delayChildren: 0.1 },
  },
};

/* Container con stagger más rápido (medios de pago) */
export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

/* Hijo: aparece desde abajo con fade — About/Features cards, Reviews */
export const slideUpItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

/* Hijo: aparece desde la izquierda — Fleet cards, Contact info */
export const slideFromLeftItem: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
};

/* Hijo: aparece desde la derecha — Contact form */
export const slideFromRightItem: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
};

/* Hijo: aparece desde arriba — Destinos cards */
export const slideDownItem: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

/* Hijo: scale-in — Medios de pago logos */
export const scaleInItem: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: ANIM_EASE },
  },
};

/* Línea horizontal dibujada — eyebrow underlines, separadores */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease: ANIM_EASE },
  },
};

/* Config estándar de viewport para useInView */
export const VIEWPORT_CONFIG = { once: true, amount: 0.15 } as const;
