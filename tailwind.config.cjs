module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			green: '#0B6E4F',
			blush: '#EEE5E9',
			orange: '#F19A3E',
			blue: '#212738'
		},
		screens: {
			m2xl: { max: '1535px' },
			// => @media (max-width: 1535px) { ... }

			mxl: { max: '1279px' },
			// => @media (max-width: 1279px) { ... }

			mlg: { max: '1023px' },
			// => @media (max-width: 1023px) { ... }

			mmd: { max: '767px' },
			// => @media (max-width: 767px) { ... }

			msm: { max: '639px' }
			// => @media (max-width: 639px) { ... }
		},
		fontFamily: { sans: ['neue-haas-grotesk-display'], mono: ['IBM Plex Mono'] }
	},
	plugins: []
};
