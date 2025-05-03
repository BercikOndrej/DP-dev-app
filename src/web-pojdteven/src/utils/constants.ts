import {
  Baby,
  Calendar,
  Contact,
  DollarSign,
  FlameKindling,
  GraduationCap,
  Home,
  Image,
  ScrollText,
  User,
} from 'lucide-react';
import { PhotoTag } from '../enums/PhotoTag';
export const MENU_DATA = [
  { name: 'Domů', link: '/' },
  { name: 'Lesní dětský klub', link: '/lesni-detsky-klub' },
  { name: 'Adaptační program', link: '/adaptacni-program' },
  { name: 'Akce', link: '/akce' },
  { name: 'Fotogalerie', link: '/fotogalerie' },
  { name: 'Kontakt', link: '/kontakt' },
  { name: 'Podpora', link: '/podpora' },
  { name: 'Členská sekce', link: '/clenska-sekce' },
];

const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
const filesPath = 'static/documents';

// 10 Mb
export const IMAGE_MAX_SIZE = 10_000_000;

export const filesToDownload = [
  {
    name: 'Desatero předškoláka',
    url: `${serverDomain}/${filesPath}/desatero-predskolaka.jpg`,
  },
  {
    name: 'Provozní řád LDK',
    url: `${serverDomain}/${filesPath}/provozni-rad-ldk-pojdte-ven-od-1.9.2020.pdf`,
  },
  {
    name: 'Smlouva o docházce dítěte',
    url: `${serverDomain}/${filesPath}/smlouva-o-dochazce-ditete.pdf`,
  },
  {
    name: 'Školní vzdělávací program',
    url: `${serverDomain}/${filesPath}/skolni-vzdelavaci-program-duben-2020.pdf`,
  },
  {
    name: 'Pravidla',
    url: `${serverDomain}/${filesPath}/pravidla.pdf`,
  },
];

type KeyMap = {
  [code: number]: string;
};

export const ERROR_MESSAGES: KeyMap = {
  400: 'Omlouváme se ale nerozumíme vašemu požadavku.',
  401: 'Pro přístup k Vámi zadané stránce je nutné provést autorizaci.',
  403: 'Vámi zadaná stránka není dostupná.',
  404: 'Nemůžeme najít vámi zadanou stránku.',
  405: 'Vámi zadaná webová metoda není povolena.',
  500: 'Server hlásí nečekanou chybu, kvůli které nemůže být požadavek splněn.',
  503: 'Omlouváme se ale server je nedostupný.',
};

export const MAP_LINK =
  'https://www.google.com/maps/place/Lo%C5%A1ov+99,+783+65+Olomouc+9/@49.6243097,17.362482,17z/data=!3m1!4b1!4m6!3m5!1s0x47124b786d0cb3d5:0xe0ff219b8093e3a2!8m2!3d49.6243097!4d17.3650569!16s%2Fg%2F11c4ddzmdd?entry=ttu&g_ep=EgoyMDI0MTAxNi4wIKXMDSoASAFQAw%3D%3D';

export const EMBEDED_MAP_FRAME =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2584.591278625747!2d17.362481977176497!3d49.624309671446255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47124b786d0cb3d5%3A0xe0ff219b8093e3a2!2sLo%C5%A1ov%2099%2C%20783%2065%20Olomouc%209!5e0!3m2!1scs!2scz!4v1729522983830!5m2!1scs!2scz';

export const PHOTO_FILTER_VALUES = [
  { value: undefined, label: 'Všechny fotky' },
  { value: PhotoTag.PLACES, label: 'Prostory školky' },
  { value: PhotoTag.FOREST_CLUB, label: 'Lesní dětský klub' },
  { value: PhotoTag.ADAPTATION_PROGRAM, label: 'Adaptační program' },
];

export const ADMIN_PAGE_MENU_ITEMS = [
  {
    title: 'Domů',
    link: '/admin',
    icon: Home,
  },
  {
    title: 'Docházka',
    link: '/admin/attendance',
    icon: Calendar,
  },
  {
    title: 'Uživatelé',
    link: '/admin/users',
    icon: User,
  },
  {
    title: 'Děti',
    link: '/admin/children',
    icon: Baby,
  },
  {
    title: 'Průvodci',
    link: '/admin/teachers',
    icon: GraduationCap,
  },
  {
    title: 'Fotogalerie',
    link: '/admin/photogallery',
    icon: Image,
  },
  {
    title: 'Sponzoři',
    link: '/admin/sponsors',
    icon: DollarSign,
  },
  {
    title: 'Akce',
    link: '/admin/actions',
    icon: FlameKindling,
  },
  {
    title: 'Kontaktní informace',
    link: '/admin/contactInfo',
    icon: Contact,
  },
  {
    title: 'Rozpis dne',
    link: '/admin/dayActivities',
    icon: ScrollText,
  },
];
