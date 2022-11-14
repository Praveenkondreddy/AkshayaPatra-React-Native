//action types
export const REQUEST_CALL_BACK_UPDATE_DATA = 'user/requestCallBackUpdate';
export const REFERAL_LOADER_UPDATE = 'user/referalLoderUpdate';

export const RESET_REQ_CALL_STATE_DATA = 'user/requestCallBackStateData';
const initialState = {
  loader: {isLoading: false},
  form: {
    fname: null,
    lname: null,
    phoneNo: null,
    emailId: null,
    comments: null,
  },
  errorMsg: {
    fname: null,
    lname: null,
    phoneNo: null,
    emailId: null,
    comments: null,
  },
  required: {
    fname: true,
    lname: true,
    phoneNo: true,
    emailId: false,
    comments: false,
  },
};

//action Reducers
export function requestCallBackReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CALL_BACK_UPDATE_DATA:
      return {
        ...state,
        [action.node]: {
          ...state[action.node],
          [action.payload.key]: action.payload.value,
        },
      };
    case REFERAL_LOADER_UPDATE:
      return {...state, loader: action.payload};
    case RESET_REQ_CALL_STATE_DATA:
      return initialState;
    default:
      return state;
  }
}

//export const getUserName=state=>state.user.name;

//or

export const getReqCallBackData = (state) => {
  return state.reqCallBack;
};

//action creator
export const updateReqCallBackData = (node, data) => ({
  type: REQUEST_CALL_BACK_UPDATE_DATA,
  payload: data,
  node,
});
export const updateLoaderReferalData = (key, data) => ({
  type: REFERAL_LOADER_UPDATE,
  payload: data,
  key,
});
export const resetReqCallBackState = () => ({
  type: RESET_REQ_CALL_STATE_DATA,
});
