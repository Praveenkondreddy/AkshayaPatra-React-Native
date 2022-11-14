import {createStore} from 'redux';

//action types
export const LOGIN_UPDATE_DATA = 'user/loginUpdate';
export const CHANAGE_NAME = 'user/changeName';
export const LOGGIN_STATE = 'user/changeLoginState';
export const LOGGIN_RESPONSE = 'user/loginResponse';
export const RESET_LOGIN_STATE_DATA = 'user/resetLoginStateData';
const initialState = {
  fullName: 'Medical App',
  loggedIn: false,
  token: null,
  form: {
    userName: null,
    password: null,
  },
  data: {},

  errorMsg: {
    userName: null,
    password: null,
  },
};

//action Reducers
export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_UPDATE_DATA:
      return action.node
        ? {
            ...state,
            [action.node]: {...state[action.node], ...action.payload},
          }
        : {
            ...state,
            ...action.payload,
          };

    case CHANAGE_NAME:
      return {...state, fullName: action.payload};
    case LOGGIN_STATE:
      return {...state, ...action.payload};
    case LOGGIN_RESPONSE:
      return {...state, data: action.payload};

    case RESET_LOGIN_STATE_DATA:
      return initialState;
    default:
      return state;
  }
}

//export const getUserName=state=>state.user.name;

//or

export const getUserName = (state) => {
  return state.user.fullName.split(' ')[0];
};
export const getLogginData = (state) => {
  return state.user;
};

export const getProfileData = (state) => {
  return state.user;
};
//action creator
export const updateLoginData = (node, data) => ({
  type: LOGIN_UPDATE_DATA,
  payload: data,
  node,
});
//action creator
export const changeUserName = (data) => ({
  type: CHANAGE_NAME,
  payload: data,
});

export const updateLoginReponse = (data) => ({
  type: LOGGIN_RESPONSE,
  payload: data,
});

export const updateprofileReponse = (data) => ({
  type: LOGGIN_RESPONSE,
  payload: data,
});

//action creator
export const changeLoginState = (data) => ({
  type: LOGGIN_STATE,
  payload: data,
});

export const restLoginStateData = (data) => ({
  type: RESET_LOGIN_STATE_DATA,
});
