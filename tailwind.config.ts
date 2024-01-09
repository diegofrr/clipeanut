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
        'screen-minus-navbar': 'calc(100vh - 4rem)'
      },
      height: {
        nav: '4rem'
      },
      maxWidth: {
        'full-minus-2rem': 'calc(100% - 2rem)',
        'full-minus-3rem': 'calc(100% - 3rem)',
        'full-minus-4rem': 'calc(100% - 4rem)'
      },
      screens: {
        xxs: '420px',
        xs: '480px'
      }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
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
      }
    })
  ]
};
export default config;
