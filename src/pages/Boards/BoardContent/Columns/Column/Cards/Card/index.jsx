import {
  Card as CardMUI,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button
} from '@mui/material';
import {
  PeopleAlt,
  Comment,
  Attachment
} from '@mui/icons-material';
//
import laptop from '~/assets/images/laptop.jpg';


export default function Card() {
  return (
    <>
      <CardMUI
        sx={{
          cursor: 'pointer',
          overflow: 'unset',
          boxShadow: '1px 1px rgba(0, 0, 0, .2)'
        }}
      >
        <CardMedia sx={{ height: 140 }} image={laptop} title="green iguana" />
        <CardContent
          sx={{
            color: 'primary.main',
            padding: 1.5,
            '&:last-child': { padding: 1.5 }
          }}
        >
          <Typography>Lap top 01</Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 0
          }}
        >
          <Button startIcon={<PeopleAlt />}>12</Button>
          <Button startIcon={<Comment />}>122</Button>
          <Button startIcon={<Attachment />}>2</Button>
        </CardActions>
      </CardMUI>

      <CardMUI
        sx={{
          cursor: 'pointer',
          overflow: 'unset',
          boxShadow: '1px 1px rgba(0, 0, 0, .2)'
        }}
      >
        <CardContent
          sx={{
            color: 'primary.main',
            padding: 1.5,
            '&:last-child': { padding: 1.5 }
          }}
        >
          <Typography>Lap top 01</Typography>
        </CardContent>
      </CardMUI>
    </>
  );
}
