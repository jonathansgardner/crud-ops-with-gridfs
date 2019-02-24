import {
  GET_FILES,
  UPLOAD_FILE,
  UPDATE_FILE,
  DELETE_FILE
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_FILES:
      const reducedPayload = action.payload.reduce((obj, item) => {
        obj[item.filename] = item;
        return obj;
      }, {});
      return { ...state, ...reducedPayload };
    case UPLOAD_FILE:
    case UPDATE_FILE:
      return { ...state, [ action.payload.filename ]: action.payload };
    case DELETE_FILE:
      const { [action.payload]: deleted, ...newState } = state;
      return newState;
    default:
      return state;
  }
};
