const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        'green-leaf': '#A0C544',
        'red-leaf': '#CE374A',
        'orange-leaf': '#F1A13A',
        'brown-leaf': '#B86528',
        'purple-leaf': '#B683D1',
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      backgroundImage: {
        'parallax-gallery': `url("${serverDomain}/static/titlePhotos/Photogallery.webp")`,
        'parallax-home': `url("${serverDomain}/static/titlePhotos/Home.webp")`,
        'parallax-forestClub': `url("${serverDomain}/static/titlePhotos/ForestClub.webp")`,
        'parallax-adaptationProgram': `url("${serverDomain}/static/titlePhotos/AdaptationProgram.webp")`,
        'parallax-support': `url("${serverDomain}/static/titlePhotos/Support.webp")`,
        'parallax-home-second': `url("${serverDomain}/static/titlePhotos/HomeSecond.webp")`,
        'parallax-membership': `url("${serverDomain}/static/titlePhotos/Membership.webp")`,
      },
      fontFamily: {
        body: ['Cambey', 'sans-serif'],
        title: ['Georgia', 'Times New Roman', 'serif'],
        card: ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
