import { Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

//
import AppBar from '~/components/AppBar/';
import BoardBar from './BoardBar';
import BoardContent from './BoardContent';
import DrawerLeft from './DrawerLeft';
import { boardSelector } from '~/redux/selectors/boardSelector';
import { fetchBoardDetails } from '~/redux/thunk/board';

const Broad = () => {
  const dispatch = useDispatch();
  const board = useSelector(boardSelector);

  useEffect(() => {
    // Call API
    const boardId = '65f9b47c1d87b9be4e71db17';
    dispatch(fetchBoardDetails(boardId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!board) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress />
        <Typography sx={{ marginLeft: 2 }}>
          This process takes about 10 seconds because the API server is a free
          server, please ❤️
        </Typography>
      </Box>
    );
  }

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
