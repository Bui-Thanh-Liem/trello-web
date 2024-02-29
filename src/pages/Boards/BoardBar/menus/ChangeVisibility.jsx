import { useEffect, useState } from 'react';
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
import { toUpperCaseFirstLetter } from '~/utils/formatters';
//
const listItems = [
  {
    icon: <Public color="primary" fontSize="small" />,
    type: 'public',
    secondary:
      'Anyone on the internet can see this board. Only board members can edit.'
  },
  {
    icon: <People color="primary" fontSize="small" />,
    type: 'workspace',
    secondary:
      'All members of the Trello Workspace can see and edit this board.'
  },
  {
    icon: <Lock color="primary" fontSize="small" />,
    type: 'private',
    secondary: 'Only board members can see and edit this board.'
  }
];

export default function ChangeVisibility({ visibility }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [visi, setVisi] = useState(null);

  useEffect(() => {
    setVisi(visibility);
  }, [visibility]);

  const open = Boolean(anchorEl);

  // handle events
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickChangeVisi = (type) => {
    setVisi(type);
    setAnchorEl(null);
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
          {listItems.filter((item) => item.type === visi)[0]?.icon ||
            listItems[0]?.icon}
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
                <ListItemButton
                  onClick={() => handleClickChangeVisi(item.type)}
                >
                  <ListItemIcon>{item?.icon}</ListItemIcon>
                  <ListItemText
                    primary={toUpperCaseFirstLetter(item.type)}
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
