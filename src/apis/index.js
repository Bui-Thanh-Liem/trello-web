// axios.interceptors.request.use() để đăng ký interceptor request
// axios.interceptors.response.use() để đăng ký interceptor response.

import { API_ROOT } from '~/utils/constants';
import axios from 'axios';

// Board
export const fetchBoardDetailsAPI = async (boardId) => {
  const reponse = await axios.get(`${API_ROOT}/v1/board/${boardId}`);
  return reponse.data;
};

// Column
export const createNewColumnAPI = async (dataNewColumn) => {
  const newCol = await axios.post(`${API_ROOT}/v1/columns`, dataNewColumn);
  return newCol.data;
};

// Card
export const createNewCardAPI = async (dataNewCard) => {
  const newCard = axios.post(`${API_ROOT}/v1/cards`, dataNewCard);
  return newCard.data;
};