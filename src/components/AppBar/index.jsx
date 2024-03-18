import {
  Box,
  Typography,
  Button,
  TextField,
  Badge,
  Tooltip,
  IconButton,
  InputAdornment
} from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import SvgIcon from '@mui/material/SvgIcon';

import DarkModeSelect from '~/components/DarkMode';
import trelloIcon from '~/assets/trello.svg?react';
import Workspaces from './menus/Workspaces';
import Recent from './menus/Recent';
import Starred from './menus/Starred';
import Templates from './menus/Templates';
import Profiles from './menus/Profiles';
import { useState } from 'react';

const AppBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const handleClickSearch = () => {
    console.log(`Searching ${searchValue}`);
  };
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        width: '100%',
        paddingX: '1rem',
        height: (theme) => theme.customTrello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflow: 'auto',
        borderBottom: (theme) => `1px solid ${theme.palette.primary.main}`
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
          <Button variant="contained" endIcon={<LibraryAddIcon />}>
            Create
          </Button>
          {/* <Button variant="contained"><LibraryAddIcon /></Button> */}
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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon onClick={() => handleClickSearch()} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">
                  <CloseIcon
                    sx={{
                      color: () => {
                        return !searchValue.trim() ? 'transparent' : '';
                      },
                      cursor: 'pointer'
                    }}
                    onClick={() => setSearchValue('')}
                  />
                </InputAdornment>
              )
            }}
          />
        </Tooltip>
        <DarkModeSelect />
        <Tooltip title="Notifications">
          <IconButton>
            <Badge color="secondary" variant="dot">
              <NotificationsNoneIcon color="primary" />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Informations">
          <IconButton>
            <HelpOutlineIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  );
};

export default AppBar;
