import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { teal, deepOrange, cyan, orange } from '@mui/material/colors';

// Create a theme instance.
const theme = extendTheme({
  customTrello: {
    appBarHeight: '58px',
    BoardBarHeight: '58px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      }
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem'
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: '0.875rem',
          color: theme.palette.primary.main,
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main
          }
          // '&:hover': {
          //   '.MuiOutlinedInput-notchedOutline': {
          //     borderColor: 'red'
          //   }
          // }
          // '& fieldset': {
          //   borderWidth: '1px !important '
          // }
        })
      }
    }
  }
});

export default theme;
