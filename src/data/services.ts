export interface Service {
  /** Anchor id used on /our-services (e.g. #DrainandSewer) */
  id: string;
  title: string;
  blurb: string;
  bullets: string[];
  accent: 'red' | 'blue';
  featured?: boolean;
}

export const services: Service[] = [
  {
    id: 'DrainandSewer',
    title: 'Drain Cleaning & Hydro-Jetting',
    blurb:
      'Slow drains, recurring clogs, and root-invaded sewer lines cleared for good — from simple augering to high-pressure hydro-jetting that scours pipes back to like-new condition.',
    bullets: [
      'Kitchen, bath & floor drain clearing',
      'Camera inspections & line locating',
      'High-pressure hydro-jetting',
      'Sewer line cleaning & repair',
    ],
    accent: 'blue',
    featured: true,
  },
  {
    id: 'WaterHeater',
    title: 'Water Heater Services',
    blurb:
      'Repair, replacement, and installation of tank and tankless water heaters. We size the unit to your home, haul away the old one, and leave you with reliable hot water.',
    bullets: [
      'Tank & tankless installation',
      'Repairs & element replacement',
      'Annual flush & maintenance',
      'Upgrades & energy-efficiency advice',
    ],
    accent: 'red',
    featured: true,
  },
  {
    id: 'Filtration',
    title: 'Whole-Home Filtration & RO',
    blurb:
      'Softer skin, better-tasting water, and appliances that last longer. Whole-home carbon filtration, water softeners, and under-sink reverse-osmosis systems tailored to Tampa Bay water.',
    bullets: [
      'Free in-home water testing',
      'Whole-home carbon filtration',
      'Water softeners & conditioners',
      'Reverse-osmosis drinking systems',
    ],
    accent: 'blue',
    featured: true,
  },
  {
    id: 'LeakDetection',
    title: 'Leak Detection & Pipe Repair',
    blurb:
      'Mystery water bill? Warm spot on the floor? We pinpoint hidden leaks with electronic detection equipment and repair them with minimal disruption to your home.',
    bullets: [
      'Electronic & acoustic leak detection',
      'Slab leak location & repair',
      'Pipe repair & repiping',
      'Insurance-ready documentation',
    ],
    accent: 'red',
    featured: true,
  },
  {
    id: 'ResidentialPlumbing',
    title: 'Residential Plumbing',
    blurb:
      'Full-service plumbing for your home — faucets, toilets, garbage disposals, fixtures, shut-off valves, and everything in between, done right the first time.',
    bullets: [
      'Fixture installation & repair',
      'Toilets, faucets & disposals',
      'Shut-off valves & hose bibbs',
      'New-construction & remodel plumbing',
    ],
    accent: 'blue',
  },
  {
    id: 'GeneralPlumbing',
    title: 'General Plumbing',
    blurb:
      'The everyday fixes that keep your plumbing healthy: running toilets, dripping faucets, low water pressure, noisy pipes, and honest answers about what actually needs fixing.',
    bullets: [
      'Diagnostics & honest assessments',
      'Pressure problems & water hammer',
      'Small repairs & part replacement',
      'Code compliance & inspections',
    ],
    accent: 'red',
  },
  {
    id: 'Maintenance',
    title: 'Maintenance Plans',
    blurb:
      'Preventive care that catches small problems before they become floods. Annual inspections, water heater flushes, and priority scheduling for members.',
    bullets: [
      'Annual whole-home plumbing inspection',
      'Water heater flush included',
      'Priority scheduling & member pricing',
      'Filter replacement reminders',
    ],
    accent: 'blue',
  },
  {
    id: 'Specialty',
    title: 'Specialty Services',
    blurb:
      'The jobs other plumbers pass on — gas line work, well systems, backflow testing, and custom installations that call for a pro with the right license and experience.',
    bullets: [
      'Backflow testing & certification',
      'Well pump & tank service',
      'Gas line installation & repair',
      'Custom & specialty installs',
    ],
    accent: 'red',
  },
  {
    id: 'EmergencyPlumbing',
    title: 'Emergency Plumbing — 24/7',
    blurb:
      'Burst pipe at 2am? Water heater flooding the garage? Call any time — a real person answers, and we dispatch fast across all five counties we serve.',
    bullets: [
      'True 24/7 emergency dispatch',
      'Burst pipes & major leaks',
      'Sewer backups',
      'Emergency shut-off & mitigation',
    ],
    accent: 'red',
  },
];

export const featuredServices = services.filter((s) => s.featured);

/** Chip row shown under the home-page services grid. */
export const serviceCategories = [
  { label: 'Residential', id: 'ResidentialPlumbing' },
  { label: 'General', id: 'GeneralPlumbing' },
  { label: 'Maintenance', id: 'Maintenance' },
  { label: 'Specialty', id: 'Specialty' },
  { label: 'Emergency 24/7', id: 'EmergencyPlumbing' },
] as const;
