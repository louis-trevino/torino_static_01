// All site copy lives here so it can be edited without touching components.
import { GA4_MEASUREMENT_ID, LINKEDIN_PARTNER_ID } from './config'

export const company = {
  name: 'Torino Consulting',
  slogan: 'Smart Solutions for Today and Tomorrow',
  email: 'torinoconsulting@proton.me',
}

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'why-us', label: 'Why Us' },
  { id: 'contact', label: 'Contact' },
]

export const hero = {
  eyebrow: 'Technology Consulting',
  title: 'Smart Solutions for Today and Tomorrow',
  intro:
    'We accelerate digital transformation by designing and deploying high-performance IT solutions powered by microservices and cloud-native technologies.',
  detail:
    'Our consulting firm helps businesses break down rigid legacy systems into agile, scalable, and secure infrastructures that drive innovation.',
}

// Messages for the six interactive nodes of the hero logo, clockwise from the top node.
export const logoNodes = [
  {
    title: 'RAG Pipelines',
    text: 'Find accurate answers for your organization using your Private Knowledge Base',
  },
  {
    title: 'Agentic AI Apps',
    text: 'Autonomous AI Agents that can handle the vast majority of your routine operations',
  },
  {
    title: 'Human-in-the-Loop Safeguards',
    text: 'Combines AI autonomy with defined human approval boundaries that enforce your business rules',
  },
  {
    title: 'Agentic Research Engines',
    text: 'Get complex research results (e.g. market research) delivered to your inbox',
  },
  {
    title: 'Agentic Telephony Apps',
    text: 'A phone call comes in; a structured, documented resolution comes out',
  },
  {
    title: 'Microservice Integration',
    text: 'Agentic AI apps that can leverage your existing microservices',
  },
]

export const services = [
  {
    icon: 'bi-robot',
    title: 'Agentic AI Solutions',
    text: 'Design and implement Autonomous Workflows driven by smart AI Agents according to your business needs.',
  },
  {
    icon: 'bi-diagram-3',
    title: 'Microservices Architecture',
    text: 'We design decoupled, independent services to improve system resilience and speed up feature deployment.',
  },
  {
    icon: 'bi-cloud-check',
    title: 'Cloud-Native Engineering',
    text: 'We build and migrate applications seamlessly across AWS, Azure, and Google Cloud Platform.',
  },
  {
    icon: 'bi-arrow-repeat',
    title: 'System Modernization',
    text: 'We transition your monolithic applications into cloud-optimized ecosystems without interrupting daily operations.',
  },
]

export const benefits = [
  {
    icon: 'bi-shield-check',
    title: 'Zero Downtime',
    text: 'High-availability designs ensure your services stay online during upgrades.',
  },
  {
    icon: 'bi-graph-down-arrow',
    title: 'Cost Efficiency',
    text: 'Cloud-optimization strategies reduce infrastructure waste and lower operational overhead.',
  },
  {
    icon: 'bi-rocket-takeoff',
    title: 'Future-Proof Tech',
    text: 'Modular engineering allows your software to evolve as fast as your market demands.',
  },
]

export const contact = {
  title: 'Contact Us',
  intro: "Tell us about your project and we'll get back to you within one business day.",
}

// Client logos shown under the hero. Files live in public/img/clients/.
// The section is hidden when this list is empty.
// TODO: the entries below are placeholders; replace with real clients (with their permission) before going live.
export const clients = [
  { name: 'Client One', logo: 'img/clients/client-1.svg' },
  { name: 'Client Two', logo: 'img/clients/client-2.svg' },
  { name: 'Client Three', logo: 'img/clients/client-3.svg' },
  { name: 'Client Four', logo: 'img/clients/client-4.svg' },
  { name: 'Client Five', logo: 'img/clients/client-5.svg' },
  { name: 'Client Six', logo: 'img/clients/client-6.svg' },
]

// `items` lists what is actually stored in each category; it feeds the Cookie Policy table.
export const cookieCategories = [
  {
    key: 'necessary',
    title: 'Strictly Necessary',
    text: 'Required for the site to work, such as remembering your cookie choices. These cannot be turned off.',
    required: true,
    items: [
      {
        name: 'torino_cookie_consent',
        provider: 'Torino Consulting (local storage)',
        purpose: 'Remembers your cookie choices.',
        duration: 'Until you change them or clear your browser data',
      },
    ],
  },
  {
    key: 'functionality',
    title: 'Functionality',
    text: 'Remember preferences and choices you make to provide enhanced, more personal features.',
    items: [],
  },
  {
    key: 'performance',
    title: 'Performance',
    text: 'Help us understand how visitors use the site (aggregate usage statistics) so we can improve it.',
    items: GA4_MEASUREMENT_ID
      ? [
          {
            name: '_ga, _ga_*',
            provider: 'Google Analytics',
            purpose: 'Distinguishes visitors and sessions to produce aggregate usage statistics.',
            duration: 'Up to 2 years',
          },
        ]
      : [],
  },
  {
    key: 'marketing',
    title: 'Marketing',
    text: 'Used to deliver relevant content and measure the effectiveness of our campaigns.',
    items: LINKEDIN_PARTNER_ID
      ? [
          {
            name: 'li_fat_id, li_giant, _li_dcdm_c',
            provider: 'LinkedIn Insight Tag',
            purpose: 'Measures the effectiveness of our LinkedIn campaigns and builds audiences.',
            duration: 'Session up to 30 days',
          },
        ]
      : [],
  },
]
