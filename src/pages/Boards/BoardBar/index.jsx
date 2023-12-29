import { Box } from '@mui/material';

function BoardBar() {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.customTrello.BoardBarHeight,
        bgcolor: 'primary.dark',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      Board-Bar
    </Box>
  );
}

export default BoardBar;
