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
  ListItemIcon
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
//
import Cards from './Cards';

//
const HEADER_CARD_HEIGHT = '41px';
const FOOTER_CARD_HEIGHT = '52.5px';

export default function Column() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          minWidth: '272px',
          maxWidth: '272px',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
          borderRadius: '8px',
          height: 'fit-content',
          maxHeight: (theme) =>
            `calc(${theme.customTrello.boardContentHeight} - ${theme.spacing(
              5
            )})`,
          '&:first-child': {
            marginLeft: '.7rem'
          },
          '&:last-child': {
            marginRight: '.7rem'
          }
        }}
      >
        {/* Column header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: HEADER_CARD_HEIGHT,
            padding: '.5rem 1rem'
          }}
        >
          <Typography
            sx={{ fontWeight: 'bold', fontSize: '1rem', color: 'primary.main' }}
          >
            Header
          </Typography>
          <Box>
            <IconButton
              id="basic-button-columnCard-options"
              aria-controls={open ? 'basic-menu-recent' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              sx={{
                '&.MuiButtonBase-root': {
                  padding: 0
                },
                cursor: 'pointer',
                overflow: 'unset',
                color: 'primary.main'
              }}
              onClick={handleClick}
            >
              <Tooltip title="More options">
                <MoreHorizIcon />
              </Tooltip>
            </IconButton>
            <Menu
              id="basic-menu-recent"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button-columnCard-options'
              }}
            >
              <MenuList dense>
                <MenuItem onClick={handleClose}>
                  <ListItemText inset>Single</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemText inset>1.15</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemText inset>Double</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <MoreHorizIcon />
                  </ListItemIcon>
                  Custom: 1.2
                </MenuItem>
                <MoreHorizIcon />
                <MenuItem onClick={handleClose}>
                  <ListItemText>Add space before paragraph</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemText>Add space after paragraph</ListItemText>
                </MenuItem>
                <MoreHorizIcon />
                <MenuItem onClick={handleClose}>
                  <ListItemText>Custom spacing...</ListItemText>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>

        {/* Column content */}
        <Box>
          {/* Column content list cards*/}
          <Cards />
        </Box>

        {/* Column footer */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: FOOTER_CARD_HEIGHT,
            padding: '.5rem 1rem'
          }}
        >
          <Button startIcon={<AddIcon />}>Add a Card</Button>
          <BackupTableIcon />
        </Box>
      </Box>
    </>
  );
}
