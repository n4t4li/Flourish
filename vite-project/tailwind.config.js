/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Scale-up base font sizes and important headings so `text-lg` etc.
      // map to larger values across the site.
      fontSize: {
        xs: '0.875rem',   // 14px
        sm: '0.9375rem',  // 15px
        base: '1.125rem', // 18px
        lg: '1.25rem',    // 20px
        xl: '1.5rem',     // 24px
        '2xl': '1.875rem',// 30px
        '3xl': '2.25rem', // 36px
        '4xl': '3rem',    // 48px
        '5xl': '3.75rem', // 60px
        '6xl': '4.5rem',  // 72px
        '7xl': '5.25rem', // 84px
      },
      // Increase spacing values (so p-6, gap-8, etc. are larger)
      spacing: {
        6: '1.875rem',  // default 1.5rem -> 30px
        8: '2.5rem',    // default 2rem -> 40px
        10: '3.125rem', // default 2.5rem -> 50px
        12: '3.75rem',  // default 3rem -> 60px
        14: '4.375rem', // default 3.5rem -> 70px (approx)
        16: '5rem',     // default 4rem -> 80px
        20: '6.25rem',  // default 5rem -> 100px
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          sm: '600px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
    },
  },
  plugins: [],
}
