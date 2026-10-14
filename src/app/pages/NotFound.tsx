import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Nav from '@/app/components/ConecCar/Nav';
import Footer from '@/app/components/ConecCar/Footer';
import Seo from '@/seo/Seo';

/** Ruta inexistente (o slug inválido): no redirige a "/" y se marca noindex. */
const NotFound = () => {
  const { t } = useTranslation();
  return (
    <>
      <Seo page="notfound" />
      <Nav />
      <main id="main" className="bg-navy-950 text-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-24 md:py-32 text-center">
          <h1 className="font-display text-3xl mb-3">{t('notFound.title')}</h1>
          <p className="text-white/70 mb-6">{t('notFound.text')}</p>
          <p className="flex gap-6 justify-center">
            <Link to="/" className="underline">{t('notFound.home')}</Link>
            <Link to="/#fleet" className="underline">{t('notFound.fleet')}</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
