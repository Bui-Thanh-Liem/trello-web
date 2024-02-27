import { Container } from '@mui/material';
import { useEffect, useState } from 'react';

//
import AppBar from '~/components/AppBar/';
import BoardBar from './BoardBar';
import BoardContent from './BoardContent';
import DrawerLeft from './DrawerLeft';
import { mockData } from '~/apis/mockData';
import { fetchBoardDetailsAPI } from '~/apis';

const Broad = () => {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = '65dae35b8bc14e5495f6cd64';

    // Call API
    fetchBoardDetailsAPI(boardId)
      .then((board) => {
        console.log('board', board);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <DrawerLeft
        bar={<BoardBar board={mockData?.board} />}
        content={<BoardContent board={mockData?.board} />}
      />
    </Container>
  );
};

export default Broad;
