import { useState } from 'react';
import { Button, Box, Menu, Tooltip } from '@mui/material';
import FilterList from '@mui/icons-material/FilterList';

export default function Fillter() {
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
        endIcon={<FilterList />}
        onClick={handleClick}
      >
        <Tooltip title='Filter Cards'><span>Fillter</span></Tooltip>
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
        <Box>Fillter</Box>
      </Menu>
    </Box>
  );
}
