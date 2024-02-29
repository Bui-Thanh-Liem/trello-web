import React, { useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { StarBorder, Star } from '@mui/icons-material';

export default function StarFavourite({ checked }) {
  const [check, setCheck] = React.useState(false);

  useEffect(() => {
    setCheck(checked);
  }, [checked]);

  return (
    <Checkbox
      checked={check}
      icon={<StarBorder color="primary" fontSize="small" />}
      checkedIcon={<Star fontSize="small" />}
      onClick={() => setCheck((pre) => !pre)}
    />
  );
}
