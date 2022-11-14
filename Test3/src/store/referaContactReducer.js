import { apiCommonDefnData } from '../api/apiHelper';
import { showAlert } from '../commonHelper/alertHelper';

//action types
export const REFERAL_LOADER_UPDATE = 'user/referalLoderUpdate';
export const REFERAL_UPDATE_DATA = 'user/referalUpdate';

export const RESET_REF_STATE_DATA = 'user/resetRefStateData';
const initialState = {
  loader: { isLoading: false },
  relation: {
    form: {
      fname: null,
      lname: null,
      phoneNo: null,
      emailId: null,
      relationship: null,
    },
    relationShipsList: [],
    errorMsg: {
      fname: null,
      lname: null,
      phoneNo: null,
      emailId: null,
      relationship: null,
    },
    required: {
      fname: true,
      lname: true,
      phoneNo: true,
      emailId: true,
      relationship: true

    }
  }
};

//action Reducers
export function referAContactReducer(state = initialState, action) {
  switch (action.type) {
    case REFERAL_UPDATE_DATA:
      console.log(action)
      return {
        ...state,
        [action.node]: { ...state[action.node], [action.key]: action.payload },
      };
    case REFERAL_LOADER_UPDATE:
      return {...state, loader: action.payload}
    case RESET_REF_STATE_DATA:
      return initialState;
    default:
      return state;
  }
}

//export const getUserName=state=>state.user.name;

//or

export const getReferalData = (state) => {
  return state.referal;
};

//action creator
export const updateReferalData = (node, key, data) => ({
  type: REFERAL_UPDATE_DATA,
  payload: data,
  node,
  key,
});

export const updateLoaderReferalData = (key, data) => ({
  type: REFERAL_LOADER_UPDATE,
  payload: data,
  key
});

export const resetStateData = () => ({
  type: RESET_REF_STATE_DATA,
});

export function getRelationShipData(requestData) {
  return async function getRelationShipDataThunk(dispatch, getState) {
    // const state = getState();
    // dispatch(updateReferalData('loader', 'isLoading', true));
    try {
      const response = await apiCommonDefnData(requestData);
      // const { status, data } = response.data;
      if (response.data.length > 0) {
        console.log("Response" + JSON.stringify(response.data));
        dispatch(updateReferalData('relation', 'relationShipsList', response.data));
      }
      
          // dispatch(updateReferalData('loader', 'isLoading', false));

    } catch (error) {
      console.log("ERROR" + JSON.stringify(error));
      showAlert(error.message, false);
    } finally {
      dispatch(updateReferalData('loader', { isLoading: false }));
    }
  };
}
