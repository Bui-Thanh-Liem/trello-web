import { Box } from '@mui/material';

const BoardContent = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) =>
          `calc(100vh - ${theme.customTrello.appBarHeight} - ${theme.customTrello.boardBarHeight})`,
        bgcolor: 'primary.main',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Box>Board-Content</Box>
    </Box>
  );
};

export default BoardContent;
