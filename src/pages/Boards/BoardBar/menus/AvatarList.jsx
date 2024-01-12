import { Avatar, AvatarGroup } from '@mui/material';

import ava from '~/assets/images/avatar.jpg';

//
// const styleAvatar = {

// }

export default function AvatarList() {
  return (
    <AvatarGroup
      max={4}
      sx={{
        '& .MuiAvatar-root': {
          width: '2rem',
          height: '2rem',
          fontSize: '1rem',
          '&:first-of-type': {
            bgcolor: '#a4b0be'
          }
        },
        cursor: 'pointer'
      }}
    >
      <Avatar alt="Remy Sharp" src={ava} />
      <Avatar alt="Travis Howard" src={ava} />
      <Avatar alt="Cindy Baker" src={ava} />
      <Avatar alt="Agnes Walker" src={ava} />
      <Avatar alt="Trevor Henderson" src={ava} />
    </AvatarGroup>
  );
}
