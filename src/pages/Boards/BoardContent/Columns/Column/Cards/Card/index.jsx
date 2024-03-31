import {
  Card as CardMUI,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button
} from '@mui/material';
import { PeopleAlt, Comment, Attachment } from '@mui/icons-material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
//

export default function Card({ card }) {
  const shouldShowCardActions = () => {
    return (
      !!card?.memberIds?.length ||
      !!card?.comments?.length ||
      !!card?.attachments?.length
    );
  };

  // drag and drop
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: card._id, data: { ...card } });
  const dndkitCardStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <>
      <CardMUI
        ref={setNodeRef}
        style={dndkitCardStyles}
        {...attributes}
        {...listeners}
        sx={{
          borderRadius: '8px',
          cursor: 'pointer',
          overflow: 'unset',
          boxShadow:
            '-2px -3px rgba(0, 0, 0, .2), inset -2px -2px rgba(0, 0, 0, .1)',
          border: '1px solid transparent',
          display: card?.FE_placeholderCard ? 'none' : 'block',
          '&:hover': {
            boxShadow: (theme) => `2px 3px ${theme.palette.primary.light}`
          },
          '&:first-of-type': {
            marginTop: 1
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
