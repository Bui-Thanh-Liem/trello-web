import { useState } from 'react';
import {
  IconButton,
  Box,
  Menu,
  Tooltip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@mui/material';
import { People, Public, Lock, Close } from '@mui/icons-material/';
//
import {toUpperCaseFirstLetter} from '~/utils/formatters';
//
const listItems = [
  {
    icon: <Public color="primary" fontSize="small" />,
    primary: 'public',
    secondary:
      'Anyone on the internet can see this board. Only board members can edit.'
  },
  {
    icon: <People color="primary" fontSize="small" />,
    primary: 'workspace',
    secondary:
      'All members of the Trello Workspace can see and edit this board.'
  },
  {
    icon: <Lock color="primary" fontSize="small" />,
    primary: 'private',
    secondary: 'Only board members can see and edit this board.'
  }
];

export default function ChangeVisibility({ visibility }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        id="basic-button-recent"
        aria-controls={open ? 'basic-menu-recent' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Tooltip title="Change visibility">
          {listItems.filter((item) => item.primary === visibility)[0]?.icon}
        </Tooltip>
      </IconButton>
      <Menu
        id="basic-menu-recent"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-recent'
        }}
      >
        <Box>
          <List sx={{ '&.MuiList-root': { paddingY: 0 } }}>
            <ListSubheader
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              Change Visibility
              <Close sx={{ cursor: 'pointer' }} onClick={handleClose} />
            </ListSubheader>
            {listItems.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  '&.MuiListItem-root': { padding: 0 },
                  '& .MuiButtonBase-root': { padding: '0 1rem' }
                }}
              >
                <ListItemButton>
                  <ListItemIcon>{item?.icon}</ListItemIcon>
                  <ListItemText
                    primary={toUpperCaseFirstLetter(item.primary)}
                    secondary={item.secondary}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Menu>
    </Box>
  );
}
