// JanSuvidha360 Design System
// Comprehensive design tokens and utilities for consistent UI

// Color Palette
export const colors = {
  // Primary Colors (Government Theme)
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',  // Main primary
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // Secondary Colors (Saffron theme)
  secondary: {
    50: '#fef3c7',
    100: '#fde68a',
    200: '#fcd34d',
    300: '#fbbf24',
    400: '#f59e0b',
    500: '#d97706',  // Main secondary
    600: '#b45309',
    700: '#92400e',
    800: '#78350f',
    900: '#451a03',
  },
  
  // Success Colors (Green theme)
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',  // Main success
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  
  // Warning Colors (Orange theme)
  warning: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',  // Main warning
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  
  // Error Colors (Red theme)
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',  // Main error
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  
  // Neutral Colors (Gray theme)
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Government specific colors
  government: {
    saffron: '#FF9933',
    white: '#FFFFFF',
    green: '#138808',
    ashoka: '#000080',
    gold: '#FFD700',
  }
};

// Typography Scale
export const typography = {
  fonts: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    secondary: '"Poppins", sans-serif',
    mono: '"Fira Code", "Consolas", monospace',
    hindi: '"Noto Sans Devanagari", sans-serif',
  },
  
  sizes: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },
  
  weights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  lineHeights: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  }
};

// Spacing Scale
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
  56: '14rem',    // 224px
  64: '16rem',    // 256px
};

// Border Radius
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
};

// Shadows
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

// Z-Index Scale
export const zIndex = {
  auto: 'auto',
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  modal: '1000',
  dropdown: '1000',
  toast: '1100',
  tooltip: '1200',
  overlay: '1300',
  max: '9999',
};

// Breakpoints
export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Animation & Transitions
export const transitions = {
  duration: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
  },
  
  timing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
  
  // Common transition combinations
  default: 'all 250ms ease-in-out',
  button: 'all 150ms ease-in-out',
  modal: 'all 300ms ease-in-out',
};

// Component Variants
export const components = {
  // Button variants
  button: {
    base: `
      inline-flex items-center justify-center font-medium rounded-lg
      transition-all duration-150 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
      xl: 'px-8 py-4 text-lg',
    },
    
    variants: {
      primary: `
        bg-blue-600 text-white border border-blue-600
        hover:bg-blue-700 hover:border-blue-700
        focus:ring-blue-500
        active:bg-blue-800
      `,
      secondary: `
        bg-gray-100 text-gray-900 border border-gray-300
        hover:bg-gray-200 hover:border-gray-400
        focus:ring-gray-500
        active:bg-gray-300
      `,
      outline: `
        bg-transparent text-blue-600 border border-blue-600
        hover:bg-blue-50 hover:text-blue-700
        focus:ring-blue-500
        active:bg-blue-100
      `,
      ghost: `
        bg-transparent text-gray-600 border border-transparent
        hover:bg-gray-100 hover:text-gray-900
        focus:ring-gray-500
        active:bg-gray-200
      `,
      success: `
        bg-green-600 text-white border border-green-600
        hover:bg-green-700 hover:border-green-700
        focus:ring-green-500
        active:bg-green-800
      `,
      warning: `
        bg-orange-600 text-white border border-orange-600
        hover:bg-orange-700 hover:border-orange-700
        focus:ring-orange-500
        active:bg-orange-800
      `,
      error: `
        bg-red-600 text-white border border-red-600
        hover:bg-red-700 hover:border-red-700
        focus:ring-red-500
        active:bg-red-800
      `,
    }
  },
  
  // Card variants
  card: {
    base: `
      bg-white rounded-lg shadow-sm border border-gray-200
      overflow-hidden transition-shadow duration-200
    `,
    
    variants: {
      default: '',
      hover: 'hover:shadow-md',
      interactive: 'hover:shadow-md cursor-pointer',
      elevated: 'shadow-md',
    },
    
    padding: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }
  },
  
  // Input variants
  input: {
    base: `
      w-full px-3 py-2 border rounded-lg
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
      placeholder:text-gray-400
    `,
    
    variants: {
      default: 'border-gray-300',
      error: 'border-red-300 focus:ring-red-500',
      success: 'border-green-300 focus:ring-green-500',
    },
    
    sizes: {
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-3 text-base',
    }
  },
  
  // Badge variants
  badge: {
    base: `
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
    `,
    
    variants: {
      primary: 'bg-blue-100 text-blue-800',
      secondary: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-orange-100 text-orange-800',
      error: 'bg-red-100 text-red-800',
      outline: 'bg-transparent text-gray-600 border border-gray-300',
    }
  },
  
  // Alert variants
  alert: {
    base: `
      p-4 rounded-lg border flex items-start space-x-3
    `,
    
    variants: {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      success: 'bg-green-50 border-green-200 text-green-800',
      warning: 'bg-orange-50 border-orange-200 text-orange-800',
      error: 'bg-red-50 border-red-200 text-red-800',
    }
  }
};

// Utility Functions
export const utils = {
  // Generate responsive classes
  responsive: (property: string, values: Record<string, string>) => {
    return Object.entries(values).map(([breakpoint, value]) => {
      const prefix = breakpoint === 'base' ? '' : `${breakpoint}:`;
      return `${prefix}${property}-${value}`;
    }).join(' ');
  },
  
  // Generate state classes
  states: (baseClass: string, states: Record<string, string>) => {
    return Object.entries(states).map(([state, value]) => {
      return `${state}:${baseClass}-${value}`;
    }).join(' ');
  },
  
  // Combine classes with proper spacing
  cn: (...classes: (string | undefined | null | boolean)[]) => {
    return classes.filter(Boolean).join(' ');
  },
  
  // Generate CSS variables for colors
  cssVars: (colorPalette: Record<string, any>) => {
    const vars: Record<string, string> = {};
    
    Object.entries(colorPalette).forEach(([name, shades]) => {
      if (typeof shades === 'string') {
        vars[`--color-${name}`] = shades;
      } else {
        Object.entries(shades).forEach(([shade, value]) => {
          vars[`--color-${name}-${shade}`] = value as string;
        });
      }
    });
    
    return vars;
  }
};

// Theme Configuration
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  zIndex,
  breakpoints,
  transitions,
  components,
  utils,
};

// Export individual design tokens for easier imports
export {
  colors as designColors,
  typography as designTypography,
  spacing as designSpacing,
  borderRadius as designBorderRadius,
  shadows as designShadows,
  zIndex as designZIndex,
  breakpoints as designBreakpoints,
  transitions as designTransitions,
  components as designComponents,
  utils as designUtils,
};

export default theme; 