import { Container } from '@mui/material';
import { useEffect, useState } from 'react';

//
import AppBar from '~/components/AppBar/';
import BoardBar from './BoardBar';
import BoardContent from './BoardContent';
import DrawerLeft from './DrawerLeft';
// import { mockData } from '~/apis/mockData';
import { fetchBoardDetailsAPI } from '~/apis';

const Broad = () => {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = '65e009d51e0c8c9ce92f18fd';

    // Call API
    fetchBoardDetailsAPI(boardId).then((board) => {
      setBoard(board);
    });
  }, []);

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <DrawerLeft
        bar={<BoardBar board={board} />}
        content={<BoardContent board={board} />}
      />
    </Container>
  );
};

export default Broad;
