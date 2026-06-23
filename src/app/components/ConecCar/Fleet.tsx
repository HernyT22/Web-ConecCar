// ConecCar.rent — Flota
import { useState, useEffect, useMemo, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@/app/components/ui/utils";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import Section from "@/app/components/ConecCar/Section";
import PlaceholderImg from "@/app/components/ConecCar/PlaceholderImg";
import { I } from "@/app/components/ConecCar/Icons";
import { CATEGORY_IDS, parseCatFromHash } from "./fleetCategories";
import { ANIM_DURATION, ANIM_EASE } from "@/animations/variants";
import { vehicles } from "@/data/vehicles";
import type { CategoryId, Vehicle } from "@/data/vehicles";

type SortId = 'recommended' | 'priceAsc' | 'priceDesc';

const SORT_OPTIONS: { id: SortId }[] = [
  { id: 'recommended' },
  { id: 'priceAsc' },
  { id: 'priceDesc' },
];

const VehicleCard = memo(function VehicleCard({ vehicle: v }: { vehicle: Vehicle }) {
  const { t } = useTranslation('fleet');
  return (
    <Link
      to={`/flota/${v.slug}`}
      className="bg-white rounded-2xl border border-navy-100 overflow-hidden flex flex-col lift"
    >
      <div className="relative aspect-[4/3] bg-navy-50">
        {v.images[0] ? (
          <ImageWithFallback
            src={v.images[0]}
            alt={`${v.brand} ${v.model}`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain"
          />
        ) : (
          <PlaceholderImg label={v.imageLabels[0]} className="w-full h-full" />
        )}
        {v.badge !== null && (
          <span className="absolute top-3 left-3 bg-amber-500 text-navy-950 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
            {t(`enums.badge.${v.badge}`)}
          </span>
        )}
        <span className="absolute top-3 right-3 bg-white/95 text-navy-700 text-[11px] font-medium px-2.5 py-1 rounded-full border border-navy-100">
          {t(`enums.category.${v.category}`)}
        </span>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-display text-xl font-semibold text-navy-900">
          {v.brand} {v.model} {v.year}
        </h3>
        {v.shortDescription && (
          <span className="block text-xs text-navy-500 mt-0.5">{v.shortDescription}</span>
        )}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm text-navy-700/80 mt-4">
          <span className="inline-flex items-center gap-2">
            <span className="text-navy-400">{I.users}</span>
            {v.seats} {t('card.seats')}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="text-navy-400">{I.bag}</span>
            {v.bags} {t('card.bags')}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="text-navy-400">{I.gear}</span>
            {t(`enums.transmission.${v.transmission}`)}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="text-navy-400">{I.snow}</span>
            {t('card.ac')}
          </span>
        </div>
        <div className="mt-5 pt-5 border-t border-navy-100 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="mono uppercase text-navy-500">{t('card.from')}</div>
            <div className="flex items-baseline gap-1 whitespace-nowrap">
              {v.pricePerDay > 0 ? (
                <>
                  <span className="font-display text-2xl font-semibold text-navy-900">
                    US$ {v.pricePerDay}
                  </span>
                  <span className="text-sm text-navy-500">&bull; {t('card.perDay')}</span>
                </>
              ) : (
                <span className="font-display text-xl font-semibold text-navy-900">
                  {t('card.consult')}
                </span>
              )}
            </div>
          </div>
          <span className="shrink-0 inline-flex items-center gap-1.5 bg-navy-900 hover:bg-amber-500 hover:text-navy-950 text-white text-sm px-4 py-2.5 rounded-full transition-colors duration-300">
            {t('card.viewDetails')} {I.arrow}
          </span>
        </div>
      </div>
    </Link>
  );
});

const Fleet = () => {
  const { t } = useTranslation('fleet');
  const location = useLocation();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CategoryId | "all">(
    () => parseCatFromHash(window.location.hash) ?? "all"
  );
  const [sort, setSort] = useState<SortId>('recommended');

  // Sync hash → state when React Router navigation changes the hash.
  // Tab clicks use replaceState (doesn't update useLocation) so this
  // effect won't interfere with user interactions.
  useEffect(() => {
    const fromHash = parseCatFromHash(location.hash) ?? "all";
    setCat(fromHash);
  }, [location.hash]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCategoryClick = (newCat: CategoryId | "all") => {
    setCat(newCat);
    const newHash = newCat === "all" ? "#fleet" : `#fleet?cat=${newCat}`;
    window.history.replaceState(null, '', newHash);
  };

  const list = useMemo(() => {
    const filtered = vehicles.filter(
      (v) =>
        (cat === "all" || v.category === cat) &&
        (q === "" ||
          `${v.brand} ${v.model}`.toLowerCase().includes(q.toLowerCase()) ||
          v.category.toLowerCase().includes(q.toLowerCase())),
    );
    if (sort === 'priceAsc') {
      return [...filtered].sort((a, b) => {
        const pa = a.pricePerDay === 0 ? Infinity : a.pricePerDay;
        const pb = b.pricePerDay === 0 ? Infinity : b.pricePerDay;
        return pa - pb;
      });
    }
    if (sort === 'priceDesc') {
      return [...filtered].sort((a, b) => {
        const pa = a.pricePerDay === 0 ? -1 : a.pricePerDay;
        const pb = b.pricePerDay === 0 ? -1 : b.pricePerDay;
        return pb - pa;
      });
    }
    return filtered;
  }, [q, cat, sort]);

  return (
    <Section
      id="fleet"
      eyebrow={t('section.eyebrow')}
      title={t('section.title')}
      kicker={t('section.kicker')}
      className="bg-navy-50/40"
    >
      {/* búsqueda + filtros */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-navy-100 shadow-sm p-2 flex flex-col sm:flex-row items-stretch gap-2">
          <div className="flex items-center gap-2.5 px-3 flex-1">
            <span className="text-navy-400">{I.search}</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('search.placeholder')}
              className="bg-transparent w-full py-2.5 outline-none placeholder:text-navy-400 text-navy-900"
            />
          </div>
          <div className="flex items-center gap-2 px-3 sm:border-l border-navy-100">
            <span className="text-navy-500 text-sm">{t('sort.label')}</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortId)}
              className="text-navy-900 text-sm py-2 bg-transparent outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>{t(`sort.${o.id}`)}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
          <button
            onClick={() => handleCategoryClick("all")}
            className={cn(
              "whitespace-nowrap px-4 py-2 rounded-full text-sm border transition",
              cat === "all"
                ? "bg-navy-900 text-white border-navy-900"
                : "bg-white text-navy-700 border-navy-200 hover:border-navy-400"
            )}
          >
            {t('tabs.all')}
          </button>
          {CATEGORY_IDS.map((id) => (
            <button
              key={id}
              onClick={() => handleCategoryClick(id)}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-full text-sm border transition",
                cat === id
                  ? "bg-navy-900 text-white border-navy-900"
                  : "bg-white text-navy-700 border-navy-200 hover:border-navy-400"
              )}
            >
              {t(`enums.category.${id}`)}
            </button>
          ))}
        </div>
      </div>

      {/* grilla de tarjetas */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <AnimatePresence mode="popLayout">
          {list.map((v, i) => (
            <motion.div
              key={v.slug}
              layout
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16, transition: { duration: 0.2, ease: ANIM_EASE } }}
              transition={{
                duration: ANIM_DURATION,
                ease: ANIM_EASE,
                delay: Math.min(i * 0.05, 0.4),
                layout: { duration: 0.3, ease: ANIM_EASE },
              }}
            >
              <VehicleCard vehicle={v} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {list.length === 0 && (
        <div className="text-center py-16 text-navy-500">
          {t('noResults')}
        </div>
      )}
    </Section>
  );
};

export default Fleet;
