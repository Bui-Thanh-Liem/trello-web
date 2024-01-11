import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

export default function Share() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button
        size='small'
        variant="contained"
        onClick={handleOpen}
        startIcon={<GroupAddIcon />}
      >
        Share
      </Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <Box sx={{ bgcolor: 'primary' }}>Share</Box>
      </Backdrop>
    </div>
  );
}
