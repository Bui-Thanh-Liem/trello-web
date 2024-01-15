import { Container } from '@mui/material';
//
import AppBar from '~/components/AppBar/';
import BoardBar from './BoardBar';
import BoardContent from './BoardContent';
import DrawerLeft from './DrawerLeft';
import { mockData } from '~/apis/mockData';

const Broad = () => {
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
