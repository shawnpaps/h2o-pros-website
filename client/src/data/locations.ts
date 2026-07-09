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
	{
		slug: 'lutz',
		city: 'Lutz',
		county: 'Hillsborough',
		intro:
			'Lutz mixes lakefront homes on wells with newer neighborhoods on city water — and both come with their own plumbing headaches. From softeners and well systems to water heaters and stubborn drains, we cover all of it with upfront pricing.',
		nearby: ["Land O' Lakes", 'Wesley Chapel', 'Carrollwood', 'Odessa', 'Cheval'],
		metaDescription:
			'Licensed Lutz plumber for drain cleaning, water heaters, leak detection & water filtration. Upfront pricing and tidy service in Lutz, FL.',
	},
	{
		slug: 'land-o-lakes',
		city: "Land O' Lakes",
		county: 'Pasco',
		intro:
			"Land O' Lakes is booming, and Pasco County's hard water doesn't spare the new builds. We handle builder-grade fixture swaps, tankless heater service, whole-home filtration, and every drain and leak call in between.",
		nearby: ['Lutz', 'Wesley Chapel', 'Odessa', 'Connerton', 'Trinity'],
		metaDescription:
			"Licensed Land O' Lakes plumber for drain cleaning, water heaters, leak detection & water filtration. Upfront pricing and tidy service in Land O' Lakes, FL.",
	},
	{
		slug: 'brooksville',
		city: 'Brooksville',
		county: 'Hernando',
		intro:
			'From historic homes near the courthouse to acreage properties on wells, Brooksville plumbing runs the gamut. We service well systems, softeners, water heaters, and drains across Hernando County — with honest diagnostics every time.',
		nearby: ['Spring Hill', 'Weeki Wachee', 'Masaryktown', 'Ridge Manor', 'Brookridge'],
		metaDescription:
			'Licensed Brooksville plumber for drain cleaning, water heaters, well systems, leak detection & water filtration. Upfront pricing and tidy service in Brooksville, FL.',
	},
	{
		slug: 'spring-hill',
		city: 'Spring Hill',
		county: 'Hernando',
		intro:
			'Spring Hill homes from the ’80s and ’90s are hitting the age where water heaters, valves, and drain lines start acting up — and Hernando County’s mineral-heavy water speeds it all along. We fix it right, with pricing you approve first.',
		nearby: ['Brooksville', 'Weeki Wachee', 'Hernando Beach', 'Timber Pines', 'Hudson'],
		metaDescription:
			'Licensed Spring Hill plumber for drain cleaning, water heaters, leak detection & water filtration. Upfront pricing and tidy service in Spring Hill, FL.',
	},
	{
		slug: 'crystal-river',
		city: 'Crystal River',
		county: 'Citrus',
		intro:
			'Life on the Nature Coast means wells, softeners, and plumbing that has to stand up to the elements. From downtown Crystal River to waterfront homes along the bay, we handle filtration, water heaters, and every repair in between.',
		nearby: ['Homosassa', 'Lecanto', 'Beverly Hills', 'Dunnellon', 'Inverness'],
		metaDescription:
			'Licensed Crystal River plumber for drain cleaning, water heaters, well systems, leak detection & water filtration. Upfront pricing and tidy service in Crystal River, FL.',
	},
	{
		slug: 'inverness',
		city: 'Inverness',
		county: 'Citrus',
		intro:
			'From lakefront homes on the Tsala Apopka chain to quiet streets downtown, Inverness counts on wells and aging pipes that need a plumber who knows both. We cover well systems, filtration, water heaters, drains, and leaks across Citrus County.',
		nearby: ['Hernando', 'Lecanto', 'Floral City', 'Citrus Hills', 'Crystal River'],
		metaDescription:
			'Licensed Inverness plumber for drain cleaning, water heaters, well systems, leak detection & water filtration. Upfront pricing and tidy service in Inverness, FL.',
	},
	{
		slug: 'the-villages',
		city: 'The Villages',
		county: 'Sumter',
		intro:
			'The Villages runs on schedules — golf, pickleball, and plumbing that just works. We show up on time, explain the fix in plain English, and leave the work area cleaner than we found it. Softeners, water heaters, drains, and leaks handled.',
		nearby: ['Lady Lake', 'Fruitland Park', 'Wildwood', 'Summerfield', 'Oxford'],
		metaDescription:
			'Licensed plumber serving The Villages for drain cleaning, water heaters, leak detection & water filtration. Upfront pricing and tidy service in The Villages, FL.',
	},
	{
		slug: 'clermont',
		city: 'Clermont',
		county: 'Lake',
		intro:
			'Clermont’s hills are full of newer homes with builder-grade plumbing that’s ready for an upgrade — and Lake County water that scales up fixtures fast. From Four Corners to downtown, we handle filtration, water heaters, drains, and leaks.',
		nearby: ['Minneola', 'Groveland', 'Montverde', 'Four Corners', 'Winter Garden'],
		metaDescription:
			'Licensed Clermont plumber for drain cleaning, water heaters, leak detection & water filtration. Upfront pricing and tidy service in Clermont, FL.',
	},
	{
		slug: 'winter-haven',
		city: 'Winter Haven',
		county: 'Polk',
		intro:
			'Between the Chain of Lakes and Polk County’s famously hard water, Winter Haven plumbing takes a beating. We keep drains clear, water heaters humming, and filtration systems doing their job — from historic districts to brand-new builds.',
		nearby: ['Auburndale', 'Lake Alfred', 'Eagle Lake', 'Cypress Gardens', 'Dundee'],
		metaDescription:
			'Licensed Winter Haven plumber for drain cleaning, water heaters, leak detection & water filtration. Upfront pricing and tidy service in Winter Haven, FL.',
	},
	{
		slug: 'davenport',
		city: 'Davenport',
		county: 'Polk',
		intro:
			'Davenport’s explosion of new homes and vacation rentals means plumbing that has to work every day, no excuses. We serve homeowners and rental managers alike with fast turnarounds on water heaters, drains, leaks, and filtration.',
		nearby: ['ChampionsGate', 'Four Corners', 'Haines City', 'Loughman', 'Poinciana'],
		metaDescription:
			'Licensed Davenport plumber for drain cleaning, water heaters, leak detection & water filtration. Upfront pricing and tidy service in Davenport, FL.',
	},
	{
		slug: 'sebring',
		city: 'Sebring',
		county: 'Highlands',
		intro:
			'From homes on the circle downtown to lakefront properties around Lake Jackson, Sebring plumbing means hard water, aging pipes, and the occasional well system. We handle all of it with honest pricing and work that holds up.',
		nearby: ['Avon Park', 'Lake Placid', 'Lorida', 'Spring Lake', 'DeSoto City'],
		metaDescription:
			'Licensed Sebring plumber for drain cleaning, water heaters, leak detection & water filtration. Upfront pricing and tidy service in Sebring, FL.',
	},
	{
		slug: 'sarasota',
		city: 'Sarasota',
		county: 'Sarasota',
		intro:
			'Sarasota homes — from mid-century ranches near downtown to newer builds east of I-75 — deal with coastal corrosion, slab leaks, and water worth filtering. We bring upfront pricing and tidy workmanship to every call.',
		nearby: ['Lakewood Ranch', 'Bradenton', 'Siesta Key', 'Osprey', 'Fruitville'],
		metaDescription:
			'Licensed Sarasota plumber for drain cleaning, water heaters, leak detection & water filtration. Upfront pricing and tidy service in Sarasota, FL.',
	},
];
