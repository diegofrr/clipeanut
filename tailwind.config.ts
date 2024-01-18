import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      zIndex: {
        max: '9999999'
      },
      minHeight: {
        'screen-minus-navbar': 'calc(100vh - 64px)'
      },
      height: {
        nav: '4rem'
      },
      maxWidth: {
        'full-minus-2rem': 'calc(100% - 2rem)',
        'full-minus-3rem': 'calc(100% - 3rem)',
        'full-minus-4rem': 'calc(100% - 4rem)',
        '8xl': '90rem',
        '9xl': '96rem'
      },
      screens: {
        xxs: '420px',
        xs: '480px'
      },
      colors: {
        app_orange: {
          50: '#FDF0D8',
          100: '#FCE9C5',
          150: '#FBE1B1',
          200: '#FADA9E',
          250: '#F9D28B',
          300: '#F8CB77',
          350: '#F7C364',
          400: '#F6BC51',
          450: '#F5B53D',
          500: '#F4AD2A',
          550: '#F3A616',
          600: '#E99B0C',
          650: '#D58E0B',
          700: '#C2820A',
          750: '#AE7509',
          800: '#9B6808',
          850: '#885B07',
          900: '#744E06'
        },
        purple: {
          '50': '#f5f5fa',
          '100': '#eaeaf4',
          '200': '#d0d1e7',
          '300': '#a7aad2',
          '400': '#787eb8',
          '500': '#575da0',
          '600': '#444885',
          '700': '#383b6c',
          '800': '#31335b',
          '900': '#2d2e4d',
          '950': '#0b0b13'
        }
      }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      addCommonColors: true,
      layout: {
        radius: {
          small: '4px',
          medium: '6px',
          large: '8px'
        },
        borderWidth: {
          small: '1px',
          medium: '1px',
          large: '2px'
        }
      },
      themes: {
        dark: {
          colors: {
            focus: '#F4AD2A'
          }
        },

        light: {
          colors: {
            focus: '#F4AD2A'
          }
        }
      }
    })
  ]
};
export default config;
