import { createTheme, ThemeOptions } from '@mui/material/styles';

// Mastercard color palette
const mastercardColors = {
  primary: {
    main: '#EB001B', // Mastercard Red
    light: '#FF3347',
    dark: '#C7001A',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#FF5F00', // Mastercard Orange
    light: '#FF8533',
    dark: '#E54A00',
    contrastText: '#FFFFFF',
  },
  accent: {
    main: '#F79E1B', // Mastercard Yellow
    light: '#FFB84D',
    dark: '#E58900',
    contrastText: '#000000',
  },
  background: {
    default: '#FAFAFA', // Google-style light background
    paper: '#FFFFFF',
  },
  surface: {
    main: '#F8F9FA',
    light: '#FFFFFF',
    dark: '#E8EAED',
  },
  text: {
    primary: '#202124', // Google-style dark text
    secondary: '#5F6368',
    disabled: '#9AA0A6',
  },
  divider: '#DADCE0',
  border: '#E8EAED',
};

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: mastercardColors.primary,
    secondary: mastercardColors.secondary,
    background: mastercardColors.background,
    text: mastercardColors.text,
    divider: mastercardColors.divider,
    error: {
      main: '#D93025',
      light: '#EA4335',
      dark: '#B52D20',
    },
    warning: {
      main: '#F9AB00',
      light: '#FBBC04',
      dark: '#E37400',
    },
    info: {
      main: '#1A73E8',
      light: '#4285F4',
      dark: '#1557B0',
    },
    success: {
      main: '#137333',
      light: '#34A853',
      dark: '#0D652D',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.75,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '0.01071em',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: '0.03333em',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 8, // Google Material Design 3 style
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '24px', // Google-style rounded buttons
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
          },
        },
        outlined: {
          borderWidth: '1px',
          '&:hover': {
            borderWidth: '1px',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
          border: `1px solid ${mastercardColors.border}`,
          '&:hover': {
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: mastercardColors.border,
            },
            '&:hover fieldset': {
              borderColor: mastercardColors.text.secondary,
            },
            '&.Mui-focused fieldset': {
              borderColor: mastercardColors.primary.main,
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: mastercardColors.text.primary,
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12)',
          borderBottom: `1px solid ${mastercardColors.divider}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mastercardColors.surface.main,
          borderRight: `1px solid ${mastercardColors.divider}`,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 8px',
          '&:hover': {
            backgroundColor: 'rgba(235, 0, 27, 0.08)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(235, 0, 27, 0.12)',
            '&:hover': {
              backgroundColor: 'rgba(235, 0, 27, 0.16)',
            },
          },
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);

// Custom color extensions for TypeScript
declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
    surface: Palette['primary'];
  }

  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
    surface?: PaletteOptions['primary'];
  }
}
