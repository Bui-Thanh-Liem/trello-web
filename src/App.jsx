import Button from '@mui/material/Button';
import { Home } from '@mui/icons-material';
import { pink } from '@mui/material/colors';

function App() {
  return (
    <>
      <h1>Bui Thanh Liem</h1>
      <Button variant="contained">Hello world</Button>
      <Button variant="outlined">Hello world</Button>
      <Button variant="contained" color="success">
        Success
      </Button>
      <Button variant="contained" color="error">
        Error
      </Button>
      <Home color='primary' />
      <Home color='secondary' />
      <Home color='success' />
      <Home color='action' />
      <Home color='disabled' />
      <Home sx={{ color: pink[500] }} />
    </>
  );
}

export default App;
