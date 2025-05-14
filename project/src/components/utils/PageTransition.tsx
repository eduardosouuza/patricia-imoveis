import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('fadeOut');
      
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('fadeIn');
      }, 300); // Tempo da transição
      
      return () => clearTimeout(timeout);
    }
  }, [location, displayLocation]);

  return (
    <div 
      className={`page-transition-gradient ${
        transitionStage === 'fadeIn' 
          ? 'animate-fadeIn' 
          : 'animate-fadeOut'
      }`}
    >
      {children}
    </div>
  );
};

export default PageTransition; 