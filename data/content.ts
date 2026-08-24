/**
 * All page copy. Verbatim from the handoff component specs — the lowercase
 * "want" and the period after "Producers." in the headline are intentional, as
 * are the em dashes and the typographic quote marks wrapping each testimonial.
 */

export const ROTATING_WORDS = ['beats', 'packs', 'mixing', 'promo', 'anything'] as const;

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
] as const;

export type HeroStat = {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
  /** Caps the description so it breaks where the design breaks it. */
  descriptionMaxWidth: number;
  /** Reveal stagger — the stats ride up as zeros with the hero text. */
  revealDelay: number;
};

export const HERO_STATS: HeroStat[] = [
  {
    target: 10000,
    suffix: '+',
    label: 'producers',
    description: 'taught to become entrepreneurs.',
    descriptionMaxWidth: 260,
    revealDelay: 460,
  },
  {
    target: 340000,
    prefix: '$',
    label: 'beat sales',
    description: "just what we can track — and doesn't include us. Just our students.",
    descriptionMaxWidth: 270,
    revealDelay: 580,
  },
  {
    target: 2,
    label: 'friends',
    description:
      'Anno Domini and Legion Gabe did the impossible — well over $1M each selling beats. And taught a generation how we did it.',
    descriptionMaxWidth: 300,
    revealDelay: 700,
  },
];

export const CONVERSION_METRICS = [
  {
    metric: '+22.3%',
    accent: true,
    // Non-breaking space in "Apple Pay" is deliberate.
    caption: 'checkout conversion with one-tap Apple Pay',
    delay: 0,
  },
  {
    metric: '65%',
    accent: false,
    caption: 'faster than typing out a full card number',
    delay: 120,
  },
  {
    metric: '$0',
    accent: false,
    caption: 'commission on every single sale you make',
    delay: 240,
  },
] as const;

export const STEPS = [
  {
    numeral: '01',
    accent: false,
    title: 'Upload beat',
    body: 'Drop your audio file. We auto-detect BPM, key, and generate tags in seconds.',
    delay: 0,
  },
  {
    numeral: '02',
    accent: false,
    title: 'Publish',
    body: 'Your beat goes live as a video and a store listing. Checkout link placed automatically.',
    delay: 120,
  },
  {
    // Green-tinted and brighter than the other two — it marks the payoff.
    numeral: '03',
    accent: true,
    title: 'Get paid',
    body: 'Artists buy with Apple Pay, Google Pay, or PayPal. Money hits your account instantly.',
    delay: 240,
  },
] as const;

export const TESTIMONIALS = [
  {
    text: '“I never thought I’d be this satisfied with a platform. It saves me so much time I can just make music.”',
    name: 'SickoBeats',
    role: 'Producer',
    initial: 'S',
    delay: 0,
  },
  {
    text: '“Exactly what I’ve been looking for. Auto-detection for BPM, key, and the AI features are unreal.”',
    name: 'Syre',
    role: 'Producer',
    // "Y", not "S" — carried over from the design as-is. Flagged to the designer.
    initial: 'Y',
    delay: 120,
  },
  {
    text: '“Visually intuitive and incredibly efficient. Connecting multiple channels streamlined my whole workflow.”',
    name: 'Drobbeat',
    role: 'Producer',
    initial: 'D',
    delay: 240,
  },
] as const;

export type PricingTier = {
  name: string;
  price: string;
  period: string;
  tagline: string;
  cta: { label: string; href: string };
  features: string[];
  highlighted: boolean;
  badge?: string;
  delay: number;
};

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    period: '/forever',
    tagline: 'Start selling today.',
    cta: { label: 'Start Free', href: '#top' },
    features: [
      'Unlimited MP3 uploads',
      '1 connected channel',
      'Beat store + storefront',
      '0% commission on sales',
    ],
    highlighted: false,
    delay: 0,
  },
  {
    name: 'Pro',
    price: '$17',
    period: '/mo',
    tagline: 'For producers serious about growth.',
    cta: { label: 'Start Free Trial', href: '#top' },
    features: [
      'MP3, WAV & stems uploads',
      '2 connected channels',
      'Scheduled uploads',
      'Basic CRM + contracts',
    ],
    highlighted: true,
    badge: 'Most popular',
    delay: 120,
  },
  {
    name: 'Ultimate',
    price: '$37',
    period: '/mo',
    tagline: 'No ceiling on growth.',
    cta: { label: 'Start Free Trial', href: '#top' },
    features: [
      'Everything in Pro',
      'Unlimited channels',
      'Advanced CRM + analytics',
      'Priority support',
    ],
    highlighted: false,
    delay: 240,
  },
];

export const FAQS = [
  {
    question: 'Do you take commission on my sales?',
    answer:
      'No. We charge 0% commission — you keep every dollar. The only fee is your processor’s standard rate (2.9% + $0.30), which applies on any platform. We make money from optional subscriptions, not your revenue.',
  },
  {
    question: 'Do I need a connected channel?',
    answer:
      'A channel unlocks auto-publishing, but you can run a standalone beat store without one. You can connect or disconnect channels anytime from your dashboard.',
  },
  {
    question: 'Can I schedule uploads?',
    answer:
      'Yes — on Pro and Ultimate you can queue and schedule uploads in advance so your catalog goes live on a steady cadence without manual work.',
  },
  {
    question: 'What payment methods do you support?',
    answer:
      'Apple Pay, Google Pay, PayPal, and every major card, plus regional methods like iDEAL, SEPA, and more — whatever converts best for your buyer.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Absolutely. Plans are month-to-month with no lock-in. Cancel from your billing page and you keep access through the end of your current period.',
  },
  {
    question: 'Is switching from another platform worth it?',
    answer:
      'Most producers migrate their catalog in an afternoon and start converting better the same week thanks to faster checkout and 0% commission.',
  },
] as const;

export const FOOTER_LINK_GROUPS = [
  {
    heading: 'Links',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Sign up', href: '#top' },
    ],
  },
  {
    heading: 'Legal',
    // Placeholders — wire to real routes before launch.
    links: [
      { label: 'Terms of Service', href: '#top' },
      { label: 'Privacy Policy', href: '#top' },
      { label: 'Refund Policy', href: '#top' },
    ],
  },
] as const;
