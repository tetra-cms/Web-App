/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './composables/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          primary: '#FF8800',
          secondary: '#FFAF54'
        },

        secondary: {
          primary: '#FFFFFF',
          secondary: '#F9F8F8',
          light: '#EFEFEF',
          wrapper: {
            dark: '#000000',
            light: '#DCDCDC'
          }
        },

        tomato: {
          primary: '#DA0404',
          secondary: '#C70000'
        },

        dark: {
          secondary: {
            primary: '#000000',
            secondary: '',
            light: '',
            wrapper: {
              dark: '#FFFFFF',
              light: ''
            }
          }
        }
      },

      fontFamily: {
        druk: ['DrukWideCyr-Bold']
      }
    }
  },

  plugins: []
}