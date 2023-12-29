import Button from '@mui/material/Button';
import { Home } from '@mui/icons-material';
import { pink } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

import DarkModeSelect from './DarkMode';

function App() {
  return (
    <>
      <div>
        <DarkModeSelect />
      </div>
      <br />
      <h1>Bui Thanh Liem</h1>
      <Button variant="contained" color="primary">
        Hello world
      </Button>
      <br />
      <Button variant="outlined">Hello world</Button>
      <br />
      <Button variant="contained" color="secondary">
        Hello world
      </Button>
      <br />
      <Button variant="contained" color="success">
        Success
      </Button>
      <br />
      <Button variant="contained" color="error">
        Error
      </Button>
      <Button variant="contained" color="warning">
        Warning
      </Button>

      <Typography variant="body2" color="text.secondary">
        The Material UI theme will be separated from the other library, so when
        you use APIs such as styled, the sx prop, and useTheme, you ll be able
        to access Material UI s theme like you normally would.
      </Typography>
      <Home color="primary" />
      <Home color="secondary" />
      <Home color="success" />
      <Home color="action" />
      <Home color="disabled" />
      <Home sx={{ color: pink[500] }} />
    </>
  );
}

export default App;
