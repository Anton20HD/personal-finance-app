/** @type {import('tailwindcss').Config} */
export const content = ["./app/**/*.{js,jsx,ts,tsx}"];
export const presets = [require("nativewind/preset")];
export const theme = {
  extend: {
    colors: {
      primary: '#0B1525', // Du kan sätta en primary color här som du kan använda var som helst i koden senare.
      secondary: '#3A86FF',
      active: '#3A86FF',
      disabled: '#A0AEC0',
      positive: '#10B981',
      negative: '#B91010',
      primaryText: '#FFFFFF',
      secondaryText: '#A0AEC0'
    },
    height: {
      96: 384,
      52: 208,
    },
  },
};
export const plugins = [];
