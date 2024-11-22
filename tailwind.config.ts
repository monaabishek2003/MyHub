import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			brand: {
  				'100': '#EA6365',
  				DEFAULT: '#FA7275'
  			},
  			red: '#FF7474',
  			error: '#b80000',
  			green: '#3DD9B3',
  			blue: '#56B8FF',
  			pink: '#EEA8FD',
  			orange: '#F9AB72',
  			light: {
  				'100': '#333F4E',
  				'200': '#A3B2C7',
  				'300': '#F2F5F9',
  				'400': '#F2F4F8'
  			},
  			dark: {
  				'100': '#04050C',
  				'200': '#131524'
  			},
  			background: 'rgb(var(--background))',
  			foreground: 'rgb(var(--foreground))',
  			card: {
  				DEFAULT: 'rgb(var(--card))',
  				foreground: 'rgb(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'rgb(var(--popover))',
  				foreground: 'rgb(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'rgb(var(--primary))',
  				foreground: 'rgb(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'rgb(var(--secondary))',
  				foreground: 'rgb(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'rgb(var(--muted))',
  				foreground: 'rgb(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'rgb(var(--accent))',
  				foreground: 'rgb(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'rgb(var(--destructive))',
  				foreground: 'rgb(var(--destructive-foreground))'
  			},
  			border: 'rgb(var(--border))',
  			input: 'rgb(var(--input))',
  			ring: 'rgb(var(--ring))',
  			chart: {
  				'1': 'rgb(var(--chart-1))',
  				'2': 'rgb(var(--chart-2))',
  				'3': 'rgb(var(--chart-3))',
  				'4': 'rgb(var(--chart-4))',
  				'5': 'rgb(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			poppins: ['var(--font-poppins)']
  		},
  		boxShadow: {
  			'drop-1': '0px 10px 30px 0px rgba(66, 71, 97, 0.1)',
  			'drop-2': '0 8px 30px 0 rgba(65, 89, 214, 0.3)',
  			'drop-3': '0 8px 30px 0 rgba(65, 89, 214, 0.1)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'caret-blink': {
  				'0%,70%,100%': {
  					opacity: '1'
  				},
  				'20%,50%': {
  					opacity: '0'
  				}
  			}
  		},
  		animation: {
  			'caret-blink': 'caret-blink 1.25s ease-out infinite'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;