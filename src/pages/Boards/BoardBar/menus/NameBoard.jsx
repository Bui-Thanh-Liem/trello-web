import React from 'react';
import { Button, Tooltip, Input } from '@mui/material';

export default function NameBoard({ name }) {
  const [showInput, setShowInput] = React.useState(false);
  const [textField, setTextField] = React.useState(name);

  const handleChangeTextField = (e) => {
    e.target.value.length > 40 ? '' : setTextField(e.target.value);
  };

  const handleCloseInputWhenNull = () => {
    setTextField(name);
    setShowInput(false);
  };

  return (
    <>
      {showInput ? (
        <Input
          sx={{ color: 'primary.main', fontWeight: 'bold' }}
          value={textField}
          autoFocus={true}
          size="small"
          onChange={handleChangeTextField}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              textField.trim() === ''
                ? handleCloseInputWhenNull()
                : setShowInput(false);
            }
          }}
          onBlur={() => {
            textField.trim() === ''
              ? handleCloseInputWhenNull()
              : setShowInput(false);
          }}
          placeholder=""
          variant="plain"
        />
      ) : (
        <Tooltip title="Click To change">
          <Button
            sx={{
              '&:hover': { bgcolor: '#e0f2f0' },
              fontWeight: 'bold',
              fontSize: '1.2rem',
              lineHeight: 1.2
            }}
            onClick={() => setShowInput(true)}
          >
            {textField}
          </Button>
        </Tooltip>
      )}
    </>
  );
}
