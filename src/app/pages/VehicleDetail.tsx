import { useParams, Navigate } from 'react-router-dom';
import Nav from '@/app/components/ConecCar/Nav';
import Footer from '@/app/components/ConecCar/Footer';
import Breadcrumb from '@/app/sections/vehicle-detail/Breadcrumb';
import VehicleHero from '@/app/sections/vehicle-detail/VehicleHero';
import Specs from '@/app/sections/vehicle-detail/Specs';
import Included from '@/app/sections/vehicle-detail/Included';
import Similar from '@/app/sections/vehicle-detail/Similar';
import { getVehicleBySlug } from '@/data/vehicles';

const VehicleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const vehicle = getVehicleBySlug(slug ?? '');

  if (!vehicle) return <Navigate to="/" replace />;

  return (
    <>
      <Nav />
      <Breadcrumb vehicle={vehicle} />
      <VehicleHero vehicle={vehicle} />
      <Specs key={vehicle.slug} vehicle={vehicle} />
      <Included />
      <Similar key={vehicle.slug} slug={vehicle.slug} />
      <Footer />
    </>
  );
};

export default VehicleDetail;
