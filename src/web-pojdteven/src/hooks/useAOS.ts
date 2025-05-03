import { useEffect } from 'react';
import AOS from 'aos';

const useAOS = () =>
  useEffect(() => {
    AOS.init({
      duration: 2000, // Global animation duration
      once: true, // Only once animation
    });
  }, []);

export default useAOS;
