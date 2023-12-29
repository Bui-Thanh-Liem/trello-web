import { Box } from '@mui/material';

const BoardContent = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) =>
          `calc(100vh - ${theme.customTrello.appBarHeight} - ${theme.customTrello.BoardBarHeight})`,
        bgcolor: 'primary.main',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      Board-Content
    </Box>
  );
};

export default BoardContent;
