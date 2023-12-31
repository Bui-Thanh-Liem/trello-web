import { Box } from '@mui/material';

import DarkModeSelect from '../DarkMode';

const AppBar = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.customTrello.appBarHeight,
        bgcolor: 'primary.light',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <DarkModeSelect />
      App Bar
    </Box>
  );
};

export default AppBar;
