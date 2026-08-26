export const LOCALES = ['es', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'es';

export const ui = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Nosotros',
      work: 'Trabajo',
      contact: 'Contacto',
    },
    home: {
      title: 'Plasma Studios',
      description: 'Plasma Studios.',
      heroTitle: 'Diseño y desarrollo para todos.',
      heroSubtitle: 'Plasma Studios combina diseño, desarrollo y comunidad para crear experiencias únicas.',
      meetTeam: 'Conoce al equipo',
      comingSoon: 'Próximamente',
      peopleCount: (n: number) => `${n} personas`,
      teamHeading: (n: number) => `${n} personas forman parte de Plasma Studios.`,
      teamSubheading: 'Cada perfil tiene su propia historia, sus roles y lo que aporta al proyecto.',
    },
    nosotros: {
      title: 'Nosotros',
      description: 'El equipo detrás de Plasma Studios.',
      subtitle: 'Las personas que forman Plasma Studios.',
      empty: 'Equipo en construcción.',
      filterAll: 'Todos',
      noResults: 'Nadie coincide con la búsqueda.',
      searchPlaceholder: 'Buscar por nombre…',
      filterByRole: 'Filtrar por rol',
      clearFilters: 'Limpiar',
    },
    trabajo: {
      title: 'Trabajo',
      description: 'Trabajo de Plasma Studios.',
      subtitle: 'Contenido en construcción.',
    },
    contacto: {
      title: 'Contacto',
      description: 'Contacta a Plasma Studios.',
      subtitle: 'Contáctanos y te respondemos a la brevedad.',
      comingSoon: 'Próximamente',
    },
    profile: {
      back: '← Volver',
      description: (name: string) => `Perfil de ${name} en Plasma Studios.`,
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      work: 'Work',
      contact: 'Contact',
    },
    home: {
      title: 'Plasma Studios',
      description: 'Plasma Studios.',
      heroTitle: 'Design and development for everyone.',
      heroSubtitle: 'Plasma Studios combines design, development and community to build unique experiences.',
      meetTeam: 'Meet the team',
      comingSoon: 'Coming soon',
      peopleCount: (n: number) => `${n} people`,
      teamHeading: (n: number) => `${n} people are part of Plasma Studios.`,
      teamSubheading: 'Every profile has its own story, roles and what it brings to the project.',
    },
    nosotros: {
      title: 'About',
      description: 'The team behind Plasma Studios.',
      subtitle: 'The people who make up Plasma Studios.',
      empty: 'Team page under construction.',
      filterAll: 'All',
      noResults: 'Nobody matches your search.',
      searchPlaceholder: 'Search by name…',
      filterByRole: 'Filter by role',
      clearFilters: 'Clear',
    },
    trabajo: {
      title: 'Work',
      description: "Plasma Studios' work.",
      subtitle: 'Content under construction.',
    },
    contacto: {
      title: 'Contact',
      description: 'Contact Plasma Studios.',
      subtitle: "Get in touch and we'll get back to you shortly.",
      comingSoon: 'Coming soon',
    },
    profile: {
      back: '← Back',
      description: (name: string) => `${name}'s profile at Plasma Studios.`,
    },
  },
} as const;

export function t(locale: Locale) {
  return ui[locale];
}

// Los tags se guardan en team.json tal cual vienen de Discord (en español).
// Este mapa solo se usa para mostrarlos en inglés.
const TAG_LABELS_EN: Record<string, string> = {
  Builder: 'Builder',
  Configurador: 'Configurator',
  'Configurador Mythic': 'Mythic Configurator',
  'Configurador ConditionalEvents': 'ConditionalEvents Configurator',
  Animador: 'Animator',
  'Artista PixelArt': 'Pixel Art Artist',
  'DC Builder': 'DC Builder',
  'Mod developer': 'Mod Developer',
  Musico: 'Musician',
  LoreMaker: 'LoreMaker',
  'Web Developer': 'Web Developer',
  'Render Artist': 'Render Artist',
  'Modelador Blockbench': 'Blockbench Modeler',
  'Artista 3D': '3D Artist',
  'Overlay Developer': 'Overlay Developer',
  'Editor de video': 'Video Editor',
  'Editor de imagenes': 'Image Editor',
};

export function tagLabel(locale: Locale, tag: string) {
  return locale === 'en' ? TAG_LABELS_EN[tag] ?? tag : tag;
}

export function localePath(locale: Locale, path: string) {
  const clean = path.replace(/^\/+/, '');
  return `/${locale}${clean ? `/${clean}` : ''}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'es' ? 'en' : 'es';
}
