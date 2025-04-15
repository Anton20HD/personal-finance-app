/** @type {import('tailwindcss').Config} */
export const content = ["./app/**/*.{js,jsx,ts,tsx}"];
export const presets = [require("nativewind/preset")];
export const theme = {
  extend: {
    colors: {
      primary: '#030014' // Du kan sätta en primary color här som du kan använda var som helst i koden senare.
    }
  },
};
export const plugins = [];
