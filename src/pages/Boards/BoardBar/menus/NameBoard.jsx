import { Button, TextField, Tooltip } from '@mui/material';
import React from 'react';

export default function NameBoard({ name }) {
  const [showInput, setShowInput] = React.useState(false);
  const [textField, setTextField] = React.useState(name);

  const handleChangeTextField = (e) => {
    if (e.target.value.length === 40) {
      return;
    }
    setTextField(e.target.value);
  };

  return (
    <>
      {showInput ? (
        <TextField
          size="small"
          label="Change name board"
          variant="outlined"
          value={textField}
          autoFocus={true}
          onChange={handleChangeTextField}
          onKeyDown={(e) => {
            if (e.keyCode === 13 && textField !== '') setShowInput(false);
          }}
          onBlur={() => {
            if (textField !== '') setShowInput(false);
          }}
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
