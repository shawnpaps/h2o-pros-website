/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'brand-red': '#E11D2A',
				'brand-red-dark': '#B4141F',
				ink: '#12161A',
				'ink-deep': '#0D1013',
				water: '#1E7FC2',
				'water-light': '#5CB4E6',
				star: '#F5A623',
				mist: '#F6F9FB',
				fog: '#EEF1F4',
				line: '#E9EDF1',
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
				card: '0 8px 30px rgb(13 16 19 / 0.08)',
				soft: '0 20px 50px -12px rgb(13 16 19 / 0.18)',
				lift: '0 30px 60px -15px rgb(13 16 19 / 0.25)',
			},
		},
	},
	plugins: [],
};
