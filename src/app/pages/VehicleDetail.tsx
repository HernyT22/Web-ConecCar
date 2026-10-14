import { useParams } from 'react-router-dom';
import NotFound from '@/app/pages/NotFound';
import Nav from '@/app/components/ConecCar/Nav';
import Footer from '@/app/components/ConecCar/Footer';
import Seo from '@/seo/Seo';
import Breadcrumb from '@/app/sections/vehicle-detail/Breadcrumb';
import VehicleHero from '@/app/sections/vehicle-detail/VehicleHero';
import Specs from '@/app/sections/vehicle-detail/Specs';
import Included from '@/app/sections/vehicle-detail/Included';
import Similar from '@/app/sections/vehicle-detail/Similar';
import { getVehicleBySlug } from '@/data/vehicles';

const VehicleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const vehicle = getVehicleBySlug(slug ?? '');

  if (!vehicle) return <NotFound />;

  return (
    <>
      <Seo page="vehicle" vehicle={vehicle} />
      <Nav />
      <main id="main">
      <Breadcrumb vehicle={vehicle} />
      <VehicleHero vehicle={vehicle} />
      <Specs key={vehicle.slug} vehicle={vehicle} />
      <Included />
      <Similar key={`similar-${vehicle.slug}`} slug={vehicle.slug} />
      </main>
      <Footer />
    </>
  );
};

export default VehicleDetail;
