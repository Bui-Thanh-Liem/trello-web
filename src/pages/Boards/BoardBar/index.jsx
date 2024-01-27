import { Box, Chip, Divider, Tooltip, IconButton } from '@mui/material';
import { SpaceDashboard } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

//
import NameBoard from './menus/NameBoard';
import UpgradeForViews from './menus/UpgradeForViews';
import ChangeVisibility from './menus/ChangeVisibility';
import PowerUp from './menus/PowerUp';
import Automation from './menus/Automation';
import Fillter from './menus/Fillter';
import AvatarList from './menus/AvatarList';
import Share from './menus/Share';
import StarFavourite from './menus/Star';

//
function BoardBar({ board }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.customTrello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // bgcolor: 'white',
        paddingX: 2,
        overflowX: 'auto'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ marginLeft: '1.5rem' }}>
          <NameBoard name={board?.title} />
        </Box>
        <StarFavourite checked={board.star} />
        <ChangeVisibility visibility={board?.type} />
        <Tooltip title="Board">
          <Chip
            color="primary"
            sx={{ borderRadius: '3px' }}
            icon={<SpaceDashboard />}
            label="Board"
          />
        </Tooltip>
        <UpgradeForViews />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <PowerUp />
        <Automation />
        <Fillter />
        <Divider
          sx={{ height: '1.5rem' }}
          variant="middle"
          orientation="vertical"
          flexItem
        />
        <AvatarList />
        <Share />
        <IconButton>
          <MoreVertIcon color="primary" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default BoardBar;
