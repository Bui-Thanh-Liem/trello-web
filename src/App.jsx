import { Container, Box } from '@mui/material';

import DarkModeSelect from './DarkMode';

function App() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: '100vh' }}
    >
      <Box sx={{
        width: '100%',
        height: (theme) => theme.customTrello.appBarHeight,
        bgcolor: 'primary.light',
        display: 'flex',
        alignItems: 'center'
      }}>
        <DarkModeSelect />
      </Box>
      <Box sx={{
        width: '100%',
        height: (theme) => theme.customTrello.appBoardHeight,
        bgcolor: 'primary.dark',
        display: 'flex',
        alignItems: 'center'
      }}>
        App-Board
      </Box>
      <Box sx={{
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.customTrello.appBarHeight} - ${theme.customTrello.appBoardHeight})`,
        bgcolor: 'primary.main',
        display: 'flex',
        alignItems: 'center'
      }}>
        App-Content
      </Box>
    </Container>
  );
}

export default App;
