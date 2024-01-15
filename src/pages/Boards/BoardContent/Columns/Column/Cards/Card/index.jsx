import {
  Card as CardMUI,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button
} from '@mui/material';
import { PeopleAlt, Comment, Attachment } from '@mui/icons-material';
//

export default function Card({ card }) {
  const shouldShowCardActions = () => {
    return (
      !!card?.memberIds?.length ||
      !!card?.comments?.length ||
      !!card?.attachments?.length
    );
  };

  return (
    <>
      <CardMUI
        sx={{
          cursor: 'pointer',
          overflow: 'unset',
          boxShadow: '1px 1px rgba(0, 0, 0, .2)',
          border: '1px solid transparent',
          '&:hover': {
            borderColor: 'primary.light'
          },
          '&:last-child': {
            marginBottom: 1
          }
        }}
      >
        {card?.cover && (
          <CardMedia
            sx={{ height: 140, overflow: 'hidden' }}
            image={card.cover}
          />
        )}

        <CardContent
          sx={{
            color: 'primary.main',
            padding: 1.5,
            '&:last-child': { padding: 1.5 }
          }}
        >
          <Typography>{card?.title}</Typography>
        </CardContent>

        {shouldShowCardActions() && (
          <CardActions
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 0
            }}
          >
            {!!card?.memberIds?.length && (
              <Button startIcon={<PeopleAlt />}>
                {card.memberIds?.length}
              </Button>
            )}
            {!!card?.comments?.length && (
              <Button startIcon={<Comment />}>{card.comments?.length}</Button>
            )}
            {!!card?.attachments?.length && (
              <Button startIcon={<Attachment />}>
                {card.attachments?.length}
              </Button>
            )}
          </CardActions>
        )}
      </CardMUI>
    </>
  );
}
