import { Box } from '@mui/material';
//
import Card from './Card';

export default function Cards({ cards }) {
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
            )} - ${theme.customTrello.headerCardHeight} - ${
              theme.customTrello.footerCardHeight
            })`,
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
          }
        }}
      >
        {cards?.map((card) => (
          <Card card={card} key={card._id} />
        ))}
      </Box>
    </>
  );
}
