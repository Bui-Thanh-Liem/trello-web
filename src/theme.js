import { createTheme } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#f48fb1'
    },
    error: {
      main: '#f48fb1'
    },
    warning: {
      main: '#f48fb1'
    },
    text: {
      primary: '#f48fb1',
      secondary: pink
    }
  }
});

export default theme;
