import { useEffect } from 'react';

const useNavbarShrinks = () =>
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const logo = document.getElementById('navbar-logo');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 64) {
        logo?.classList.remove('h-16');
        logo?.classList.remove('w-48');

        navbar?.classList.add('py-2');
        logo?.classList.add('h-8');
        logo?.classList.add('w-28');
        // navbar?.classList.add('h-12');
      } else {
        navbar?.classList.remove('py-2');
        logo?.classList.remove('h-8');
        logo?.classList.remove('w-28');

        // navbar?.classList.add('h-24');
        logo?.classList.add('h-16');
        logo?.classList.add('w-48');
      }
    });
  }, []);

export default useNavbarShrinks;
