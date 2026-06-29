import { useEffect, useLayoutEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Armchair,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  HardHat,
  Leaf,
  Mail,
  MapPinned,
  MapPin,
  Menu,
  Phone,
  Send,
  SunMedium,
  X,
  type LucideIcon,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const videoSrc =
  '/Projects_Realisations/Project_3_Residence%20W%20-%206%20villas%20-%20Villa%20type%202A/Video-4.mp4';

const projectImage = (path: string) => encodeURI(path);

const founderImageSrc = projectImage('/Projects_Realisations/AJANA ZOUHEIR.jpeg');

const aboutVisualSrc = projectImage(
  '/Projects_Realisations/Project_3_Residence W - 6 villas - Villa type 2A/3_Residence W - 6 villas - Villa type 2A.jpeg',
);

const whatsappHref =
  'https://wa.me/212676990471?text=' +
  encodeURIComponent(
    "Bonjour, je vous contacte depuis votre site. J'aimerais échanger à propos de mon projet.",
  );

const contactEmail = 'jawade.aithammou@gmail.com';

const founderStatement =
  'Chez 2AAZ, nous imaginons des espaces qui racontent une histoire, révèlent la lumière et créent une connexion naturelle entre les personnes et leur environnement. Notre ambition est de concevoir une architecture sincère, durable et intemporelle.';

const aboutTypewriterWords = ['créativité', 'innovation', 'inspiration', 'précision', 'lumière'];

const aboutPrinciples: Array<{
  title: string;
  description: string;
  Icon: LucideIcon;
}> = [
  {
    title: 'Contexte',
    description: 'Chaque projet part du site, de ses contraintes et de son potentiel.',
    Icon: Compass,
  },
  {
    title: 'Lumière',
    description: 'Les volumes sont dessinés pour révéler les vues, les ombres et les usages.',
    Icon: SunMedium,
  },
  {
    title: 'Durabilité',
    description: 'Une architecture sobre, élégante et adaptée au climat marocain.',
    Icon: Leaf,
  },
];

const processItems = [
  {
    title: 'Écoute & analyse',
    description:
      'Nous découvrons le lieu, ses contraintes et votre manière de vivre afin de révéler le potentiel juste du projet.',
  },
  {
    title: 'Vision & concept',
    description:
      'Nous donnons naissance à une direction architecturale cohérente, guidée par la lumière, les matières et les usages.',
  },
  {
    title: 'Design & développement',
    description:
      'Nous affinons chaque volume, chaque détail et préparons les documents nécessaires à la réalisation du projet.',
  },
  {
    title: 'Coordination & livraison',
    description:
      'Nous accompagnons les échanges, le chantier et les finitions pour préserver la qualité de l’intention jusqu’à l’espace livré.',
  },
];

const teamMembers = [
  {
    name: 'AJANA ZOUHEIR',
    role: 'Fondateur et architecte',
    image: founderImageSrc,
    alt: 'Portrait de AJANA ZOUHEIR, fondateur et architecte de 2AAZ',
    note: 'Il guide la vision architecturale, de la première intention au détail construit.',
  },
  {
    name: 'TARIK FIKRI',
    role: 'Architecte',
    image: '/team/tarik-fikri.png',
    alt: 'Portrait éditorial de TARIK FIKRI, architecte chez 2AAZ',
    note: 'Il affine les volumes, les plans et la cohérence spatiale de chaque projet.',
  },
  {
    name: 'KARIMA NASSIM',
    role: 'Architecte',
    image: '/team/karima-nassim.png',
    alt: 'Portrait éditorial de KARIMA NASSIM, architecte chez 2AAZ',
    note: 'Elle travaille la lumière, les matières et l’équilibre sensible des espaces.',
  },
  {
    name: 'NISRINE KADIM',
    role: 'Cheffe de projet',
    image: '/team/nisrine-kadim.png',
    alt: 'Portrait éditorial de NISRINE KADIM, cheffe de projet chez 2AAZ',
    note: 'Elle coordonne les échanges, les délais et la précision d’exécution.',
  },
];

const expertiseItems: Array<{
  title: string;
  description: string;
  Icon: LucideIcon;
  image: string;
  alt: string;
  caption: string;
}> = [
  {
    title: 'Urbanisme',
    description: 'Lecture du foncier, des règlements et des contraintes locales pour sécuriser chaque décision.',
    Icon: MapPinned,
    image: projectImage('/Projects_Realisations/Expertises/Urbanisme.png'),
    alt: 'Visualisation d’urbanisme illustrant l’expertise urbanisme de 2AAZ',
    caption: 'Implanter juste, avant même de dessiner les volumes.',
  },
  {
    title: 'Architecture',
    description: 'Conception de villas, immeubles et lieux sur mesure, du concept aux plans d’exécution.',
    Icon: Building2,
    image: projectImage('/Projects_Realisations/Expertises/Architecture1.jpeg'),
    alt: 'Villa contemporaine illustrant l’expertise architecture de 2AAZ',
    caption: 'Des proportions, des lignes et une matière au service du lieu.',
  },
  {
    title: 'Architecture d’intérieur',
    description:
      'Travail des volumes, matières, ambiances et usages pour prolonger l’architecture jusque dans le détail.',
    Icon: Armchair,
    image: projectImage('/Projects_Realisations/Expertises/Architecture dinterieur.jpeg'),
    alt: 'Ambiance intérieure illustrant l’expertise architecture d’intérieur de 2AAZ',
    caption: 'Ambiances, seuils et matières prolongent l’expérience de l’espace.',
  },
  {
    title: 'Suivi de chantier',
    description: 'Coordination des intervenants, contrôle des étapes et accompagnement jusqu’à la livraison.',
    Icon: HardHat,
    image: projectImage('/Projects_Realisations/Expertises/Suivi de chantier.png'),
    alt: 'Phase chantier illustrant le suivi de chantier par 2AAZ',
    caption: 'Préserver l’intention initiale jusque dans le détail construit.',
  },
];

type ProjectItem = {
  title: string;
  description: string;
  image: string;
  alt: string;
  tags: Array<{
    label: string;
    value: string;
  }>;
};

const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Contact', href: '/contact' },
];

const projectItems: ProjectItem[] = [
  {
    title: 'Résidence W - Villa type 2A',
    description:
      'Une villa contemporaine pensée autour de la lumière, des volumes ouverts et d’une relation fluide avec le jardin.',
    image: projectImage(
      '/Projects_Realisations/Project_3_Residence W - 6 villas - Villa type 2A/3_Residence W - 6 villas - Villa type 2B.jpeg',
    ),
    alt: 'Vue extérieure de la Villa type 2A de la Résidence W',
    tags: [
      { label: 'Lieu', value: 'Marrakech' },
      { label: 'Année', value: '2026' },
      { label: 'Superficie', value: '420 m²' },
    ],
  },
  {
    title: 'Résidence W - Villa type 3',
    description:
      'Une composition résidentielle généreuse, entre intimité, façades minérales et espaces extérieurs protégés.',
    image: projectImage(
      '/Projects_Realisations/Project_1_Residence W - 6 villas - Villa type 3/1_Residence W - 6 villas - Villa type 3A.jpeg',
    ),
    alt: 'Vue extérieure de la Villa type 3 de la Résidence W',
    tags: [
      { label: 'Lieu', value: 'Marrakech' },
      { label: 'Année', value: '2025' },
      { label: 'Superficie', value: '510 m²' },
    ],
  },
  {
    title: 'Résidence W - Villa type 1',
    description:
      'Une maison lumineuse et compacte, structurée par des lignes sobres, des percées visuelles et des espaces de vie traversants.',
    image: projectImage(
      '/Projects_Realisations/Project_2_Residence W - 6 villas - Villa type 1/2_Residence W - 6 villas - Villa type 1A.jpeg',
    ),
    alt: 'Vue extérieure de la Villa type 1 de la Résidence W',
    tags: [
      { label: 'Lieu', value: 'Marrakech' },
      { label: 'Année', value: '2025' },
      { label: 'Superficie', value: '360 m²' },
    ],
  },
  {
    title: 'Maison Tamesloht',
    description:
      'Une résidence ancrée dans son paysage, équilibrant matières locales, patios ombragés et vues dégagées.',
    image: projectImage('/Projects_Realisations/Tamesloht, Marrakech, Morocco/Tamesloht, Marrakech, Morocco.jpeg'),
    alt: 'Maison contemporaine à Tamesloht, Marrakech',
    tags: [
      { label: 'Lieu', value: 'Tamesloht' },
      { label: 'Année', value: '2026' },
      { label: 'Superficie', value: '980 m²' },
    ],
  },
];

const projectPath = (project: ProjectItem) =>
  `/realisations/${project.title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`;

const realisationStats = [
  { label: 'Projets réalisés', value: '+100' },
  { label: 'Typologies', value: 'Villas · Immeubles' },
  { label: 'Territoire', value: 'Maroc' },
];

