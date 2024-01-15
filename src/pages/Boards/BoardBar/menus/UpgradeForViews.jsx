import { useState } from 'react';
import {
  MenuList,
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';

export default function UpgradeForViews() {
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
        sx={{ color: 'primary.main' }}
        id="basic-button-recent"
        aria-haspopup="true"
        aria-controls={open ? 'basic-menu-recent' : undefined}
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Tooltip title="Customize views">
          <KeyboardArrowDownIcon />
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
              <Check />
            </ListItemIcon>
            Custom: 1.2
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemText>Add space before paragraph</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemText>Add space after paragraph</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemText>Custom spacing...</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
