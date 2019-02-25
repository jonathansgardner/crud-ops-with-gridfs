import files from '../apis/filesApi'
import { GET_FILES, UPLOAD_FILE, UPDATE_FILE, DELETE_FILE } from './types';

export const getFiles = () => async dispatch => {
  const response = await files.get('/');

  dispatch({
    type: GET_FILES,
    payload: response.data
  });
}

export const uploadFile = formData => async dispatch => {
  const response = await files.post('/upload', formData);

  dispatch({
    type: UPLOAD_FILE,
    payload: response.data
  });
}

export const updateFile = (filename, data) => async dispatch => {
  const response = await files.patch(`/update/${ filename }`, data);

  dispatch({
    type: UPDATE_FILE,
    payload: response.data
  });
}

export const deleteFile = filename => async dispatch => {
  const response = await files.delete(`/delete/${ filename }`);

  dispatch({
    type: DELETE_FILE,
    payload: response.data
  });
}
