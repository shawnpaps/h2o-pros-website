export interface Location {
	/** URL slug under /locations/ (e.g. "wesley-chapel") */
	slug: string;
	city: string;
	county: string;
	/** Localized paragraph under the hero headline. */
	intro: string;
	/** Nearby communities listed in the hero. */
	nearby: string[];
	metaDescription: string;
	heroImageUrl?: string;
}

export const locations: Location[] = [
	{
		slug: 'tampa',
		city: 'Tampa',
		county: 'Hillsborough',
		intro:
			'From Seminole Heights bungalows to Westshore high-rises, Tampa plumbing has its quirks — cast-iron drains, slab foundations, and some of the hardest water in Florida. We handle all of it with upfront pricing and a truck that’s never far away.',
		nearby: [
			'South Tampa',
			'Carrollwood',
			'Westchase',
			'New Tampa',
			"Town 'n' Country",
		],
		metaDescription:
			'Licensed Tampa plumber for drain cleaning, water heaters, leak detection & whole-home water filtration. Upfront pricing and tidy service in Tampa, FL.',
	},
	{
		slug: 'brandon',
		city: 'Brandon',
		county: 'Hillsborough',
		intro:
			'Brandon homes work hard — busy families, aging water heaters, and mineral-heavy water that scales up fixtures fast. We keep it all running with honest diagnostics, tidy work, and same-day service when you need it.',
		nearby: ['Seffner', 'Mango', 'Bloomingdale', 'Limona', 'Palm River'],
		metaDescription:
			'Licensed Brandon plumber for drain cleaning, water heaters, leak detection & water filtration. Upfront pricing and tidy service in Brandon, FL.',
	},
	{
		slug: 'riverview',
		city: 'Riverview',
		county: 'Hillsborough',
		intro:
			'Riverview is growing fast, and so are its plumbing needs — new-construction punch lists, builder-grade water heaters due for an upgrade, and well-known hard-water headaches. We’re already in your neighborhood.',
		nearby: [
			'Gibsonton',
			'Apollo Beach',
			'Boyette',
			'Summerfield',
			'Progress Village',
		],
		metaDescription:
			'Licensed Riverview plumber for drain cleaning, water heaters, leak detection & water filtration. Upfront pricing and tidy service in Riverview, FL.',
	},
	{
		slug: 'valrico',
		city: 'Valrico',
		county: 'Hillsborough',
		intro:
			'From Bloomingdale to Buckhorn, Valrico homeowners call us for the everyday fixes and the big projects alike — softeners for stubborn hard water, water heater swaps, and drains that finally stay clear.',
		nearby: ['Bloomingdale', 'FishHawk', 'Buckhorn', 'Durant', 'Dover'],
		metaDescription:
			'Licensed Valrico plumber for drain cleaning, water heaters, leak detection & water filtration. Upfront pricing and tidy service in Valrico, FL.',
	},
	{
		slug: 'lakeland',
		city: 'Lakeland',
		county: 'Polk',
		intro:
			'Between historic Dixieland cottages and brand-new builds off the Parkway, Lakeland plumbing spans a century of pipe. We service all of it — and Polk County’s famously hard water is exactly what our filtration systems were built for.',
		nearby: ['Auburndale', 'Mulberry', 'Polk City', 'Highland City', 'Kathleen'],
		metaDescription:
			'Licensed Lakeland plumber for drain cleaning, water heaters, leak detection & water filtration. Upfront pricing and tidy service in Lakeland, FL.',
	},
	{
		slug: 'ocala',
		city: 'Ocala',
		county: 'Marion',
		intro:
			'Horse country runs on wells, softeners, and dependable pressure. From downtown Ocala to the farms outside town, we handle well systems, filtration, and every plumbing repair in between.',
		nearby: [
			'Silver Springs',
			'Belleview',
			'Marion Oaks',
			'Dunnellon',
			'Anthony',
		],
		metaDescription:
			'Licensed Ocala plumber for drain cleaning, water heaters, well systems, leak detection & water filtration. Upfront pricing and tidy service in Ocala, FL.',
	},
	{
		slug: 'wesley-chapel',
		city: 'Wesley Chapel',
		county: 'Pasco',
		intro:
			'Wesley Chapel’s newer homes still hit plumbing trouble — builder-grade fixtures wearing out, tankless heaters due for service, and Pasco County water that eats appliances without a softener. We fix it right the first time.',
		nearby: ['Lutz', "Land O' Lakes", 'New Tampa', 'Zephyrhills', 'San Antonio'],
		metaDescription:
			'Licensed Wesley Chapel plumber for drain cleaning, water heaters, leak detection & water filtration. Upfront pricing and tidy service in Wesley Chapel, FL.',
	},
	{
		slug: 'plant-city',
		city: 'Plant City',
		county: 'Hillsborough',
		intro:
			'Strawberry capital, hard-water capital. Plant City homes — from historic downtown to acreage on the edge of town — count on us for drains, water heaters, wells, and filtration that makes the water taste as good as it should.',
		nearby: ['Dover', 'Seffner', 'Turkey Creek', 'Knights', 'Cork'],
		metaDescription:
			'Licensed Plant City plumber for drain cleaning, water heaters, leak detection & water filtration. Upfront pricing and tidy service in Plant City, FL.',
	},
];
