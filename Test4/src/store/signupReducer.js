import {Alert} from 'react-native';
import {
  apiGetMemberProfile,
  apiGetMemberProfileData,
  apiGuestUserSignUp,
} from '../api/apiHelper';
import {storeStringData, getStringData} from '../api/localstorage';
//action types
export const SIGNUP_UPDATE_DATA = 'user/signupUpdate';
export const SIGNUP_MEMBER_DATA = 'user/getmember';
export const SIGNUP_GUESTUSERDATA = 'user/guestuserdata';
export const RESET_SIGNUP_STATE_DATA = 'user/resetSignupStateData';
const initialState = {
  loader: false,
  form: {
    memberId: null,
    phoneNo: ' ',
    emailId: ' ',
    policyNo: null,
  },
  errorMsg: {
    memberId: null,
    policyNo: null,
    otp: null,
  },
  otpForm: {
    otp1: null,
    otp2: null,
    otp3: null,
    otp4: null,
  },
  memberProfile: {},
  memberProfileData: {},
  getGuestUserData: {},
};

//action Reducers
export function signupReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_UPDATE_DATA:
      return {
        ...state,
        [action.node]: {...state[action.node], ...action.payload},
      };
    case SIGNUP_MEMBER_DATA:
      return {
        ...state,
        [action.node]: action.payload,
      };
    case RESET_SIGNUP_STATE_DATA:
      return JSON.parse(JSON.stringify(initialState));
    default:
      return state;
  }
}

//export const getUserName=state=>state.user.name;

//or

export const getSignupData = (state) => {
  return state.signup;
};

export const getMemberData = (state) => {
  return state.signup;
};

//action creator
export const updateSignupData = (node, data) => ({
  type: SIGNUP_UPDATE_DATA,
  payload: data,
  node,
});
export const updateSignupMemberData = (node, data) => ({
  type: SIGNUP_MEMBER_DATA,
  payload: data,
  node,
});

export const resetStateData = () => ({
  type: RESET_SIGNUP_STATE_DATA,
});
export function getGuestUserData(requestData) {
  return async function getGuestUserDataThunk(dispatch, getState) {
    try {
      const state = getState();
      const response = await apiGuestUserSignUp(requestData);
      const {status, data, message} = response.data;
      console.log('response', data.token);
      if (response.data) {
        await storeStringData('token', data.token);
        dispatch(updateSignupData('guestUserData', data));
        ///await setStringValue("token",response.data.data.token);
      }
    } catch (error) {
      showAlert(error);
    } finally {
      dispatch(updateSignupData('loader', false));
    }
  };
}

export function getMemberProfile(requestData) {
  return async function getMemberProfileThunk(dispatch, getState) {
    try {
      const state = getState();
      const response = await apiGetMemberProfile(requestData);

      if (response.data) {
        dispatch(updateSignupData('memberProfile', response.data));
      }
    } catch (error) {
      showAlert(error);
    } finally {
      dispatch(updateSignupData('loader', false));
    }
  };
}

export function getMemberProfileData(requestData) {
  return async function getMemberProfileDataThunk(dispatch, getState) {
    try {
      const state = getState();
      const response = await apiGetMemberProfileData(requestData);
      console.log('JK' + JSON.stringify(response.data));
      if (response.data) {
        dispatch(updateSignupMemberData('memberProfileData', response.data));
      }
    } catch (error) {
      showAlert(error);
    } finally {
      //  dispatch(updateSignupMemberData('loader', false));
    }
  };
}
function showAlert(error) {
  Alert.alert('Error ', JSON.stringify(error.message));
}
