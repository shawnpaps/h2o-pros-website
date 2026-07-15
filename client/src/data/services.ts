export interface ServiceStep {
  title: string;
  description: string;
}

export interface ServiceStat {
  value: string;
  label: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  /** Anchor id used on /our-services (e.g. #DrainandSewer) */
  id: string;
  /** URL slug for the service detail page (e.g. /services/water-heaters) */
  slug: string;
  title: string;
  blurb: string;
  bullets: string[];
  accent: 'red' | 'blue';
  featured?: boolean;
  /** Short display name for the home showcase's giant title (falls back to title). */
  showcaseTitle?: string;
  showcaseBadge?: string;
  showcaseImageUrl?: string;
  detailImageUrl?: string;
  /** Punchy first line of the detail-page hero (falls back to title). */
  heroHeadline?: string;
  /** "Sound familiar?" symptom checklist on the detail page. */
  signs: string[];
  /** "How it works" process timeline on the detail page. */
  steps: ServiceStep[];
  /** Proof stats shown on the detail page. */
  stats: ServiceStat[];
  /** Service-specific FAQs on the detail page. */
  faqs: ServiceFaq[];
}

export const services: Service[] = [
  {
    id: 'DrainandSewer',
    slug: 'drain-cleaning-hydro-jetting',
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
    showcaseTitle: 'Drains & Sewer',
    heroHeadline: 'Clogs cleared. For good.',
    signs: [
      'Water pools around your feet in the shower',
      'Gurgling sounds from drains or the toilet',
      'The same clog keeps coming back',
      'A sewage smell in the yard or the house',
      'More than one fixture backing up at once',
    ],
    steps: [
      {
        title: 'Camera first',
        description:
          'We run an HD camera down the line and locate the blockage exactly — roots, grease, scale, or a broken pipe. No guessing, no unnecessary digging.',
      },
      {
        title: 'Clear it the right way',
        description:
          'Simple clogs get augered. Grease, roots, and years of buildup get high-pressure hydro-jetting that scours the pipe wall back to full diameter.',
      },
      {
        title: 'Prove it',
        description:
          'We run the camera again so you can see the clean line with your own eyes before we pack up the truck.',
      },
      {
        title: 'Keep it that way',
        description:
          'You get straight advice on what caused it and how to keep it from coming back — including maintenance jetting if your line needs it.',
      },
    ],
    stats: [
      { value: '4000 PSI', label: 'Hydro-jetting scours pipes to like-new' },
      { value: 'HD', label: 'Camera inspection before & after' },
      { value: '1 visit', label: 'Most clogs cleared the same day' },
    ],
    faqs: [
      {
        question: "What's the difference between snaking and hydro-jetting?",
        answer:
          'A snake punches a hole through the clog — quick, but the buildup on the pipe walls stays and catches debris again. Hydro-jetting blasts the entire pipe wall clean with high-pressure water, removing grease, roots, and scale so the line flows like new.',
      },
      {
        question: 'Will hydro-jetting damage my pipes?',
        answer:
          "That's exactly why we camera the line first. If your pipe is too old or fragile for jetting, we'll show you the footage, tell you honestly, and recommend the safer fix.",
      },
      {
        question: 'Why does my clog keep coming back?',
        answer:
          "A recurring clog almost always means the root cause was never fixed — a bellied line, root intrusion, or buildup that was punched through instead of removed. Our camera finds the real problem so we can fix it once.",
      },
    ],
  },
  {
    id: 'WaterHeater',
    slug: 'water-heaters',
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
    showcaseTitle: 'Water Heaters',
    heroHeadline: 'Hot water, without the drama.',
    signs: [
      'Hot water runs out faster than it used to',
      'Rusty or rotten-egg-smelling hot water',
      'Popping or rumbling sounds from the tank',
      'Water pooling around the base of the unit',
      'The heater is pushing 10 years or older',
    ],
    steps: [
      {
        title: 'Assess & size',
        description:
          "We look at how your household actually uses hot water — showers, laundry, tank vs. tankless, gas vs. electric — and size the unit to your home, not a sales quota.",
      },
      {
        title: 'One flat-rate quote',
        description:
          'You approve the exact price before any work starts. No hourly meter running, no surprise line items when the job is done.',
      },
      {
        title: 'Install & haul away',
        description:
          'Installed to code with permits handled, connections tested, and your old unit hauled off the property the same day.',
      },
      {
        title: 'Walkthrough',
        description:
          'We set the temperature, show you the shut-off, and leave you a simple maintenance schedule so the new unit lasts as long as it should.',
      },
    ],
    stats: [
      { value: 'Same-day', label: 'Replacement in most cases' },
      { value: '2×', label: 'Longer tank life with an annual flush' },
      { value: 'Flat Rate', label: 'Pricing — you approve before we start' },
    ],
    faqs: [
      {
        question: 'Tank or tankless — which should I get?',
        answer:
          "Tankless gives you endless hot water and a smaller footprint but costs more up front; a quality tank is cheaper to install and simpler to service. We'll size both options for your home and give you a straight comparison — the right answer depends on your household, not ours.",
      },
      {
        question: 'How long does a replacement take?',
        answer:
          'A like-for-like tank swap is usually done in a few hours. Converting to tankless or relocating the unit takes longer — we tell you exactly what to expect when we quote it.',
      },
      {
        question: 'Should I repair or replace my water heater?',
        answer:
          "If the tank itself is leaking, replacement is the only real fix. For elements, thermostats, and valves on a younger unit, repair usually wins. We give you the honest math either way — we're happy doing the cheaper job if it's the right one.",
      },
    ],
  },
  {
    id: 'Filtration',
    slug: 'water-filtration',
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
    showcaseTitle: 'Filtration',
    heroHeadline: 'Tampa Bay water, fixed at the source.',
    signs: [
      'White scale crusting on faucets and shower glass',
      'Dry, itchy skin after every shower',
      'Water that tastes or smells like chlorine',
      'Appliances dying years before their time',
      'Spotty dishes straight out of the dishwasher',
    ],
    steps: [
      {
        title: 'Free in-home water test',
        description:
          'We test your water at your own tap — hardness, chlorine, TDS, and iron — and show you the numbers on the spot. No lab wait, no obligation.',
      },
      {
        title: 'A system built for your water',
        description:
          "City water and well water need different answers. We design around what's actually coming out of your tap — softener, carbon filtration, RO, or a combination.",
      },
      {
        title: 'Clean, professional install',
        description:
          'Mounted, plumbed, and programmed in about a day, with a bypass valve so you stay in control of your own plumbing.',
      },
      {
        title: 'Set-and-forget support',
        description:
          "We show you how it works, when filters are due, and send reminders so you never think about it again. That's the point.",
      },
    ],
    stats: [
      { value: 'Free', label: 'In-home water test, no strings' },
      { value: '99%', label: 'Of dissolved contaminants removed by RO' },
      { value: '1 day', label: 'Typical whole-home install' },
    ],
    faqs: [
      {
        question: "What's the difference between a softener and a filter?",
        answer:
          'A softener removes the calcium and magnesium that scale up your fixtures and appliances. A carbon filter removes chlorine, taste, and odor. RO polishes drinking water at the sink. Many Tampa Bay homes benefit from a combination — the water test tells us which.',
      },
      {
        question: 'Is Tampa Bay water really that hard?',
        answer:
          "Yes — much of our service area runs 15+ grains per gallon, which is firmly 'very hard.' It's why water heaters, dishwashers, and fixtures around here wear out faster than the national average.",
      },
      {
        question: 'How often do filters need changing?',
        answer:
          'Whole-home carbon media lasts years; RO filters are typically annual; softeners just need salt. We set you up with a simple schedule and reminders when anything is due.',
      },
    ],
  },
  {
    id: 'LeakDetection',
    slug: 'leak-detection',
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
    showcaseTitle: 'Leak Detection',
    heroHeadline: 'We find what you can’t see.',
    signs: [
      'The water bill jumped with no explanation',
      'A warm spot on the floor',
      'Running-water sounds when everything is off',
      'Musty smells or mildew that keeps returning',
      'The meter spins with every fixture closed',
    ],
    steps: [
      {
        title: 'Listen & scan',
        description:
          'Acoustic and electronic detection equipment traces the leak through slab, wall, or yard — no exploratory demolition, no tearing up rooms on a hunch.',
      },
      {
        title: 'Pinpoint the spot',
        description:
          'We mark the leak location precisely — typically within inches — so the repair opening is as small as possible.',
      },
      {
        title: 'Your repair options, straight',
        description:
          'Spot repair, reroute, or repipe: we lay out the honest pros, costs, and lifespan of each so you choose with full information.',
      },
      {
        title: 'Document everything',
        description:
          'Photos, location reports, and itemized invoices ready to hand to your insurance adjuster.',
      },
    ],
    stats: [
      { value: 'Inches', label: 'Typical pinpoint accuracy' },
      { value: '$0', label: 'Spent on guesswork demolition' },
      { value: '24 hr', label: 'A running toilet can waste 4,000 gallons' },
    ],
    faqs: [
      {
        question: 'How do I know if I have a slab leak?',
        answer:
          'The classic signs: a warm spot underfoot, an unexplained bill increase, the sound of water running with everything off, or the meter moving when no fixture is open. Any one of those is worth a call — slab leaks only get more expensive with time.',
      },
      {
        question: 'Will insurance cover the repair?',
        answer:
          "Policies vary, but many cover the damage a sudden leak causes and the access work to reach it. We provide the documentation adjusters ask for — photos, exact location, and itemized invoices — so your claim starts on solid footing.",
      },
      {
        question: 'Do you have to jackhammer my whole floor?',
        answer:
          "No — that's the whole point of electronic detection. We open the slab only at the marked spot, or route around the bad section entirely if a reroute makes more sense for your home.",
      },
    ],
  },
  {
    id: 'ResidentialPlumbing',
    slug: 'residential-plumbing',
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
    heroHeadline: 'Every fixture. Done right.',
    signs: [
      "A dripping faucet you've learned to ignore",
      'The toilet runs long after every flush',
      'The disposal hums but won’t spin',
      'Shut-off valves stuck, corroded, or missing',
      'A remodel that needs rough-in plumbing',
    ],
    steps: [
      {
        title: 'Honest diagnosis',
        description:
          "We look at the actual problem and tell you what it needs — and just as importantly, what it doesn't. No invented 'while we're here' upsells.",
      },
      {
        title: 'Flat-rate quote up front',
        description:
          'You see the full price and approve it before a wrench comes out of the truck.',
      },
      {
        title: 'Fixed right, the first time',
        description:
          'Quality parts, clean workmanship, and a work area left the way we found it — or better.',
      },
      {
        title: 'Guaranteed',
        description:
          'Every job is backed by our workmanship guarantee. If something we did isn’t right, we come back and make it right.',
      },
    ],
    stats: [
      { value: '1 trip', label: 'Most repairs finished the same visit' },
      { value: '100%', label: 'Workmanship guaranteed' },
      { value: 'Flat', label: 'Rate approved before work starts' },
    ],
    faqs: [
      {
        question: 'Do you charge to come out and look?',
        answer:
          "We'll talk through the problem when you call and give you a flat-rate quote on site before any work begins — so you always know the full price before you commit to anything.",
      },
      {
        question: 'Can you match my existing fixtures?',
        answer:
          'Usually, yes. We work with all the major brands and can source matching or better-quality replacements — and if a part is discontinued, we’ll show you the closest options before ordering.',
      },
      {
        question: 'Do you handle remodels and new construction?',
        answer:
          'Yes — rough-in through finish. We coordinate with your contractor, pull the right permits, and make sure everything passes inspection the first time.',
      },
    ],
  },
  {
    id: 'GeneralPlumbing',
    slug: 'general-plumbing',
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
    heroHeadline: 'Small problems, taken seriously.',
    signs: [
      'Water pressure that fades at the worst moment',
      'Pipes that bang when a faucet shuts off',
      'A toilet that needs the handle jiggled',
      'Slow drips you keep meaning to deal with',
      'You want a straight answer, not a sales pitch',
    ],
    steps: [
      {
        title: 'Tell us what you’re seeing',
        description:
          'Describe the symptom — the noise, the drip, the pressure drop. Odds are we’ve chased it a hundred times before.',
      },
      {
        title: 'Real diagnostics',
        description:
          'We find the actual cause instead of treating the symptom, and we show you what we found in plain English.',
      },
      {
        title: 'Fix what needs fixing',
        description:
          "Then we stop. If something can safely wait, we'll tell you that too — with a heads-up on what to watch for.",
      },
    ],
    stats: [
      { value: '0', label: 'Jargon-filled scare quotes' },
      { value: '100%', label: 'Workmanship guaranteed' },
      { value: '8–5', label: 'Monday–Friday, a real person answers' },
    ],
    faqs: [
      {
        question: 'Is a small drip really worth a service call?',
        answer:
          'A single dripping faucet can waste thousands of gallons a year, and small leaks have a habit of becoming big ones inside walls. If you’re on the fence, call — we’ll tell you honestly whether it can wait.',
      },
      {
        question: 'Why is my water pressure low?',
        answer:
          'Could be a failing pressure regulator, sediment buildup, a partially closed valve, or a hidden leak. The fix ranges from a five-minute adjustment to a repair — the diagnosis tells us which, and you approve before we touch anything.',
      },
      {
        question: 'What is water hammer and is it serious?',
        answer:
          'That bang when a valve closes is a pressure shockwave in your pipes. Over time it stresses joints and fittings. It’s usually a straightforward fix — arrestors or securing loose pipe — and worth doing before something lets go.',
      },
    ],
  },
  {
    id: 'Maintenance',
    slug: 'maintenance-plans',
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
    heroHeadline: 'Catch it before it floods.',
    signs: [
      'Your water heater has never been flushed',
      "You're not sure where the main shut-off is",
      'Small leaks keep getting found too late',
      'The house is fifteen years old or more',
      'You’d rather plan repairs than panic about them',
    ],
    steps: [
      {
        title: 'Annual whole-home inspection',
        description:
          'Every fixture, valve, supply line, and drain checked once a year — the plumbing equivalent of an annual physical.',
      },
      {
        title: 'Water heater flush included',
        description:
          'Sediment is what kills tanks in Tampa Bay’s hard water. The annual flush that doubles tank life is built into the plan.',
      },
      {
        title: 'A plain-English report card',
        description:
          "What's healthy, what's wearing, and what to budget for — so nothing about your plumbing ever surprises you again.",
      },
      {
        title: 'Front-of-line treatment',
        description:
          'Members get priority scheduling and member pricing when something does come up. You call, you jump the queue.',
      },
    ],
    stats: [
      { value: '1×/yr', label: 'Whole-home inspection & flush' },
      { value: 'First', label: 'In line when you need service' },
      { value: 'Member', label: 'Pricing on every repair' },
    ],
    faqs: [
      {
        question: 'What does the annual inspection actually cover?',
        answer:
          'Supply lines, shut-off valves, toilets, faucets, drains, the water heater, visible piping, and water pressure — plus a flush of your water heater. You get a written rundown of anything wearing out before it fails.',
      },
      {
        question: 'Is a maintenance plan worth it for a newer home?',
        answer:
          "Newer homes have builder-grade parts that wear predictably — and Tampa Bay's hard water accelerates everything. Catching a $10 supply line before it lets go beats a flooded laundry room every time.",
      },
      {
        question: 'How does priority scheduling work?',
        answer:
          'When you call, members go to the front of the schedule — usually same or next day. For plumbing emergencies, that difference matters.',
      },
    ],
  },
  {
    id: 'Specialty',
    slug: 'specialty-services',
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
    heroHeadline: 'The jobs other plumbers pass on.',
    signs: [
      'Another plumber said “we don’t do that”',
      'Well water pressure dropping or sputtering',
      'A backflow certification notice in the mail',
      'A new gas range, dryer, or generator to hook up',
      'A custom install that needs real experience',
    ],
    steps: [
      {
        title: 'Scope it properly',
        description:
          'Specialty work fails when it’s underestimated. We assess the full job — access, materials, code requirements — before quoting.',
      },
      {
        title: 'Licenses & permits handled',
        description:
          'Gas work, backflow certification, and well systems each carry their own requirements. We hold the right licenses and pull the right permits.',
      },
      {
        title: 'Execute like it’s our own house',
        description:
          'Careful, code-compliant work with the documentation to prove it — because specialty jobs are exactly where corners must not be cut.',
      },
      {
        title: 'Certify & stand behind it',
        description:
          'Testing, certification paperwork, and our workmanship guarantee on everything we touch.',
      },
    ],
    stats: [
      { value: 'Licensed', label: 'For gas, backflow & well work' },
      { value: 'Yes', label: 'The answer to “can you even do this?”' },
      { value: '100%', label: 'Workmanship guaranteed' },
    ],
    faqs: [
      {
        question: 'Do you service well systems?',
        answer:
          'Yes — pumps, pressure tanks, switches, and the filtration that well water usually needs. A lot of our service area is on wells, and we treat them as first-class work, not an afterthought.',
      },
      {
        question: 'What is backflow testing and why am I being asked for it?',
        answer:
          'Backflow preventers keep contaminated water from siphoning back into the drinking supply, and many municipalities require an annual certified test. We test, certify, and file the paperwork.',
      },
      {
        question: 'Can you run a gas line for my range or generator?',
        answer:
          'Yes — new lines, extensions, and repairs, permitted and pressure-tested. Gas work is exactly the kind of job that should only ever be done by a licensed pro.',
      },
    ],
  },
];

export const featuredServices = services.filter((s) => s.featured);

/** Chip row shown under the home-page services grid. */
export const serviceCategories = [
  { label: 'Residential', id: 'ResidentialPlumbing' },
  { label: 'General', id: 'GeneralPlumbing' },
  { label: 'Maintenance', id: 'Maintenance' },
  { label: 'Specialty', id: 'Specialty' },
] as const;
