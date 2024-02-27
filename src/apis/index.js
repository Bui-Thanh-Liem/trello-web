import { API_ROOT } from '~/utils/constants';
import axios from 'axios';

export const fetchBoardDetailsAPI = async (boardId) => {
  const reponse = await axios.get(`${API_ROOT}/v1/board/${boardId}`);
  return reponse.data;
};
