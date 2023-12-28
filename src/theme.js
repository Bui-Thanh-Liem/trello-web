import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#057846'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#bd0b14'
        }
      }
    }
  }
});

export default theme;
