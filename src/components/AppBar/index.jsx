import {
  Box,
  Typography,
  Button,
  TextField,
  Badge,
  Tooltip
} from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SvgIcon from '@mui/material/SvgIcon';

import DarkModeSelect from '~/components/DarkMode';
import trelloIcon from '~/assets/trello.svg?react';
import Workspaces from './menus/Workspaces';
import Recent from './menus/Recent';
import Starred from './menus/Starred';
import Templates from './menus/Templates';
import Profiles from './menus/Profiles';

const AppBar = () => {
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: (theme) => theme.customTrello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflow: 'auto'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'primary.main' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon
            component={trelloIcon}
            fontSize="small"
            sx={{ color: 'primary.main' }}
          />
          <Typography
            variant="span"
            sx={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: 'primary.main'
            }}
          >
            Trello
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button variant="contained">Create</Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title="Search /">
          <TextField
            id="outlined-basic-search"
            label="Search..."
            size="small"
            variant="outlined"
            sx={{ minWidth: 120 }}
          />
        </Tooltip>
        <DarkModeSelect />
        <Tooltip title="Notifications">
          <Badge color="secondary" variant="dot">
            <NotificationsNoneIcon color="primary" />
          </Badge>
        </Tooltip>
        <Tooltip title="Informations">
          <HelpOutlineIcon color="primary" />
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  );
};

export default AppBar;
