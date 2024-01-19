import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable';
//
import Column from './Column';

export default function Columns({ columns }) {
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
          <Button
            sx={{
              width: '100%',
              justifyContent: 'flex-start',
              paddingLeft: '1rem',
              paddingY: '.6rem',
              color: '#fff'
            }}
            startIcon={<AddIcon />}
          >
            Add another list
          </Button>
        </Box>
      </Box>
    </SortableContext>
  );
}
