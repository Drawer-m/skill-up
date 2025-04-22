import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9C8399', // Dusty Mauve Purple
      light: '#D6CCD5', // Light Lavender Gray
      dark: '#7A667A', // Darker version of Dusty Mauve (calculated)
    },
    secondary: {
      main: '#F1B2A9', // Warm Coral Pink
      light: '#EECBC7', // Pale Rose
      dark: '#D89A90', // Darker version of Warm Coral (calculated)
    },
    background: {
      default: '#F6DFD7', // Soft Blush Pink
      paper: '#FFF8F6', // Elegant Off-White
    },
    text: {
      primary: '#4B3F44', // Charcoal Gray
      secondary: '#6A5B60', // Lighter version of Charcoal Gray
    },
    divider: '#D6CCD5', // Light Lavender Gray
    // Custom colors for specific use cases
    custom: {
      blushPink: '#F6DFD7', // Soft Blush Pink
      paleRose: '#EECBC7', // Pale Rose
      coralPink: '#F1B2A9', // Warm Coral Pink
      lavenderGray: '#D6CCD5', // Light Lavender Gray
      mauvePurple: '#9C8399', // Dusty Mauve Purple
      offWhite: '#FFF8F6', // Elegant Off-White
      mutedGold: '#D6B77C', // Muted Gold Accent
      charcoalGray: '#4B3F44', // Charcoal Gray
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#9C8399', // Dusty Mauve Purple for headings
    },
    h2: {
      fontWeight: 600,
      color: '#9C8399', // Dusty Mauve Purple for headings
    },
    h3: {
      color: '#9C8399', // Dusty Mauve Purple for headings
    },
    h4: {
      color: '#9C8399', // Dusty Mauve Purple for headings
    },
    h5: {
      color: '#9C8399', // Dusty Mauve Purple for headings
    },
    h6: {
      color: '#9C8399', // Dusty Mauve Purple for headings
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#9C8399', // Dusty Mauve Purple for navbar
          color: '#FFF8F6', // Elegant Off-White for text
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#F1B2A9', // Warm Coral Pink for buttons
          '&:hover': {
            backgroundColor: '#EECBC7', // Pale Rose for hover
          },
        },
        outlined: {
          borderColor: '#F1B2A9', // Warm Coral Pink
          color: '#F1B2A9', // Warm Coral Pink
          '&:hover': {
            borderColor: '#EECBC7', // Pale Rose
            backgroundColor: 'rgba(241, 178, 169, 0.04)', // Very light Warm Coral Pink
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFF8F6', // Elegant Off-White
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: '#D6CCD5', // Light Lavender Gray
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#D6CCD5', // Light Lavender Gray for input fields
            },
            '&:hover fieldset': {
              borderColor: '#9C8399', // Dusty Mauve Purple on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#9C8399', // Dusty Mauve Purple when focused
            },
          },
        },
      },
    },
  },
});

export default theme;
