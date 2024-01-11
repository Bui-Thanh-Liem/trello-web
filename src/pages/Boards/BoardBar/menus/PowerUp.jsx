import { useState } from 'react';
import { Button, Box, Menu, Tooltip } from '@mui/material';
import RocketLaunch from '@mui/icons-material/RocketLaunch';

export default function PowerUp() {
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
      <Button
        id="basic-button-recent"
        aria-controls={open ? 'basic-menu-recent' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Tooltip title='Power-Ups'>
          <RocketLaunch />
        </Tooltip>
      </Button>
      <Menu
        id="basic-menu-recent"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-recent'
        }}
      >
        <Box>PowerUp</Box>
      </Menu>
    </Box>
  );
}
