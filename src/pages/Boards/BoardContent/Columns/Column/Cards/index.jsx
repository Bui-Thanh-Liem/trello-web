import { Box } from '@mui/material';
//
import Card from './Card';

export default function Cards() {
  const HEADER_CARD_HEIGHT = '41px';
  const FOOTER_CARD_HEIGHT = '52.5px';

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          padding: '0 2px',
          margin: '0 2px',
          overflowX: 'hidden',
          overflowY: 'auto',
          maxHeight: (theme) =>
            `calc(${theme.customTrello.boardContentHeight} - ${theme.spacing(
              5
            )} - ${HEADER_CARD_HEIGHT} - ${FOOTER_CARD_HEIGHT})`,
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
          }
        }}
      >
        <Card />
        <Card />
        <Card />
      </Box>
    </>
  );
}
