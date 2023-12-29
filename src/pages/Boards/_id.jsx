import { Container } from '@mui/material';

import AppBar from '../../components/AppBar/idnex';
import BoardBar from './BoardBar';
import BoardContent from './BoardContent';

const Broad = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  );
};

export default Broad;
