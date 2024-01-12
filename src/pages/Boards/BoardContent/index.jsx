import { Box } from '@mui/material';
//
import Columns from './Columns';

const BoardContent = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.customTrello.boardContentHeight,
        marginTop: (theme) => theme.customTrello.appBarHeight,
        bgcolor: 'primary.main',
        paddingTop: '.7rem',
        paddingBottom: '.7rem',
        maxWidth: '100vw',
        overflowX: 'auto'
      }}
    >
      <Columns />
    </Box>
  );
};

export default BoardContent;
