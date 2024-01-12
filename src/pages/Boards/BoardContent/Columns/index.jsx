import { Box } from '@mui/material';

import Column from './Column';

export default function Columns() {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        height: '100%',
        maxWidth: '100vw',
        overflowX: 'auto',
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'primary.light',
          borderRadius: '10px'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'primary.dark'
        }
      }}
    >
      <Column />
      <Column />
      <Column />
    </Box>
  );
}
