module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        esperanto: {
          light: '#53CB40',
          DEFAULT: '#009900',
          dark: '#006900'
        },
        primary: {
          light: '#4DBE76',
          DEFAULT: '#008D49',
          dark: '#005E1F'
        },
        secondary: {
          light: '#7CA3FF',
          DEFAULT: '#3E75E8',
          dark: '#004AB5'
        },
        info: {
          light: '#64B0FF',
          DEFAULT: '#0081ED',
          dark: '#0055BA'
        },
        danger: {
          light: '#ff7069',
          DEFAULT: '#E13B3E',
          dark: '#A80017'
        },
        dark: {
          DEFAULT: '#171C22',
          secondary: '#1E242B',
          tertiary: '#252C34'
        },
        gray: {
          DEFAULT: '#3A4148',
          light: '#9CA3AF'
        }
      }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled']
    },
  },
  plugins: [],
}
