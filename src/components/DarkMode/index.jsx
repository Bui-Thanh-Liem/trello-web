import { useColorScheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
// import useMediaQuery from '@mui/material/useMediaQuery';
import { LightMode, DarkMode, SettingsBrightness } from '@mui/icons-material';

function DarkModeSelect() {
  const { mode, setMode } = useColorScheme();

  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');

  // Handle change events
  const handleChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value={'light'}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LightMode fontSize="small" color="error" />
            Light
          </Box>
        </MenuItem>
        <MenuItem value={'dark'}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <DarkMode fontSize="small" color="warning" />
            Dark
          </Box>
        </MenuItem>
        <MenuItem value={'system'}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SettingsBrightness fontSize="small" color="primary" />
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default DarkModeSelect;
