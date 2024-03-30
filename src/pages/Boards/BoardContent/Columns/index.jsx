import { useState } from 'react';
import { Box, Button, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

//
import Column from './Column';
import { boardSelector } from '~/redux/selectors/boardSelector';
import { createNewColumn } from '~/redux/thunk/column';

export default function Columns({ columns }) {
  const [openFormCreateColumn, setOpenFormCreateColumn] = useState(false);
  const [valueInputNewColumn, setValueInputNewColumn] = useState('');
  const dispatch = useDispatch();
  const board = useSelector(boardSelector);

  const toggleOpenFormCreateColumn = () => {
    setOpenFormCreateColumn(!openFormCreateColumn);
    setValueInputNewColumn('');
  };

  const handleKeyDownInputNewColumn = (e) => {
    if (e.keyCode !== 13) return;
    if (!valueInputNewColumn.trim()) {
      toast.error('Please enter a new column title.');
      return;
    }
    dispatch(
      createNewColumn({
        title: valueInputNewColumn,
        boardId: board._id
      })
    );
    toggleOpenFormCreateColumn();
  };

  const handleClickAddList = () => {
    if (!valueInputNewColumn.trim()) {
      toast.error('Please enter a new column title.');
      return;
    }

    dispatch(
      createNewColumn({
        title: valueInputNewColumn,
        boardId: board._id
      })
    );
    toggleOpenFormCreateColumn();
  };

  // SortableContext yêu cầu items là một dạng ['id-1', 'id-2'] chứ không phải dạng [{ id: 'id-1'}, { id: 'id-2'}]
  return (
    <SortableContext
      items={columns?.map((column) => column._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          maxWidth: '100vw',
          overflowX: 'auto',
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'primary.light',
            borderRadius: '10px'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'primary.dark'
          }
        }}
      >
        {columns?.map((column) => (
          <Column column={column} key={column._id} />
        ))}

        {/* Button Add Columms */}
        <Box
          sx={{
            marginLeft: '.7rem',
            borderRadius: '8px',
            bgcolor: '#ffffff3d',
            maxWidth: '272px',
            minWidth: '272px',
            height: 'fit-content'
          }}
        >
          {!openFormCreateColumn ? (
            <Button
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                paddingLeft: '1rem',
                paddingY: '.6rem',
                color: '#fff'
              }}
              startIcon={<AddIcon />}
              onClick={toggleOpenFormCreateColumn}
            >
              Add another list
            </Button>
          ) : (
            <Box
              sx={{ p: 1, bgcolor: '#fff', borderRadius: 2, transition: '2s' }}
            >
              <form action="" onSubmit={(e) => e.preventDefault()}>
                <TextField
                  id=""
                  label="New board name..."
                  size="small"
                  variant="outlined"
                  autoFocus={true}
                  sx={{
                    minWidth: 120,
                    borderRadius: 1,
                    border: 'none',
                    outline: 'none',
                    bgcolor: '#fff',
                    width: '100%'
                  }}
                  value={valueInputNewColumn}
                  onChange={(e) => setValueInputNewColumn(e.target.value)}
                  onKeyDown={handleKeyDownInputNewColumn}
                />
                <Box sx={{ marginTop: 0.5 }}>
                  <Button
                    color="success"
                    variant="contained"
                    size="small"
                    onClick={handleClickAddList}
                  >
                    Add list
                  </Button>
                  <IconButton>
                    <CloseIcon
                      color="error"
                      onClick={toggleOpenFormCreateColumn}
                    />
                  </IconButton>
                </Box>
              </form>
            </Box>
          )}
        </Box>
      </Box>
    </SortableContext>
  );
}
