/** @type {import('tailwindcss').Config} */
import FlowbitePlugin from 'flowbite/plugin'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [FlowbitePlugin, 'prettier-plugin-tailwindcss', 'flowbite-typography']
}
