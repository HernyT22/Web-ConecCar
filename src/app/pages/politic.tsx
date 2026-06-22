import { useParams, Navigate } from 'react-router-dom';
import Nav from '@/app/components/ConecCar/Nav';
import Footer from '@/app/components/ConecCar/Footer';
import politics from '@/app/components/politics';

const politic = () => {
  const { slug } = useParams<{ slug: string }>();


  if (!politic) return <Navigate to="/" replace />;

  return (
    <>
      <Nav />
      <politics />
      <Footer />
    </>
  );
};

export default politic;
