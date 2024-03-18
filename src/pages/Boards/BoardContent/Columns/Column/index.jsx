import { useState } from 'react';
import {
  Button,
  Box,
  Menu,
  Typography,
  Tooltip,
  MenuItem,
  MenuList,
  ListItemText,
  ListItemIcon,
  TextField
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
//
import Cards from './Cards';
import { mapOrder } from '~/utils/sorts';

export default function Column({ column }) {
  const [option, setOption] = useState(null);
  const [template, setTemplate] = useState(null);
  const [openFormCreateCard, setOpenFormCreateCard] = useState(false);
  const [valueInputNewCard, setValueInputNewCard] = useState('');

  const toggleOpenFormCreateCard = () => {
    setOpenFormCreateCard(!openFormCreateCard);
    setValueInputNewCard('');
  };

  const openOption = Boolean(option);
  const openTemplate = Boolean(template);
  const handleClickOpenOption = (event) => {
    setOption(event.currentTarget);
  };
  const handleCloseOption = () => {
    setOption(null);
  };
  const handleClickOpenTemplate = (event) => {
    setTemplate(event.currentTarget);
  };
  const handleCloseTemplate = () => {
    setTemplate(null);
  };
  const handleClickAddCard = () => {
    if (!valueInputNewCard) {
      console.error('Toast: Please enter a new card title');
      return;
    }

    console.log(`Call API to add card: ${valueInputNewCard}`);
  };

  const cardsOrdered = mapOrder(column?.cards, column?.cardOrderIds, '_id');

  // Drag - Drop
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: column._id, data: { ...column } });
  const dndkitColumnStyles = {
    // Nếu sử dụng CSS transform thì biến đổi cả về scale, nên sử dụng translate để di chuyển thôi
    transform: CSS.Translate.toString(transform),
    transition,
    touchAction: 'none',
    marginLeft: '.7rem',
    height: '100%'
  };

  return (
    // Khi thêm sortable cho card thì column bị bug nên phải wrap thêm 1 div cho 2 column cùng chiều dài
    <div ref={setNodeRef} style={dndkitColumnStyles} {...attributes}>
      <Box
        {...listeners}
        sx={{
          // isDragging
          opacity: isDragging ? 0.5 : 1,
          minWidth: '272px',
          maxWidth: '272px',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
          borderRadius: '8px',
          height: 'fit-content',
          maxHeight: (theme) =>
            `calc(${theme.customTrello.boardContentHeight} - ${theme.spacing(
              5
            )})`
        }}
      >
        {/* Column header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: (theme) => theme.customTrello.headerCardHeight,
            padding: '.5rem 1rem'
          }}
        >
          <Typography
            sx={{ fontWeight: 'bold', fontSize: '1rem', color: 'primary.main' }}
          >
            {column?.title}
          </Typography>
          <Box>
            <IconButton
              id="basic-button-columnCard-options"
              aria-controls={openOption ? 'basic-menu-recent' : undefined}
              aria-haspopup="true"
              aria-expanded={openOption ? 'true' : undefined}
              sx={{
                '&.MuiButtonBase-root': {
                  padding: 0
                },
                cursor: 'pointer',
                overflow: 'unset',
                color: 'primary.main'
              }}
              onClick={handleClickOpenOption}
            >
              <Tooltip title="More options">
                <MoreHorizIcon />
              </Tooltip>
            </IconButton>
            <Menu
              id="basic-menu-recent"
              anchorEl={option}
              open={openOption}
              onClose={handleCloseOption}
              MenuListProps={{
                'aria-labelledby': 'basic-button-columnCard-options'
              }}
            >
              <MenuList dense>
                <MenuItem onClick={handleCloseOption}>
                  <ListItemText inset>Single</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleCloseOption}>
                  <ListItemText inset>1.15</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleCloseOption}>
                  <ListItemText inset>Double</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleCloseOption}>
                  <ListItemIcon>
                    <MoreHorizIcon />
                  </ListItemIcon>
                  Custom: 1.2
                </MenuItem>
                <MoreHorizIcon />
                <MenuItem onClick={handleCloseOption}>
                  <ListItemText>Add space before paragraph</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleCloseOption}>
                  <ListItemText>Add space after paragraph</ListItemText>
                </MenuItem>
                <MoreHorizIcon />
                <MenuItem onClick={handleCloseOption}>
                  <ListItemText>Custom spacing...</ListItemText>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>

        {/* Column content */}
        <Box>
          <Cards cards={cardsOrdered} />
        </Box>

        {/* Column footer */}
        {!openFormCreateCard ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: (theme) => theme.customTrello.footerCardHeight,
              padding: '.5rem 1rem'
            }}
          >
            <Button startIcon={<AddIcon />} onClick={toggleOpenFormCreateCard}>
              Add a Card
            </Button>
            <Box>
              <IconButton
                id="basic-button-columnCard-options"
                aria-controls={openTemplate ? 'basic-menu-recent' : undefined}
                aria-haspopup="true"
                aria-expanded={openTemplate ? 'true' : undefined}
                sx={{
                  '&.MuiButtonBase-root': {
                    padding: 0
                  },
                  cursor: 'pointer',
                  overflow: 'unset',
                  color: 'primary.main'
                }}
                onClick={handleClickOpenTemplate}
              >
                <Tooltip title="More options">
                  <BackupTableIcon fontSize="small" />
                </Tooltip>
              </IconButton>
              <Menu
                id="basic-menu-recent"
                anchorEl={template}
                open={openTemplate}
                MenuListProps={{
                  'aria-labelledby': 'basic-button-columnCard-options'
                }}
                onClick={handleCloseTemplate}
              >
                <MenuList dense>
                  <Box
                    sx={{
                      minWidth: '280px',
                      maxWidth: '280px',
                      paddingX: '1rem'
                    }}
                  >
                    <Box
                      sx={{
                        marginLeft: '4rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Box>Card templates</Box>
                      <CloseIcon onClick={handleCloseTemplate} />
                    </Box>
                    <Typography align="center" sx={{ marginY: '1rem' }}>
                      You do not have any templates. Create a template to make
                      copying cards easy.
                    </Typography>
                    <Button variant="contained" sx={{ width: '100%' }}>
                      Create a new template
                    </Button>
                  </Box>
                </MenuList>
              </Menu>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              width: '100%',
              p: 1,
              bgcolor: '#fff',
              borderRadius: 2
            }}
          >
            <form action="">
              <TextField
                id=""
                label="New card name..."
                size="small"
                variant="outlined"
                autoFocus={true}
                sx={{
                  minWidth: 120,
                  borderRadius: 1,
                  border: 'none',
                  outline: 'none',
                  bgcolor: '#fff',
                  width: '100%'
                }}
                data-no-dnd={true}
                value={valueInputNewCard}
                onChange={(e) => setValueInputNewCard(e.target.value)}
              />
              <Box sx={{ marginTop: 0.5 }}>
                <Button
                  color="success"
                  variant="contained"
                  size="small"
                  onClick={handleClickAddCard}
                >
                  Add
                </Button>
                <IconButton>
                  <CloseIcon color="error" onClick={toggleOpenFormCreateCard} />
                </IconButton>
              </Box>
            </form>
          </Box>
        )}
      </Box>
    </div>
  );
}
