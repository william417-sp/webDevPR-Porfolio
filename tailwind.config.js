module.exports = {
    content: [
      "./pages/*.{html,js}",
      "./index.html",
      "./js/*.js",
      "./components/*.html"
    ],
    theme: {
      extend: {
        colors: {
          // Primary Colors - Deep trust, technical authority
          primary: {
            DEFAULT: "#1E3A8A", // blue-800
            50: "#EFF6FF", // blue-50
            100: "#DBEAFE", // blue-100
            500: "#3B82F6", // blue-500
            600: "#2563EB", // blue-600
            700: "#1D4ED8", // blue-700
            800: "#1E3A8A", // blue-800
            900: "#1E40AF", // blue-900
          },
          // Secondary Colors - Interactive elements, progress indicators
          secondary: {
            DEFAULT: "#3B82F6", // blue-500
            50: "#EFF6FF", // blue-50
            100: "#DBEAFE", // blue-100
            500: "#3B82F6", // blue-500
            600: "#2563EB", // blue-600
          },
          // Accent Colors - Attention moments, success highlights
          accent: {
            DEFAULT: "#F59E0B", // amber-500
            50: "#FFFBEB", // amber-50
            100: "#FEF3C7", // amber-100
            400: "#FBBF24", // amber-400
            500: "#F59E0B", // amber-500
            600: "#D97706", // amber-600
          },
          // Background Colors
          background: "#FFFFFF", // white
          surface: {
            DEFAULT: "#F8FAFC", // slate-50
            100: "#F1F5F9", // slate-100
            200: "#E2E8F0", // slate-200
          },
          // Text Colors
          text: {
            primary: "#1F2937", // gray-800
            secondary: "#6B7280", // gray-500
            muted: "#9CA3AF", // gray-400
          },
          // Status Colors
          success: {
            DEFAULT: "#10B981", // emerald-500
            50: "#ECFDF5", // emerald-50
            100: "#D1FAE5", // emerald-100
            500: "#10B981", // emerald-500
          },
          warning: {
            DEFAULT: "#F59E0B", // amber-500
            50: "#FFFBEB", // amber-50
            100: "#FEF3C7", // amber-100
            500: "#F59E0B", // amber-500
          },
          error: {
            DEFAULT: "#EF4444", // red-500
            50: "#FEF2F2", // red-50
            100: "#FEE2E2", // red-100
            500: "#EF4444", // red-500
          },
          // Border Colors
          border: {
            DEFAULT: "#E5E7EB", // gray-200
            light: "#F3F4F6", // gray-100
          },
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          inter: ['Inter', 'sans-serif'],
          mono: ['JetBrains Mono', 'monospace'],
          jetbrains: ['JetBrains Mono', 'monospace'],
        },
        fontSize: {
          'xs': ['0.75rem', { lineHeight: '1rem' }],
          'sm': ['0.875rem', { lineHeight: '1.25rem' }],
          'base': ['1rem', { lineHeight: '1.5rem' }],
          'lg': ['1.125rem', { lineHeight: '1.75rem' }],
          'xl': ['1.25rem', { lineHeight: '1.75rem' }],
          '2xl': ['1.5rem', { lineHeight: '2rem' }],
          '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
          '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
          '5xl': ['3rem', { lineHeight: '1.2' }],
          '6xl': ['3.75rem', { lineHeight: '1.1' }],
        },
        spacing: {
          '18': '4.5rem',
          '88': '22rem',
          '128': '32rem',
        },
        borderRadius: {
          'sm': '4px',
          'md': '8px',
          'lg': '12px',
          'xl': '16px',
          '2xl': '20px',
        },
        boxShadow: {
          'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        transitionDuration: {
          '150': '150ms',
          '300': '300ms',
          '500': '500ms',
        },
        transitionTimingFunction: {
          'out': 'ease-out',
          'in-out': 'ease-in-out',
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-out',
          'slide-up': 'slideUp 0.5s ease-out',
          'slide-down': 'slideDown 0.5s ease-out',
          'scale-in': 'scaleIn 0.3s ease-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0', transform: 'translateY(10px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          slideUp: {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          slideDown: {
            '0%': { opacity: '0', transform: 'translateY(-20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          scaleIn: {
            '0%': { opacity: '0', transform: 'scale(0.95)' },
            '100%': { opacity: '1', transform: 'scale(1)' },
          },
        },
        maxWidth: {
          '8xl': '88rem',
          '9xl': '96rem',
        },
        zIndex: {
          '60': '60',
          '70': '70',
          '80': '80',
          '90': '90',
          '100': '100',
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }