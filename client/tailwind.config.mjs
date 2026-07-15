/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				// Dark-first palette pulled from the H2O Pros logo: black field,
				// vivid web-red, cobalt water drops, copper pipes.
				'brand-red': '#E8232F',
				'brand-red-dark': '#B5121D',
				ink: '#E9EEF5', // primary text on dark surfaces
				'ink-deep': '#080A0F', // page base / heroes / footer
				water: '#3D7BEE',
				'water-light': '#8FB5FA',
				star: '#F5A623',
				copper: '#C9803F',
				mist: '#0F141C', // raised section background
				fog: '#1C2432', // cards, chips, panels
				line: '#303A4B',
			},
			fontFamily: {
				heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
				sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
			},
			borderRadius: {
				btn: '11px',
				card: '16px',
				panel: '22px',
			},
			boxShadow: {
				card: '0 8px 30px rgb(0 0 0 / 0.4)',
				soft: '0 20px 50px -12px rgb(0 0 0 / 0.55)',
				lift: '0 30px 60px -15px rgb(0 0 0 / 0.65)',
			},
		},
	},
	plugins: [],
};
