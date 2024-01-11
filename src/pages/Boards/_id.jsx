import { Container } from '@mui/material';

import AppBar from '~/components/AppBar/';
import BoardBar from './BoardBar';
import BoardContent from './BoardContent';
import Layout_id from './Layout_id';

const Broad = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <Layout_id bar={<BoardBar />} content={<BoardContent />}/>
    </Container>
  );
};

export default Broad;
