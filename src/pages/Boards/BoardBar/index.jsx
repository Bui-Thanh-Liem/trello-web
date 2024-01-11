import { Box, Chip, Checkbox, Divider, Tooltip } from '@mui/material';
import { StarBorder, Star, SpaceDashboard } from '@mui/icons-material';
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

//
function BoardBar() {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.customTrello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: 2,
        overflowX: 'auto'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ marginLeft: '1.5rem' }}>
          <NameBoard name="Study MERN" />
        </Box>
        <Checkbox
          icon={<StarBorder color="primary" fontSize="small" />}
          checkedIcon={<Star fontSize="small" />}
        />
        <ChangeVisibility />
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
        <MoreVertIcon color="primary" />
      </Box>
    </Box>
  );
}

export default BoardBar;