const featuredProjectGallery = [
  {
    src: projectImage(
      '/Projects_Realisations/Project_3_Residence W - 6 villas - Villa type 2A/3_Residence W - 6 villas - Villa type 2A.jpeg',
    ),
    alt: 'Perspective extérieure de la Villa type 2A avec volumes contemporains',
    label: 'Façade principale',
  },
  {
    src: projectImage(
      '/Projects_Realisations/Project_3_Residence W - 6 villas - Villa type 2A/3_Residence W - 6 villas - Villa type 2B.jpeg',
    ),
    alt: 'Vue de la Villa type 2A ouverte sur le jardin',
    label: 'Relation au jardin',
  },
  {
    src: projectImage(
      '/Projects_Realisations/Project_3_Residence W - 6 villas - Villa type 2A/3_Residence W - 6 villas - Villa type 2C.jpeg',
    ),
    alt: 'Détail architectural de la Villa type 2A avec terrasse et lumière naturelle',
    label: 'Lumière & matière',
  },
];

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

function FadeIn({ children, delay = 0, duration = 1000, className = '' }: FadeInProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-opacity ${visible ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}

type AnimatedHeadingProps = {
  text: string;
  initialDelay?: number;
  charDelay?: number;
  className?: string;
  lineClassName?: string;
  wrapWords?: boolean;
};

function AnimatedHeading({
  text,
  initialDelay = 200,
  charDelay = 30,
  className = 'mb-4 text-4xl font-normal leading-[0.95] text-white md:text-5xl lg:text-6xl xl:text-7xl',
  lineClassName = 'whitespace-nowrap',
  wrapWords = false,
}: AnimatedHeadingProps) {
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const lines = useMemo(() => text.split('\n'), [text]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const timer = window.setTimeout(() => setVisible(true), initialDelay);
    return () => window.clearTimeout(timer);
  }, [initialDelay, reduceMotion]);

  return (
    <h1 className={className} style={{ letterSpacing: '-0.04em' }}>
      {lines.map((line, lineIndex) => {
        if (wrapWords) {
          let characterOffset = 0;
          const tokens = line.match(/\S+|\s+/g) ?? [];

          return (
            <span className={`block ${lineClassName}`} key={`${line}-${lineIndex}`}>
              {tokens.map((token, tokenIndex) => {
                const startOffset = characterOffset;
                characterOffset += token.length;

                if (/^\s+$/.test(token)) {
                  return <span key={`${lineIndex}-${tokenIndex}-space`}> </span>;
                }

                return (
                  <span className="inline-block whitespace-nowrap" key={`${lineIndex}-${tokenIndex}-${token}`}>
                    {Array.from(token).map((char, charIndex) => {
                      const delay = lineIndex * line.length * charDelay + (startOffset + charIndex) * charDelay;

                      return (
                        <span
                          className="inline-block transition-[opacity,transform,filter]"
                          key={`${lineIndex}-${tokenIndex}-${charIndex}-${char}`}
                          style={{
                            opacity: visible ? 1 : 0,
                            filter: visible ? 'blur(0px)' : 'blur(2px)',
                            transform: visible ? 'translate3d(0,0,0)' : 'translate3d(-22px,0,0)',
                            transitionDelay: `${delay}ms`,
                            transitionDuration: '680ms',
                            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                          }}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </span>
                );
              })}
            </span>
          );
        }

        return (
          <span className={`block ${lineClassName}`} key={`${line}-${lineIndex}`}>
            {Array.from(line).map((char, charIndex) => {
              const delay = lineIndex * line.length * charDelay + charIndex * charDelay;

              return (
                <span
                  className="inline-block transition-[opacity,transform,filter]"
                  key={`${lineIndex}-${charIndex}-${char}`}
                  style={{
                    opacity: visible ? 1 : 0,
                    filter: visible ? 'blur(0px)' : 'blur(2px)',
                    transform: visible ? 'translate3d(0,0,0)' : 'translate3d(-22px,0,0)',
                    transitionDelay: `${delay}ms`,
                    transitionDuration: '680ms',
                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}

type TypewriterWordProps = {
  words: string[];
};

function TypewriterWord({ words }: TypewriterWordProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [letterCount, setLetterCount] = useState(words[0]?.length ?? 0);
  const [deleting, setDeleting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (reduceMotion || words.length === 0) {
      return;
    }

    const currentWord = words[wordIndex];
    const isComplete = !deleting && letterCount === currentWord.length;
    const isDeleted = deleting && letterCount === 0;
    const delay = isComplete ? 1300 : isDeleted ? 260 : deleting ? 48 : 86;

    const timer = window.setTimeout(() => {
      if (isComplete) {
        setDeleting(true);
        return;
      }

      if (isDeleted) {
        setDeleting(false);
        setWordIndex((index) => (index + 1) % words.length);
        return;
      }

      setLetterCount((count) => count + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, letterCount, reduceMotion, wordIndex, words]);

  const currentWord = words[reduceMotion ? 0 : wordIndex] ?? '';
  const visibleWord = reduceMotion ? currentWord : currentWord.slice(0, letterCount);

  return (
    <span className="inline-flex max-w-full items-baseline text-white">
      <span className="break-words">{visibleWord}</span>
      <span className="ml-2 inline-block h-[0.82em] w-px translate-y-[0.06em] bg-white/70" aria-hidden="true" />
    </span>
  );
}

function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative z-30 px-6 pt-6 md:px-12 lg:px-16">
      <nav className="liquid-glass flex items-center justify-between rounded-xl px-4 py-2">
        <a className="text-2xl font-semibold tracking-tight text-white" href="/" onClick={() => setMobileMenuOpen(false)}>
          2AAZ
        </a>

        <div className="hidden items-center gap-8 text-sm text-white md:flex">
          {navItems.map((item) => (
            <a className="transition-colors hover:text-gray-300" href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <a
          className="hidden rounded-lg bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100 md:inline-flex"
          href={whatsappHref}
          rel="noreferrer"
          target="_blank"
        >
          Whatsapp
        </a>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70 md:hidden"
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          type="button"
        >
          <span className="relative block h-5 w-5">
            <Menu
              aria-hidden="true"
              className={`absolute inset-0 h-5 w-5 transition-[opacity,transform] duration-300 ease-out ${
                mobileMenuOpen ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'
              }`}
              strokeWidth={1.8}
            />
            <X
              aria-hidden="true"
              className={`absolute inset-0 h-5 w-5 transition-[opacity,transform] duration-300 ease-out ${
                mobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0'
              }`}
              strokeWidth={1.8}
            />
          </span>
        </button>
      </nav>

      <div
        aria-hidden={!mobileMenuOpen}
        className={`grid transition-[grid-template-rows,opacity,transform] duration-500 ease-out md:hidden ${
          mobileMenuOpen ? 'mt-3 grid-rows-[1fr] translate-y-0 opacity-100' : 'mt-0 grid-rows-[0fr] -translate-y-2 opacity-0'
        }`}
        id="mobile-navigation"
      >
        <div className="min-h-0 overflow-hidden">
          <div className="liquid-glass rounded-xl px-4 py-4">
            <div className="grid gap-1">
              {navItems.map((item) => (
                <a
                  className="rounded-lg px-3 py-3 text-base font-light text-white transition-colors hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none"
                  href={item.href}
                  key={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <a
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              href={whatsappHref}
              onClick={() => setMobileMenuOpen(false)}
              rel="noreferrer"
              target="_blank"
            >
              Whatsapp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="sticky bottom-0 z-0 flex min-h-[44rem] h-[100dvh] flex-col overflow-hidden bg-[#090806] px-6 py-7 md:px-12 md:py-8 lg:h-[84dvh] lg:px-16 lg:py-10 xl:h-[80dvh]">
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" aria-hidden="true" />

      <div className="grid shrink-0 gap-6 border-b border-white/10 pb-6 md:pb-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.58fr)] lg:items-start lg:gap-10">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-gray-500 md:text-sm">Contact</p>
          <h2 className="mt-4 max-w-5xl text-3xl font-light leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Construisons quelque chose d’exceptionnel ensemble.
          </h2>
        </div>

        <div className="flex flex-col items-start gap-5">
          <p className="max-w-lg text-sm font-light leading-relaxed text-gray-300 md:text-base">
            Un terrain, une villa, un immeuble ou une idée à clarifier ? Parlons de votre projet et dessinons une
            direction juste, élégante et durable.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              className="inline-flex min-h-12 w-fit items-center gap-3 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition-colors duration-300 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              href="/contact"
            >
              Nous contacter
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </a>
            <p className="text-sm font-light text-gray-500">Réponse sous 24h pour cadrer les premières intentions.</p>
          </div>
        </div>
      </div>

      <div className="mt-auto shrink-0">
        <div className="grid gap-6 pb-4 pt-8 md:pb-5 md:pt-9 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.7fr)_minmax(0,0.8fr)] lg:gap-10">
          <div>
            <a className="text-3xl font-semibold tracking-tight text-white" href="/">
              2AAZ
            </a>
            <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-gray-400 md:text-base">
              Architecture, visualisation et accompagnement de projet avec une attention précise au lieu, au climat et au
              temps long.
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Navigation</p>
            <div className="mt-3 grid gap-2 text-sm font-light text-gray-300">
              {navItems.map((item) => (
                <a className="transition-colors hover:text-white" href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Coordonnées</p>
            <div className="mt-3 grid gap-2 text-sm font-light text-gray-300">
              <a className="transition-colors hover:text-white" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
              <p>Marrakech, Maroc</p>
              <button
                className="mt-3 inline-flex w-fit items-center gap-2 text-xs font-light uppercase tracking-[0.18em] text-white transition-opacity duration-300 hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                type="button"
              >
                Retour en haut
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10 pt-3 md:pt-4">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_52%_18%,rgba(255,255,255,0.045),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.015),transparent_44%)]"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden">
            <p className="pointer-events-none select-none text-[clamp(4.8rem,24vw,18rem)] font-semibold leading-[0.8] tracking-tight text-white">
              2AAZ
            </p>
          </div>
        </div>

        <div className="mt-3 flex border-t border-white/10 pt-4 text-xs font-light uppercase tracking-[0.18em] text-gray-500">
          <p>2AAZ Studio d’architecture</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroScrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const heroScrollCueTweenRef = useRef<gsap.core.Tween | null>(null);
  const heroVideoPlaybackRef = useRef(false);
  const heroVideoEndHandlerRef = useRef<((event: Event) => void) | null>(null);
  const founderRef = useRef<HTMLElement>(null);
  const founderWordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const projectsRef = useRef<HTMLElement>(null);
  const projectCardRefs = useRef<Array<HTMLElement | null>>([]);
  const [openExpertise, setOpenExpertise] = useState<number | null>(null);
  const [activeProcess, setActiveProcess] = useState(0);
  const normalizePath = (nextPath: string) => {
    if (nextPath.length > 1 && nextPath.endsWith('/')) {
      return nextPath.slice(0, -1);
    }

    return nextPath || '/';
  };
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<(typeof featuredProjectGallery)[number] | null>(null);
  const currentProject = projectItems.find((project) => projectPath(project) === path);
  const isFeaturedProjectDetail = currentProject?.title === 'Résidence W - Villa type 2A';
  const selectedGalleryIndex = selectedGalleryImage
    ? featuredProjectGallery.findIndex((galleryImage) => galleryImage.src === selectedGalleryImage.src)
    : -1;
  const suggestedProjects = currentProject
    ? projectItems.filter((project) => project.title !== currentProject.title).slice(0, 2)
    : [];
  const activeExpertiseIndex = openExpertise ?? 0;
  const activeExpertise = expertiseItems[activeExpertiseIndex] ?? expertiseItems[0];
  const supportsFineHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const openExpertiseOnHover = (index: number) => {
    if (supportsFineHover()) {
      setOpenExpertise(index);
    }
  };
  const toggleExpertiseOnTap = (index: number) => {
    if (supportsFineHover()) {
      return;
    }

    setOpenExpertise((currentIndex) => (currentIndex === index ? null : index));
  };
  const showGalleryImage = (direction: 1 | -1) => {
    setSelectedGalleryImage((image) => {
      if (!image) {
        return image;
      }

      const currentIndex = featuredProjectGallery.findIndex((galleryImage) => galleryImage.src === image.src);
      const nextIndex = (currentIndex + direction + featuredProjectGallery.length) % featuredProjectGallery.length;
      return featuredProjectGallery[nextIndex];
    });
  };
  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const projectType = String(data.get('projectType') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const subject = `Demande de projet 2AAZ - ${name || 'Nouveau contact'}`;
    const body = [
      `Nom: ${name}`,
      `Téléphone / WhatsApp: ${phone}`,
      `Email: ${email}`,
      `Type de projet: ${projectType || 'Non précisé'}`,
      '',
      'Message:',
      message,
    ].join('\n');

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  const handleHeroScrollCueClick = async () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const heroTrigger = heroScrollTriggerRef.current ?? ScrollTrigger.getById('home-hero-video') ?? null;
    const video = videoRef.current;
    const nextSectionTop = () =>
      founderRef.current ? window.scrollY + founderRef.current.getBoundingClientRect().top : window.innerHeight;
    const revealTop = () => (heroTrigger ? heroTrigger.end + window.innerHeight : nextSectionTop());
    const revealNextSection = (duration = 0.9) => {
      const revealState = { y: window.scrollY };

      heroScrollCueTweenRef.current?.kill();
      heroScrollCueTweenRef.current = gsap.to(revealState, {
        y: revealTop(),
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          window.scrollTo(0, revealState.y);
          ScrollTrigger.update();
        },
        onComplete: () => {
          heroScrollCueTweenRef.current = null;
        },
      });
    };

    heroScrollCueTweenRef.current?.kill();

    if (prefersReducedMotion || !video) {
      window.scrollTo({ top: revealTop(), behavior: 'auto' });
      return;
    }

    if (heroVideoEndHandlerRef.current) {
      video.removeEventListener('ended', heroVideoEndHandlerRef.current);
      heroVideoEndHandlerRef.current = null;
    }

    heroVideoPlaybackRef.current = true;
    video.pause();
    video.playbackRate = 1;
    video.currentTime = 0;

    const handleEnded = () => {
      video.removeEventListener('ended', handleEnded);
      heroVideoEndHandlerRef.current = null;
      heroVideoPlaybackRef.current = false;
      revealNextSection();
    };

    heroVideoEndHandlerRef.current = handleEnded;
    video.addEventListener('ended', handleEnded, { once: true });

    try {
      await video.play();
    } catch {
      video.removeEventListener('ended', handleEnded);
      heroVideoEndHandlerRef.current = null;
      heroVideoPlaybackRef.current = false;
      if (video.duration) {
        video.currentTime = video.duration;
      }
      revealNextSection(0.5);
    }
  };

  useEffect(() => {
    if (!selectedGalleryImage) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedGalleryImage(null);
      }

      if (event.key === 'ArrowRight') {
        setSelectedGalleryImage((image) => {
          if (!image) {
            return image;
          }

          const currentIndex = featuredProjectGallery.findIndex((galleryImage) => galleryImage.src === image.src);
          const nextIndex = (currentIndex + 1) % featuredProjectGallery.length;
          return featuredProjectGallery[nextIndex];
        });
      }

      if (event.key === 'ArrowLeft') {
        setSelectedGalleryImage((image) => {
          if (!image) {
            return image;
          }

          const currentIndex = featuredProjectGallery.findIndex((galleryImage) => galleryImage.src === image.src);
          const nextIndex = (currentIndex - 1 + featuredProjectGallery.length) % featuredProjectGallery.length;
          return featuredProjectGallery[nextIndex];
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGalleryImage]);

  useEffect(() => {
    const navigateTo = (nextPath: string) => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));
      setSelectedGalleryImage(null);
      setOpenExpertise(null);
      setPath(normalizePath(nextPath));
      window.scrollTo({ top: 0, behavior: 'auto' });
      window.requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const handlePopState = () => navigateTo(window.location.pathname);
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const link = (event.target as Element | null)?.closest('a');

      if (!link || link.target || link.hasAttribute('download')) {
        return;
      }

      const url = new URL(link.href);

      if (url.origin !== window.location.origin) {
        return;
      }

      const nextPath = normalizePath(url.pathname);

      if (nextPath === path) {
        return;
      }

      event.preventDefault();
      window.history.pushState({}, '', nextPath);
      navigateTo(nextPath);
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick);
    };
  }, [path]);

  useLayoutEffect(() => {
    if (path !== '/') {
      return;
    }

    const hero = heroRef.current;
    const video = videoRef.current;

    if (!hero || !video) {
      return;
    }

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    ScrollTrigger.clearScrollMemory('manual');
    window.scrollTo(0, 0);

    let heroTrigger: ScrollTrigger | undefined;
    let rafId: number | undefined;
    let targetTime = 0;
    let currentTime = 0;

    const syncVideoTime = () => {
      rafId = undefined;

      // Keep the video tightly bound to scroll without the extra tween lag.
      if (Math.abs(targetTime - currentTime) < 0.001) {
        return;
      }

      currentTime = targetTime;
      video.currentTime = currentTime;
    };

    const queueVideoTime = (nextTime: number) => {
      targetTime = nextTime;

      if (rafId !== undefined) {
        return;
      }

      rafId = window.requestAnimationFrame(syncVideoTime);
    };

    const createScrollScrub = () => {
      const duration = video.duration || 1;

      video.pause();
      video.currentTime = 0;
      currentTime = 0;
      targetTime = 0;

      heroTrigger = ScrollTrigger.create({
        id: 'home-hero-video',
        trigger: hero,
        start: 'top top',
        end: () => `+=${Math.max(window.innerHeight * 5, duration * 520)}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        refreshPriority: 10,
        fastScrollEnd: false,
        onUpdate: (self) => {
          if (heroVideoPlaybackRef.current) {
            return;
          }

          queueVideoTime(self.progress * duration);
        },
      });
      heroScrollTriggerRef.current = heroTrigger;

      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) {
      createScrollScrub();
    } else {
      video.addEventListener('loadedmetadata', createScrollScrub, { once: true });
      video.load();
    }

    return () => {
      video.removeEventListener('loadedmetadata', createScrollScrub);
      heroTrigger?.kill();
      heroScrollTriggerRef.current = null;
      if (heroVideoEndHandlerRef.current) {
        video.removeEventListener('ended', heroVideoEndHandlerRef.current);
        heroVideoEndHandlerRef.current = null;
      }
      heroVideoPlaybackRef.current = false;
      heroScrollCueTweenRef.current?.kill();
      heroScrollCueTweenRef.current = null;

      if (rafId !== undefined) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [path]);

  useLayoutEffect(() => {
    if (path !== '/') {
      return;
    }

    const section = founderRef.current;
    const words = founderWordRefs.current.filter((word): word is HTMLSpanElement => Boolean(word));

    if (!section || words.length === 0) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(words, { color: '#111111' });
      return;
    }

    const context = gsap.context(() => {
      gsap.set(words, { color: '#beb8af' });

      gsap.to(words, {
        color: '#111111',
        duration: 0.28,
        ease: 'none',
        stagger: 0.075,
        scrollTrigger: {
          trigger: section,
          start: 'top 68%',
          end: 'bottom 38%',
          scrub: true,
          invalidateOnRefresh: true,
          refreshPriority: 5,
        },
      });

      gsap.fromTo(
        '.founder-portrait',
        { opacity: 0.82, scale: 0.985, y: 28 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'center center',
            scrub: true,
            invalidateOnRefresh: true,
            refreshPriority: 5,
          },
        },
      );

      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, section);

    return () => context.revert();
  }, [path]);

  useLayoutEffect(() => {
    if (path !== '/') {
      ScrollTrigger.getById('home-projects-stack')?.kill(true);
      ScrollTrigger.refresh();
      return;
    }

    const section = projectsRef.current;
    const cards = projectCardRefs.current.filter((card): card is HTMLElement => Boolean(card));

    if (!section || cards.length === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const context = gsap.context(() => {
      gsap.set(cards, {
        opacity: 1,
        scale: 1,
        transformOrigin: 'center center',
        y: 0,
        yPercent: 0,
      });
      gsap.set(cards.slice(1), { y: 0, yPercent: 104 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: 'home-projects-stack',
          trigger: section,
          start: 'top top',
          end: () => `+=${window.innerHeight * (cards.length - 1)}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
      });

      cards.slice(1).forEach((card, index) => {
        timeline.to(card, { y: 0, yPercent: 0, ease: 'none', duration: 1 }, index);
        timeline.to(cards[index], { opacity: 0.78, scale: 0.965, ease: 'none', duration: 1 }, index);
      });

      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, section);

    return () => context.revert();
  }, [path]);

  return (
    <main id="top" className="bg-black font-sans text-white">
      <div className="relative z-10 bg-black">
      {path === '/' && (
        <>
          <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteHeader />

          <div className="flex flex-1 flex-col justify-end px-6 pb-16 md:px-12 md:pb-20 lg:grid lg:grid-cols-2 lg:items-end lg:px-16 lg:pb-24">
            <div>
              <AnimatedHeading text={'Une architecture\npensée pour durer.'} />

              <FadeIn delay={800} duration={1000}>
                <p className="mb-5 text-base text-gray-300 md:text-lg">
                  Nous imaginons des lieux où matière, lumière et usage composent une élégance durable.
                </p>
              </FadeIn>

              <FadeIn delay={1200} duration={1000}>
                <div className="flex flex-wrap gap-4">
                  <a className="rounded-lg bg-white px-8 py-3 font-medium text-black transition-colors hover:bg-gray-100" href="/contact">
                    Parlons de votre projet
                  </a>
                  <a
                    className="liquid-glass rounded-lg border border-white/20 px-8 py-3 font-medium text-white transition-colors hover:bg-white hover:text-black"
                    href="/realisations"
                  >
                    Découvrez nos projets
                  </a>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={1400} duration={1000} className="mt-6 flex items-end justify-start lg:mt-0 lg:justify-end">
              <div className="liquid-glass rounded-xl border border-white/20 px-4 py-2.5 md:px-5 md:py-3">
                <p className="text-sm font-light text-white md:text-base lg:text-lg">+100 projets réalisés</p>
              </div>
            </FadeIn>
          </div>
        </div>
        <button
          aria-label="Faire défiler vers la suite"
          className="liquid-glass absolute bottom-8 left-1/2 z-20 inline-flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full text-white outline-none transition-[background-color,transform] duration-300 hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/70 motion-safe:animate-bounce md:bottom-10"
          onClick={handleHeroScrollCueClick}
          type="button"
        >
          <ChevronDown aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
        </button>
      </section>

      <section
        id="fondateur"
        ref={founderRef}
        className="relative overflow-hidden bg-[#f3f1ec] px-6 py-20 text-[#111111] md:px-12 lg:px-16 lg:py-28"
      >
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] lg:items-start lg:gap-14">
          <div className="lg:pt-4">
            <p className="text-sm uppercase tracking-[0.2em] text-[#7c766f]">Mot du fondateur</p>
            <h2 className="sr-only">Mot du fondateur de 2AAZ</h2>

            <p className="mt-7 max-w-5xl text-[clamp(1.85rem,3.65vw,4.15rem)] font-light leading-[1.12] tracking-tight text-[#beb8af]">
              {founderStatement.split(' ').map((word, index) => (
                <span
                  className="mr-[0.18em] inline-block"
                  key={`${word}-${index}`}
                  ref={(node) => {
                    founderWordRefs.current[index] = node;
                  }}
                >
                  {word}
                </span>
              ))}
            </p>

            <div className="mt-9 border-t border-black/10 pt-6 md:mt-12">
              <p className="max-w-md text-base font-light leading-relaxed text-[#57514a] md:text-lg">
                Une approche attentive au lieu, aux usages et au temps long.
              </p>
            </div>
          </div>

          <aside className="founder-portrait rounded-2xl border border-black/10 bg-[#e8e3da] p-3 shadow-2xl shadow-black/10 lg:sticky lg:top-10">
            <figure className="overflow-hidden rounded-xl bg-[#d8d0c4]">
              <div className="relative aspect-[4/5]">
                <img
                  alt="Portrait de Ajana Zouheir, fondateur de 2AAZ"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  decoding="async"
                  loading="lazy"
                  src={founderImageSrc}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" aria-hidden="true" />
              </div>
            </figure>
            <div className="mt-4 border-t border-black/10 px-1 pt-4">
              <p className="text-lg font-medium tracking-tight text-[#111111]">AJANA ZOUHEIR</p>
              <p className="mt-1 text-sm uppercase tracking-[0.18em] text-[#807972]">Fondateur, 2AAZ</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f2eee7] px-6 py-14 text-[#111111] md:px-12 md:py-20 lg:px-16 lg:py-24">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.85),transparent_32%),linear-gradient(180deg,#f5f1ea_0%,#ebe5dc_100%)]"
          aria-hidden="true"
        />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14">
          <figure className="order-2 overflow-hidden rounded-2xl border border-black/10 bg-[#e1d8cc] shadow-2xl shadow-black/10 lg:sticky lg:top-10 lg:order-1">
            <div className="relative aspect-[4/3] lg:h-[43rem] lg:aspect-auto xl:h-[45rem]">
              {expertiseItems.map((item, imageIndex) => (
                <img
                  alt={item.alt}
                  className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out ${
                    activeExpertiseIndex === imageIndex ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0'
                  }`}
                  key={item.image}
                  loading={imageIndex === 0 ? 'eager' : 'lazy'}
                  src={item.image}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10" aria-hidden="true" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <div className="flex w-full min-w-0 max-w-full rounded-xl border border-white/60 bg-white/80 px-4 py-3 shadow-xl shadow-black/10 backdrop-blur-sm md:inline-flex md:w-auto">
                  <p className="min-w-0 max-w-full break-words text-sm font-light leading-relaxed text-[#39342e]">
                    {activeExpertise.caption}
                  </p>
                </div>
              </figcaption>
            </div>
          </figure>

          <div className="contents lg:order-2 lg:block">
            <div className="order-1">
            <p className="text-sm uppercase tracking-[0.2em] text-[#8a8176]">Expertise</p>
            <h2 className="mt-5 max-w-2xl text-4xl font-light leading-tight text-[#111111] md:text-5xl lg:text-6xl">
              Une expertise complète, du contexte au chantier.
            </h2>
          </div>

          <div className="order-3 grid gap-2.5 lg:mt-12 lg:gap-3">
            {expertiseItems.map(({ title, description, Icon }, index) => {
              const isOpen = openExpertise === index;

              return (
                <button
                  aria-expanded={isOpen}
                  className={`group relative w-full cursor-pointer rounded-xl border px-4 py-4 pr-12 text-left outline-none transition-[background-color,border-color,box-shadow,transform] duration-300 focus-visible:ring-2 focus-visible:ring-black/50 md:px-5 md:py-5 md:pr-5 ${
                    isOpen
                      ? 'border-black/20 bg-white shadow-xl shadow-black/10'
                      : 'border-black/10 bg-white/55 shadow-sm shadow-black/5 hover:border-black/20 hover:bg-white/80'
                  }`}
                  key={title}
                  onClick={() => toggleExpertiseOnTap(index)}
                  onFocus={() => setOpenExpertise(index)}
                  onPointerEnter={() => openExpertiseOnHover(index)}
                  type="button"
                >
                  <div className="grid gap-4 md:grid-cols-[4rem_1fr_auto] md:items-start">
                    <p className="hidden text-sm font-light tabular-nums tracking-[0.2em] text-[#9b9389] md:block">
                      {String(index + 1).padStart(2, '0')}
                    </p>

                    <div className="min-w-0">
                      <div
                        className={`flex min-w-0 items-center gap-3 transition-transform duration-500 ease-out md:gap-4 ${
                          isOpen ? 'md:-translate-x-1' : 'md:group-hover:-translate-x-1'
                        }`}
                      >
                        <p className="w-8 shrink-0 text-xs font-light tabular-nums tracking-[0.18em] text-[#9b9389] md:hidden">
                          {String(index + 1).padStart(2, '0')}
                        </p>
                        <span
                          className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border text-[#111111] transition-[background-color,border-color,box-shadow,transform] duration-500 ease-out ${
                            isOpen
                              ? 'border-black/10 bg-[#f2eee7] shadow-[0_0_28px_rgba(139,125,102,0.24)] md:scale-105'
                              : 'border-black/10 bg-white/65 group-hover:border-black/10 group-hover:bg-[#f2eee7] md:group-hover:scale-105'
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`absolute -inset-2 rounded-xl bg-[#d8cfc2] blur-xl transition-opacity duration-500 ${
                              isOpen ? 'opacity-45' : 'opacity-0 group-hover:opacity-35'
                            }`}
                          />
                          <Icon
                            aria-hidden="true"
                            className="relative z-10 h-5 w-5 transition-transform duration-500 ease-out"
                            strokeWidth={1.5}
                          />
                        </span>
                        <h3
                          className={`min-w-0 text-lg font-light leading-tight text-[#111111] transition-[color,transform] duration-500 ease-out md:text-3xl ${
                            isOpen ? 'md:text-black' : 'md:group-hover:text-black'
                          }`}
                        >
                          {title}
                        </h3>
                      </div>

                      <div
                        className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-out ${
                          isOpen ? 'mt-4 grid-rows-[1fr] opacity-100 md:mt-5' : 'mt-0 grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p
                            className={`max-w-3xl text-sm font-light leading-relaxed text-[#5d554d] transition-transform duration-500 ease-out md:text-lg ${
                              isOpen ? 'translate-y-0' : '-translate-y-2'
                            }`}
                          >
                            {description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <ChevronDown
                      aria-hidden="true"
                      className={`absolute right-4 top-5 h-5 w-5 text-[#8a8176] transition-transform duration-500 md:static md:block ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                      strokeWidth={1.5}
                    />
                  </div>
                </button>
              );
            })}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={projectsRef}
        className="relative min-h-dvh overflow-hidden bg-[#070706] px-6 py-8 md:px-12 lg:px-16"
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,#0d0b08_0%,#070706_42%,#0d0b08_100%)]"
          aria-hidden="true"
        />

        <div className="relative flex min-h-dvh flex-col justify-center py-6 md:py-10">
          <div className="mb-6 grid gap-5 lg:grid-cols-[0.76fr_1fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Projets</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-light leading-tight text-white md:text-5xl lg:text-6xl">
                Une sélection pensée comme un parcours spatial.
              </h2>
            </div>
            <p className="hidden max-w-xl text-base font-light leading-relaxed text-gray-300 md:block lg:justify-self-end lg:text-right">
              Quatre exemples de réalisations, présentés comme des plans successifs pour laisser l’image raconter
              l’atmosphère, la matière et l’échelle.
            </p>
          </div>

          <div className="relative h-[58dvh] min-h-[25rem] overflow-hidden rounded-2xl md:h-[68vh] md:min-h-[34rem] motion-reduce:h-auto motion-reduce:overflow-visible motion-reduce:rounded-none">
            {projectItems.map((project, index) => (
              <a
                aria-label={`Voir le projet ${project.title}`}
                className={`absolute inset-0 block overflow-hidden rounded-2xl border border-white/10 bg-[#11100d] shadow-2xl shadow-black/60 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white/80 motion-reduce:relative motion-reduce:inset-auto motion-reduce:mb-5 motion-reduce:h-[28rem] motion-reduce:!transform-none md:motion-reduce:h-[32rem] ${
                  index === 0 ? '' : 'translate-y-[104%]'
                }`}
                href={projectPath(project)}
                key={project.title}
                ref={(node) => {
                  projectCardRefs.current[index] = node;
                }}
                style={{
                  zIndex: index + 1,
                }}
              >
                <img
                  alt={project.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  decoding="async"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  src={project.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" aria-hidden="true" />
                <div
                  className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.55),rgba(0,0,0,0.08)_62%,rgba(0,0,0,0.18))]"
                  aria-hidden="true"
                />

                <div className="relative z-10 flex h-full items-end p-4 md:p-8 lg:p-10">
                  <div className="max-w-3xl">
                    <p className="text-xs font-light uppercase tracking-[0.24em] text-gray-300">
                      {String(index + 1).padStart(2, '0')} / {String(projectItems.length).padStart(2, '0')}
                    </p>
                    <h3 className="mt-3 max-w-4xl text-2xl font-light leading-[1.05] text-white md:text-5xl lg:text-6xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-gray-200 md:mt-4 md:text-lg">
                      {project.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-3 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition-colors">
                      Voir le projet
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                    </span>

                    <dl className="mt-4 grid grid-cols-3 gap-2 md:mt-5 md:max-w-2xl">
                      {project.tags.map((tag) => (
                        <div
                          className="liquid-glass min-w-0 rounded-lg px-3 py-2 md:px-4 md:py-3"
                          key={`${project.title}-${tag.label}`}
                        >
                          <dt className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-gray-400 md:text-[0.68rem] md:tracking-[0.18em]">
                            {tag.label}
                          </dt>
                          <dd className="mt-1 break-words text-xs font-light text-white md:text-base">{tag.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

        </>
      )}

      {path === '/a-propos' && (
        <>
          <SiteHeader />
          <section className="relative flex overflow-hidden bg-[#0d0b08] px-6 py-12 md:min-h-[calc(100dvh-5rem)] md:px-12 md:py-14 lg:px-16 lg:py-16">
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(180,132,74,0.16),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.035)_0,transparent_34%)]"
              aria-hidden="true"
            />
            <div className="relative flex w-full flex-col justify-start gap-10 md:justify-between md:gap-8">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-gray-500">À propos de 2AAZ</p>
                <h1 className="mt-7 max-w-[62rem] text-[clamp(2.85rem,8.2vw,8.4rem)] font-light leading-[0.94] tracking-tight text-white md:mt-8">
                  <span className="block">Nous concevons</span>
                  <span className="block">des espaces</span>
                  <span className="block text-gray-500">portés par</span>
                  <span className="block min-h-[0.96em] pt-1">
                    <TypewriterWord words={aboutTypewriterWords} />
                  </span>
                </h1>
              </div>

              <div className="grid gap-6 border-t border-white/10 pt-7 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:items-start">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  Architecture · Maroc · Résidentiel & projets sur mesure
                </p>
                <p className="max-w-3xl text-base font-light leading-relaxed text-gray-300 md:text-xl">
                  Chez 2AAZ, chaque projet naît d’une lecture attentive du lieu, des usages et de la lumière. Notre
                  mission est de transformer une intention en architecture durable, élégante et profondément adaptée à
                  son contexte.
                </p>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden bg-[#0d0b08] px-6 py-14 md:px-12 md:py-20 lg:px-16 lg:py-28">
            <div className="absolute inset-x-0 top-0 h-px bg-white/10" aria-hidden="true" />
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(180,132,74,0.11),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_44%)]"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:items-end">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-gray-500">Notre approche</p>
                  <h2 className="mt-5 max-w-4xl text-4xl font-light leading-tight text-white md:text-6xl lg:text-7xl">
                    Une méthode claire, du premier échange à la livraison.
                  </h2>
                </div>
                <p className="max-w-2xl text-base font-light leading-relaxed text-gray-300 md:text-lg lg:justify-self-end lg:text-right">
                  Chaque étape structure la décision, protège l’intention architecturale et donne au projet une
                  progression lisible, exigeante et sereine.
                </p>
              </div>

              <div className="mt-12 hidden h-[32rem] overflow-hidden rounded-2xl border border-white/10 bg-black/25 shadow-2xl shadow-black/40 lg:flex">
                {processItems.map((item, index) => {
                  const isActive = activeProcess === index;

                  return (
                    <button
                      aria-expanded={isActive}
                      className={`group relative min-w-0 overflow-hidden border-r border-white/10 px-7 py-8 text-left outline-none transition-[flex,background-color] duration-500 ease-out last:border-r-0 focus-visible:ring-2 focus-visible:ring-white/70 ${
                        isActive ? 'flex-[5_1_0%] bg-white/[0.075]' : 'flex-[1_1_0%] bg-white/[0.025] hover:bg-white/[0.045]'
                      }`}
                      key={item.title}
                      onFocus={() => setActiveProcess(index)}
                      onMouseEnter={() => setActiveProcess(index)}
                      type="button"
                    >
                      <span className="absolute inset-0 bg-gradient-to-br from-white/[0.035] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <span
                        className={`absolute bottom-6 left-7 text-[12rem] font-light leading-none text-white/10 transition-[opacity,transform] duration-500 ${
                          isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-45'
                        }`}
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span className="relative z-10 flex h-full flex-col justify-between">
                        <span className="text-sm font-light tabular-nums tracking-[0.2em] text-gray-500">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <span
                          className={`block transition-[opacity,transform] duration-500 ${
                            isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-70'
                          }`}
                        >
                          <span className="block max-w-xl text-3xl font-light leading-tight text-white md:text-4xl">
                            {item.title}
                          </span>
                          <span
                            className={`mt-5 block max-w-2xl text-base font-light leading-relaxed text-gray-300 transition-[opacity,max-height] duration-500 ${
                              isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                          >
                            {item.description}
                          </span>
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-10 grid gap-3 lg:hidden">
                {processItems.map((item, index) => (
                  <article className="liquid-glass rounded-xl px-5 py-5" key={item.title}>
                    <p className="text-sm font-light tabular-nums tracking-[0.2em] text-gray-500">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-8 text-2xl font-light leading-tight text-white">{item.title}</h3>
                    <p className="mt-4 text-base font-light leading-relaxed text-gray-300">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden bg-[#0d0b08] px-6 py-24 md:px-12 lg:px-16 lg:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent_34%),radial-gradient(circle_at_78%_20%,rgba(180,132,74,0.14),transparent_32%)]" aria-hidden="true" />

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-end lg:gap-14">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">À propos</p>
            <h2 className="mt-6 max-w-4xl text-4xl font-light leading-tight text-white md:text-6xl lg:text-7xl">
              Une architecture ancrée dans le lieu, pensée pour durer.
            </h2>
            <p className="mt-7 max-w-2xl text-base font-light leading-relaxed text-gray-300 md:text-lg">
              2AAZ conçoit des espaces résidentiels et professionnels qui relient la précision technique à une
              expérience sensible du quotidien. Chaque projet cherche le juste équilibre entre lumière, matière,
              usages et climat.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:max-w-xl lg:grid-cols-1">
              {aboutPrinciples.map(({ title, description, Icon }) => (
                <article className="liquid-glass rounded-xl px-4 py-4" key={title}>
                  <Icon aria-hidden="true" className="h-5 w-5 text-white/80" strokeWidth={1.6} />
                  <h3 className="mt-5 text-lg font-light tracking-tight text-white">{title}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-gray-400">{description}</p>
                </article>
              ))}
            </div>
          </div>

          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-2xl shadow-black/50">
            <div className="relative aspect-[4/5] min-h-[28rem] md:aspect-[16/10] lg:aspect-[4/5] lg:min-h-[42rem]">
              <img
                alt="Villa contemporaine 2AAZ au coucher du soleil"
                className="absolute inset-0 h-full w-full object-cover"
                decoding="async"
                loading="lazy"
                src={aboutVisualSrc}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/20" aria-hidden="true" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <div className="liquid-glass inline-flex rounded-xl px-4 py-3">
                  <p className="text-sm font-light leading-relaxed text-gray-200">
                    Une lecture précise du site, du programme et du temps long.
                  </p>
                </div>
              </figcaption>
            </div>
          </figure>
        </div>
      </section>

          <section className="relative overflow-hidden bg-[#070706] px-6 py-20 md:px-12 lg:px-16 lg:py-28">
            <div className="absolute inset-x-0 top-0 h-px bg-white/10" aria-hidden="true" />
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(180,132,74,0.11),transparent_30%),linear-gradient(180deg,#070706_0%,#0d0b08_54%,#070706_100%)]"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:items-end">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-gray-500">Équipe</p>
                  <h2 className="mt-5 max-w-4xl text-4xl font-light leading-tight text-white md:text-6xl lg:text-7xl">
                    Des regards complémentaires, une même exigence.
                  </h2>
                </div>
                <p className="max-w-2xl text-base font-light leading-relaxed text-gray-300 md:text-lg lg:justify-self-end lg:text-right">
                  Une équipe resserrée accompagne chaque projet avec précision, sensibilité et attention au temps long.
                </p>
              </div>

              <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {teamMembers.map((member, index) => (
                  <article
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-2 transition-[background-color,border-color,transform] duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06]"
                    key={member.name}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#171410]">
                      <img
                        alt={member.alt}
                        className="absolute inset-0 h-full w-full object-cover grayscale saturate-0 contrast-110 transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.045] group-hover:grayscale-0 group-hover:saturate-100"
                        decoding="async"
                        loading="lazy"
                        src={member.image}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-black/18 to-black/5 transition-opacity duration-500 group-hover:opacity-85" aria-hidden="true" />
                      <div
                        className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_24%,transparent_72%,rgba(180,132,74,0.18))] opacity-40 transition-opacity duration-500 group-hover:opacity-70"
                        aria-hidden="true"
                      />

                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                        <p className="text-xs font-light uppercase tracking-[0.24em] text-gray-400">
                          {String(index + 1).padStart(2, '0')}
                        </p>
                        <p className="mt-3 translate-y-0 text-sm font-light leading-relaxed text-gray-200 opacity-100 transition-[opacity,transform] duration-500 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                          {member.note}
                        </p>
                      </div>
                    </div>

                    <div className="flex min-h-[7.25rem] flex-col justify-between px-2 pb-3 pt-5">
                      <div>
                        <h3 className="text-xl font-light tracking-tight text-white md:text-2xl">{member.name}</h3>
                        <p className="mt-2 text-sm font-light text-gray-400">{member.role}</p>
                      </div>
                      <div className="mt-5 h-px w-full bg-white/10 transition-colors duration-500 group-hover:bg-white/25" />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

        </>
      )}

      {path === '/realisations' && (
        <>
          <SiteHeader />
          <section className="relative overflow-hidden bg-[#0d0b08] px-6 py-16 md:px-12 lg:px-16 lg:py-20">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_84%_16%,rgba(180,132,74,0.15),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_34%)]"
              aria-hidden="true"
            />

            <div className="relative flex min-h-[calc(100dvh-5rem)] flex-col justify-between gap-12">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-gray-500">Réalisations</p>
                <AnimatedHeading
                  charDelay={22}
                  className="mt-8 max-w-[86rem] text-[clamp(2.85rem,8.4vw,8.8rem)] font-light leading-[1.02] text-white"
                  initialDelay={180}
                  lineClassName="whitespace-normal"
                  text={'Des projets pensés\npour habiter le temps.'}
                  wrapWords
                />
              </div>

              <div className="grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
                <dl className="grid gap-5 sm:grid-cols-3 lg:max-w-3xl">
                  {realisationStats.map((stat) => (
                    <div className="min-w-0" key={stat.label}>
                      <dt className="text-sm font-light text-gray-500">{stat.label}</dt>
                      <dd className="mt-3 text-2xl font-light tracking-tight text-white md:text-3xl">{stat.value}</dd>
                    </div>
                  ))}
                </dl>

                <p className="max-w-3xl text-base font-light leading-relaxed text-gray-300 md:text-xl lg:justify-self-end lg:text-right">
                  Une sélection de projets résidentiels et sur mesure, conçus autour du lieu, de la lumière, des usages
                  et du climat marocain. Chaque réalisation révèle une intention précise, transformée en espace durable.
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-[1.3fr_0.85fr_0.85fr]">
                {projectItems.slice(0, 3).map((project, index) => (
                  <a
                    aria-label={`Découvrir ${project.title}`}
                    className="group relative min-h-[18rem] overflow-hidden rounded-2xl border border-white/10 bg-black/30 outline-none transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-white/25 focus-visible:ring-2 focus-visible:ring-white/80 md:min-h-[24rem] lg:min-h-[28rem]"
                    href={projectPath(project)}
                    key={project.title}
                  >
                    <img
                      alt={project.alt}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      decoding="async"
                      loading={index === 0 ? 'eager' : 'lazy'}
                      src={project.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/22 to-black/5" aria-hidden="true" />
                    <div
                      className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),transparent_24%,transparent_70%,rgba(180,132,74,0.16))] opacity-40 transition-opacity duration-500 group-hover:opacity-75"
                      aria-hidden="true"
                    />
                    <div className="relative z-10 flex h-full flex-col justify-between p-5 md:p-6">
                      <p className="text-xs font-light uppercase tracking-[0.24em] text-gray-300">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      <div>
                        <h2 className="max-w-xl text-2xl font-light leading-tight text-white md:text-3xl">
                          {project.title}
                        </h2>
                        <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-gray-300">
                          {project.tags[0]?.value} · {project.tags[1]?.value}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden bg-[#070706] px-6 py-20 md:px-12 lg:px-16 lg:py-28">
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,#0d0b08_0%,#070706_36%,#0d0b08_100%)]"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="mb-10 grid gap-5 border-t border-white/10 pt-8 lg:grid-cols-[0.76fr_1fr] lg:items-end">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Projets</p>
                  <h2 className="mt-4 max-w-3xl text-3xl font-light leading-tight text-white md:text-5xl lg:text-6xl">
                    Explorer les réalisations.
                  </h2>
                </div>
                <p className="max-w-xl text-base font-light leading-relaxed text-gray-300 md:text-lg lg:justify-self-end lg:text-right">
                  Les projets se découvrent comme une galerie calme : l’image d’abord, puis les détails au survol.
                </p>
              </div>

              <div className="grid gap-5 lg:gap-7">
                {projectItems.map((project, index) => (
                  <a
                    aria-label={`Voir le projet ${project.title}`}
                    className="group relative block h-[68vh] min-h-[28rem] overflow-hidden rounded-2xl border border-white/10 bg-[#11100d] shadow-2xl shadow-black/50 outline-none transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-white/25 focus-visible:ring-2 focus-visible:ring-white/80 md:h-[72vh] md:min-h-[34rem]"
                    href={projectPath(project)}
                    key={project.title}
                  >
                    <img
                      alt={project.alt}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                      decoding="async"
                      loading={index === 0 ? 'eager' : 'lazy'}
                      src={project.image}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5 opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100 md:group-focus:opacity-100 md:group-focus-visible:opacity-100"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.62),rgba(0,0,0,0.08)_62%,rgba(0,0,0,0.18))] opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100 md:group-focus:opacity-100 md:group-focus-visible:opacity-100"
                      aria-hidden="true"
                    />

                    <div className="relative z-10 flex h-full items-end p-4 md:p-8 lg:p-10">
                      <div className="max-w-3xl translate-y-0 opacity-100 transition-[opacity,transform] duration-500 ease-out md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus:translate-y-0 md:group-focus:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
                        <p className="text-xs font-light uppercase tracking-[0.24em] text-gray-300">
                          {String(index + 1).padStart(2, '0')} / {String(projectItems.length).padStart(2, '0')}
                        </p>
                        <h3 className="mt-3 max-w-4xl text-2xl font-light leading-[1.05] text-white md:text-5xl lg:text-6xl">
                          {project.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-gray-200 md:mt-4 md:text-lg">
                          {project.description}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-3 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition-colors group-hover:bg-gray-100">
                          Voir le projet
                          <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                        </span>

                        <dl className="mt-4 grid grid-cols-3 gap-2 md:mt-5 md:max-w-2xl">
                          {project.tags.map((tag) => (
                            <div
                              className="liquid-glass min-w-0 rounded-lg px-3 py-2 md:px-4 md:py-3"
                              key={`${project.title}-${tag.label}`}
                            >
                              <dt className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-gray-400 md:text-[0.68rem] md:tracking-[0.18em]">
                                {tag.label}
                              </dt>
                              <dd className="mt-1 break-words text-xs font-light text-white md:text-base">{tag.value}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {currentProject && (
        <>
          <SiteHeader />
          {isFeaturedProjectDetail && (
            <section className="relative overflow-hidden bg-[#070706] px-6 py-8 md:px-12 lg:px-16 lg:py-10">
              <div className="border-t border-white/10 pt-8 md:pt-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-gray-500 md:text-sm">Projet détail</p>
                  <AnimatedHeading
                    charDelay={22}
                    className="mt-5 max-w-6xl text-[clamp(3.1rem,7.2vw,7.6rem)] font-light leading-[0.96] text-white md:mt-7"
                    initialDelay={160}
                    lineClassName="whitespace-normal"
                    text={currentProject.title}
                    wrapWords
                  />
                </div>

                <figure className="group relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/50 md:mt-12">
                  <div className="relative h-[68dvh] min-h-[28rem] md:h-[76dvh] lg:h-[80dvh]">
                    <img
                      alt={currentProject.alt}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.025]"
                      decoding="async"
                      src={currentProject.image}
                    />
                  </div>
                </figure>

                <div className="mt-8 grid gap-8 border-b border-white/10 pb-8 md:mt-10 md:pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(28rem,0.62fr)] lg:items-start lg:gap-14">
                  <p className="max-w-3xl text-xl font-light leading-relaxed text-gray-200 md:text-2xl lg:text-3xl">
                    {currentProject.description}
                  </p>

                  <dl className="grid w-full gap-5 sm:grid-cols-3 lg:justify-self-end">
                    {currentProject.tags.map((tag) => (
                      <div className="min-w-0" key={tag.label}>
                        <dt className="text-xs font-light uppercase tracking-[0.18em] text-gray-500">{tag.label}</dt>
                        <dd className="mt-2 break-words text-sm font-light leading-snug text-white md:text-base">
                          {tag.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </section>
          )}

          {isFeaturedProjectDetail && (
            <section className="relative overflow-hidden bg-[#070706] px-6 pb-16 md:px-12 md:pb-20 lg:px-16 lg:pb-28">
              <div className="border-b border-white/10 pb-10">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] lg:gap-5">
                  <button
                    aria-label={`Agrandir ${featuredProjectGallery[0].label}`}
                    className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-black text-left shadow-2xl shadow-black/40 outline-none transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-white/30 focus-visible:ring-2 focus-visible:ring-white/70 md:aspect-auto md:min-h-[36rem] lg:min-h-[48rem]"
                    onClick={() => setSelectedGalleryImage(featuredProjectGallery[0])}
                    type="button"
                  >
                    <img
                      alt={featuredProjectGallery[0].alt}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.035]"
                      decoding="async"
                      src={featuredProjectGallery[0].src}
                    />
                    <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" aria-hidden="true" />
                    <span className="absolute bottom-5 left-5 text-sm font-light text-white md:bottom-7 md:left-7">
                      {featuredProjectGallery[0].label}
                    </span>
                  </button>

                  <div className="grid gap-4 lg:gap-5">
                    {featuredProjectGallery.slice(1).map((image) => (
                      <button
                        aria-label={`Agrandir ${image.label}`}
                        className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-black text-left shadow-2xl shadow-black/30 outline-none transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-white/30 focus-visible:ring-2 focus-visible:ring-white/70 md:aspect-auto md:min-h-[24rem]"
                        key={image.src}
                        onClick={() => setSelectedGalleryImage(image)}
                        type="button"
                      >
                        <img
                          alt={image.alt}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                          decoding="async"
                          src={image.src}
                        />
                        <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" aria-hidden="true" />
                        <span className="absolute bottom-5 left-5 text-sm font-light text-white md:bottom-6 md:left-6">
                          {image.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {isFeaturedProjectDetail && (
            <section className="relative overflow-hidden bg-[#070706] px-6 pb-16 md:px-12 md:pb-20 lg:px-16 lg:pb-28">
              <div className="border-b border-white/10 pb-10">
                <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="max-w-4xl text-4xl font-light leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                      Autres projets réalisés.
                    </h2>
                  </div>

                  <a
                    className="inline-flex min-h-12 w-fit items-center gap-3 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                    href="/realisations"
                  >
                    Voir toutes les réalisations
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                  </a>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  {suggestedProjects.map((project) => (
                    <a
                      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/35 outline-none transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-white/30 focus-visible:ring-2 focus-visible:ring-white/70"
                      href={projectPath(project)}
                      key={project.title}
                    >
                      <div className="relative aspect-[16/11] min-h-[20rem] md:min-h-[28rem]">
                        <img
                          alt={project.alt}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                          decoding="async"
                          loading="lazy"
                          src={project.image}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/78 to-transparent" aria-hidden="true" />

                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                          <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 2).map((tag) => (
                              <span
                                className="text-[0.65rem] uppercase tracking-[0.16em] text-gray-300"
                                key={`${project.title}-${tag.label}`}
                              >
                                {tag.value}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4 flex items-end justify-between gap-5">
                            <div>
                              <h3 className="text-2xl font-light leading-tight text-white md:text-3xl">
                                {project.title}
                              </h3>
                              <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-gray-300 opacity-90 transition-opacity duration-500 group-hover:opacity-100 md:text-base">
                                {project.description}
                              </p>
                            </div>
                            <ArrowUpRight
                              aria-hidden="true"
                              className="hidden h-6 w-6 shrink-0 text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:block"
                              strokeWidth={1.6}
                            />
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          )}

          {!isFeaturedProjectDetail && (
            <section className="relative overflow-hidden bg-[#070706] px-6 py-16 md:px-12 lg:px-16 lg:py-24">
              <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-end lg:gap-14">
                <div>
                  <a className="text-sm uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-white" href="/realisations">
                    Réalisations
                  </a>
                  <h1 className="mt-6 max-w-4xl text-4xl font-light leading-tight text-white md:text-6xl lg:text-7xl">
                    {currentProject.title}
                  </h1>
                  <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-gray-300 md:text-lg">
                    {currentProject.description}
                  </p>

                  <dl className="mt-8 grid grid-cols-3 gap-2 md:max-w-2xl">
                    {currentProject.tags.map((tag) => (
                      <div className="liquid-glass min-w-0 rounded-lg px-3 py-2 md:px-4 md:py-3" key={tag.label}>
                        <dt className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-gray-400 md:text-[0.68rem] md:tracking-[0.18em]">
                          {tag.label}
                        </dt>
                        <dd className="mt-1 break-words text-xs font-light text-white md:text-base">{tag.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <figure className="overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-2xl shadow-black/50">
                  <div className="relative aspect-[4/5] min-h-[28rem] md:aspect-[16/10] lg:aspect-[4/5] lg:min-h-[42rem]">
                    <img
                      alt={currentProject.alt}
                      className="absolute inset-0 h-full w-full object-cover"
                      decoding="async"
                      src={currentProject.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" aria-hidden="true" />
                  </div>
                </figure>
              </div>
            </section>
          )}

          {selectedGalleryImage && (
            <div
              aria-label={selectedGalleryImage.label}
              aria-modal="true"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 px-4 py-6 backdrop-blur-sm md:px-8"
              onClick={() => setSelectedGalleryImage(null)}
              role="dialog"
            >
              <button
                aria-label="Fermer la galerie"
                className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:right-8 md:top-8"
                onClick={() => setSelectedGalleryImage(null)}
                type="button"
              >
                <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
              </button>

              <button
                aria-label="Image précédente"
                className="absolute left-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:left-8 md:h-12 md:w-12"
                onClick={(event) => {
                  event.stopPropagation();
                  showGalleryImage(-1);
                }}
                type="button"
              >
                <ChevronLeft aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
              </button>

              <button
                aria-label="Image suivante"
                className="absolute right-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:right-8 md:h-12 md:w-12"
                onClick={(event) => {
                  event.stopPropagation();
                  showGalleryImage(1);
                }}
                type="button"
              >
                <ChevronRight aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
              </button>

              <figure
                className="w-full max-w-7xl px-10 md:px-16"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black">
                  <img
                    alt={selectedGalleryImage.alt}
                    className="max-h-[82dvh] w-full object-contain"
                    decoding="async"
                    src={selectedGalleryImage.src}
                  />
                </div>
                <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm font-light text-gray-300 md:text-base">
                  <span>{selectedGalleryImage.label}</span>
                  <span className="text-xs uppercase tracking-[0.18em] text-gray-500">
                    {selectedGalleryIndex + 1} / {featuredProjectGallery.length}
                  </span>
                </figcaption>
              </figure>
            </div>
          )}
        </>
      )}

      {path === '/contact' && (
        <>
          <SiteHeader />
          <section className="relative overflow-hidden bg-[#0d0b08] px-6 py-14 md:px-12 md:py-20 lg:px-16 lg:py-24">
            <div className="absolute inset-x-0 top-0 h-px bg-white/10" aria-hidden="true" />
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(180,132,74,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_35%)]"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-end lg:gap-16">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-gray-500 md:text-sm">Contact</p>
                  <AnimatedHeading
                    charDelay={22}
                    className="mt-7 max-w-[86rem] text-[clamp(3.2rem,8.4vw,8.8rem)] font-light leading-[1.02] text-white"
                    initialDelay={180}
                    lineClassName="whitespace-normal"
                    text={'Parlons de\nvotre projet.'}
                    wrapWords
                  />
                </div>

                <p className="max-w-2xl text-base font-light leading-relaxed text-gray-300 md:text-xl lg:pb-2">
                  Une villa, un terrain, un immeuble ou une intention à clarifier ? Partagez-nous les premières lignes
                  de votre projet, nous vous répondons sous 24h pour cadrer les prochaines étapes.
                </p>
              </div>

              <div className="grid gap-10 pt-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16">
                <aside className="space-y-8">
                  <div className="grid gap-4">
                    {[
                      {
                        label: 'Email',
                        value: contactEmail,
                        href: `mailto:${contactEmail}`,
                        Icon: Mail,
                      },
                      {
                        label: 'Téléphone',
                        value: '06 61 88 43 41',
                        href: 'tel:+212661884341',
                        Icon: Phone,
                      },
                      {
                        label: 'Adresse',
                        value: 'Résidence Clarisse, Rue Mohamed El Bekal 115, Marrakech 40000',
                        href: 'https://maps.google.com/?q=R%C3%A9sidence%20Clarisse%2C%20Rue%20Mohamed%20El%20Bekal%20115%2C%20Marrakech%2040000',
                        Icon: MapPin,
                      },
                    ].map(({ label, value, href, Icon }) => (
                      <a
                        className="group grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 border-b border-white/10 pb-5 outline-none transition-colors hover:border-white/25 focus-visible:ring-2 focus-visible:ring-white/70"
                        href={href}
                        key={label}
                        rel={label === 'Adresse' ? 'noreferrer' : undefined}
                        target={label === 'Adresse' ? '_blank' : undefined}
                      >
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:-translate-y-0.5">
                          <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
                        </span>
                        <span>
                          <span className="block text-xs uppercase tracking-[0.22em] text-gray-500">{label}</span>
                          <span className="mt-2 block text-base font-light leading-relaxed text-white md:text-lg">
                            {value}
                          </span>
                        </span>
                      </a>
                    ))}
                  </div>

                  <div className="border-b border-white/10 pb-6">
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">
                        <Clock aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-gray-500">Horaires</p>
                        <p className="mt-2 text-base font-light text-white md:text-lg">Lundi - Vendredi · 10:00 - 18:00</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm font-light leading-relaxed text-gray-400">
                      Samedi et dimanche fermé. Les premières demandes sont généralement traitées sous 24h ouvrées.
                    </p>
                  </div>
                </aside>

                <form
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/40 md:p-7 lg:p-8"
                  onSubmit={handleContactSubmit}
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-light text-gray-300">Nom</span>
                      <input
                        className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-black/35 px-4 text-base font-light text-white outline-none transition-colors placeholder:text-gray-600 focus:border-white/60"
                        name="name"
                        placeholder="Votre nom"
                        required
                        type="text"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-light text-gray-300">Téléphone / WhatsApp</span>
                      <input
                        className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-black/35 px-4 text-base font-light text-white outline-none transition-colors placeholder:text-gray-600 focus:border-white/60"
                        name="phone"
                        placeholder="Votre numéro"
                        required
                        type="tel"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-light text-gray-300">Email</span>
                      <input
                        className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-black/35 px-4 text-base font-light text-white outline-none transition-colors placeholder:text-gray-600 focus:border-white/60"
                        name="email"
                        placeholder="votre@email.com"
                        required
                        type="email"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-light text-gray-300">Type de projet</span>
                      <input
                        className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-black/35 px-4 text-base font-light text-white outline-none transition-colors placeholder:text-gray-600 focus:border-white/60"
                        name="projectType"
                        placeholder="Villa, immeuble, rénovation..."
                        type="text"
                      />
                    </label>
                  </div>

                  <label className="mt-5 block">
                    <span className="text-sm font-light text-gray-300">Message</span>
                    <textarea
                      className="mt-2 min-h-44 w-full resize-y rounded-lg border border-white/15 bg-black/35 px-4 py-3 text-base font-light leading-relaxed text-white outline-none transition-colors placeholder:text-gray-600 focus:border-white/60"
                      name="message"
                      placeholder="Décrivez votre projet en quelques lignes."
                      required
                    />
                  </label>

                  <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-white px-7 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                      type="submit"
                    >
                      Envoyer ma demande
                      <Send aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                    </button>
                    <p className="max-w-sm text-sm font-light leading-relaxed text-gray-500">
                      L’envoi ouvrira votre application mail avec un message déjà préparé.
                    </p>
                  </div>
                </form>
              </div>

              <div className="mt-12 border-t border-white/10 pt-8 md:mt-16 md:pt-10">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Localisation</p>
                    <p className="mt-2 max-w-2xl text-base font-light leading-relaxed text-gray-300 md:text-lg">
                      Résidence Clarisse, Rue Mohamed El Bekal 115, Marrakech 40000
                    </p>
                  </div>
                  <a
                    className="inline-flex w-fit items-center gap-2 text-sm font-light text-white/80 transition-colors hover:text-white"
                    href="https://maps.google.com/?q=R%C3%A9sidence%20Clarisse%2C%20Rue%20Mohamed%20El%20Bekal%20115%2C%20Marrakech%2040000"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Ouvrir dans Google Maps
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.7} />
                  </a>
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/40">
                  <iframe
                    allowFullScreen
                    className="h-[22rem] w-full md:h-[28rem] lg:h-[32rem]"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.839013946406!2d-8.016635399999998!3d31.6382579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafeff9ace393a7%3A0xb3ba3f7ec3918ae2!2sAgence%20d%E2%80%99architecture%202AAZ%20-%20Architecte%20Marrakech!5e0!3m2!1sfr!2sma!4v1782669460302!5m2!1sfr!2sma"
                    style={{ border: 0 }}
                    title="Localisation de l'agence 2AAZ à Marrakech"
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      </div>

      <Footer />
    </main>
  );
}

export default App;
