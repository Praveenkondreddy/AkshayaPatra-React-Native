import {Alert} from 'react-native';
import {
  apiCommonDefnData,
  apiGetDiagonsisDetails,
  apiGetInstitutionNameDetails,
  apiGetMyPolicies,
  apiGetPoliciesMember,
} from '../api/apiHelper';
import {showAlert} from '../commonHelper/alertHelper';

//action types
export const UPDATE_DATA = 'newClaims/updateNewCliamsData';
export const CLAIM_LOADER_UPDATE = 'newClaims/updateNewCliamsLoaderData';
export const RESET_NEW_CLAIMS_STATE_DATA = 'newClaims/resetNewClaimStateData';
const initialState = {
  loader: {isLoading: false},
  claims: {
    form: {
      policyNo: '', //'MED/2021/00671'
      claimant: null,
      memberId:null,
      consAdminDate: null,
      claimReason: null,
      InstitutionNameReasion: '',
      claimAmount: null,
      treatmentType: null,
      toothNumber: null,
      remarks: null,
      additionalRemarks: null,
    },
    policies: [],
    policyMembers: [],
    claimReasonsList: [],
    InstitutionNameList: [],
    treatmentTypes: [],
    search: null,
    errorMsg: {
      policyNo: null,
      claimant: null,
      consAdminDate: null,
      claimAmount: null,
      claimReason: null,
      InstitutionNameReasion: null,
      treatmentType: null,
      toothNumber: null,
      remarks: null,
      additionalRemarks: null,
    },
    required: {
      policyNo: true,
      claimant: true,
      consAdminDate: true,
      claimAmount: true,
      claimReason: false,
      InstitutionNameReasion: false,
      treatmentType: true,
      toothNumber: false,
      remarks: false,
      additionalRemarks: false,
    },
  },
  upload: {
    files: [],
    filesTypes: [],
    errorMsg: null,
    docTypes: [],
    docType: null,
    open: false,
  },
};

//action Reducers
export const updateLoaderClaimData = (key, data) => ({
  type: CLAIM_LOADER_UPDATE,
  payload: data,
  key,
});

export function newClaimReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DATA:
      return {
        ...state,
        [action.node]: {...state[action.node], [action.key]: action.payload},
      };
    case CLAIM_LOADER_UPDATE:
      return {...state, loader: action.payload};
    case RESET_NEW_CLAIMS_STATE_DATA:
      const tempState = initialState;
      tempState.upload = {
        files: [],
        filesTypes: [],
        errorMsg: null,
        docTypes: [],
        docType: null,
      };
      return tempState;
    default:
      return state;
  }
}

export const getNewCliamData = (state) => {
  return state.newClaims;
};

//action creator
export const updateNewClaimsDetails = (node, key, data) => ({
  type: UPDATE_DATA,
  payload: data,
  node,
  key,
});

export const resetNewClaimsStateData = () => ({
  type: RESET_NEW_CLAIMS_STATE_DATA,
  payload: initialState,
});

export function getDiagonsisDetails(requestData) {
  return async function getDiagonsisDetailsThunk(dispatch, getState) {
    const state = getState();
    dispatch(updateLoaderClaimData('loader', {isLoading: true}));
    try {
      const response = await apiGetDiagonsisDetails(requestData);

      const {status, data} = response.data;

      if (status === 'success') {
        dispatch(
          updateNewClaimsDetails('claims', 'claimReasonsList', data.details),
        );
      }
    } catch (error) {
      showAlert(error.message, false);
    } finally {
      dispatch(updateLoaderClaimData('loader', {isLoading: false}));
    }
  };
}

export function getInstitutionName(requestData) {
  return async function getInstitutionNameThunk(dispatch, getState) {
    const state = getState();
    dispatch(updateLoaderClaimData('loader', {isLoading: true}));
    try {
      console.log(requestData);
      const response = await apiGetInstitutionNameDetails(requestData);
      const {status, data} = response.data;
      if (status === 'success') {
        console.log('Success' + JSON.stringify(response.data));
        dispatch(
          updateNewClaimsDetails('claims', 'InstitutionNameList', data.details),
        );
      }
    } catch (error) {
      showAlert(error.message, false);
    } finally {
      dispatch(updateLoaderClaimData('loader', {isLoading: false}));
    }
  };
}

export function getTreatmentTypeData(requestData) {
  return async function getTreatmentTypeDataThunk(dispatch, getState) {
    dispatch(updateLoaderClaimData('loader', {isLoading: true}));
    try {
      const state = getState();
      const response = await apiCommonDefnData(requestData);

      if (response.data.length > 0) {
        response.data.map((dt) => {
          if (dt.description === 'MedicalExpense') {
            dt.description = 'Medical Expense';
          }
        });
        console.log('treatmentTypes : ' + JSON.stringify(response.data));
        dispatch(
          updateNewClaimsDetails('claims', 'treatmentTypes', response.data),
        );
      }
    } catch (error) {
      showAlert(error.message, false);
    } finally {
      dispatch(updateLoaderClaimData('loader', {isLoading: false}));
    }
  };
}

export function getDocumentTypeData(requestData) {
  return async function getDocumentTypeDataThunk(dispatch, getState) {
    dispatch(updateLoaderClaimData('loader', {isLoading: true}));
    try {
      const state = getState();
      const response = await apiCommonDefnData(requestData);

      if (response.data.length > 0) {
        console.log('response.docdata : ' + JSON.stringify(response.data));
        dispatch(updateNewClaimsDetails('upload', 'docTypes', response.data));
        dispatch(
          updateNewClaimsDetails('upload', 'docType', response.data[0].id),
        );
      }
    } catch (error) {
      showAlert(error.message, false);
    } finally {
      dispatch(updateLoaderClaimData('loader', {isLoading: false}));
    }
  };
}
// dispatch(updateLoaderClaimData('loader', { isLoading: false }));

export function getPolicies(requestData) {
  return async function getPoliciesThunk(dispatch, getState) {
    dispatch(updateLoaderClaimData('loader', {isLoading: true}));
    try {
      const state = getState();
      const response = await apiGetMyPolicies(requestData);
      const res = response.data;
      const {data, status, message} = res;
      if (status === 'success') {
        dispatch(
          updateNewClaimsDetails('claims', 'policies', data.Policies.policy),
        );
        if (data.Policies.policy.length == 1) {
          dispatch(
            updateNewClaimsDetails('claims', 'form', {
              ...state.newClaims.claims.form,
              policyNo: data.Policies.policy[0].policyNumber,
            }),
          );

          dispatch(
            updateNewClaimsDetails('claims', 'errorMsg', {
              ...state.newClaims.claims.errorMsg,
              policyNo: null,
            }),
          );
          dispatch(
            getPolicyMembersData({
              policyId: data.Policies.policy[0].sgsId,
              memberId: data.Policies.policy[0].memberId,
            }),
          );
        }
      }
    } catch (error) {
      showAlert(error);
    } finally {
      dispatch(updateLoaderClaimData('loader', {isLoading: false}));
    }
  };
}

export function getPolicyMembersData(requestData) {
  return async function getPolicyMembersDataThunk(dispatch, getState) {
    dispatch(updateLoaderClaimData('loader', {isLoading: true}));
    try {
      const state = getState();
      const response = await apiGetPoliciesMember(requestData);
      const res = response.data;
      const {data, status, message} = res;
      if (status === 'success') {
        dispatch(
          updateNewClaimsDetails(
            'claims',
            'policyMembers',
            data.Members.Member,
          ),
        );

        if (data.Members.Member.length == 1) {
          dispatch(
            updateNewClaimsDetails('claims', 'form', {
              ...state.newClaims.claims.form,
              claimant: data.Members.Member[0].memberName,
              memberId: data.Members.Member[0].meMemberId
            }),
          );

          dispatch(
            updateNewClaimsDetails('claims', 'errorMsg', {
              ...state.newClaims.claims.errorMsg,
              claimant: null,
            }),
          );
        } else {
          dispatch(
            updateNewClaimsDetails('claims', 'form', {
              ...state.newClaims.claims.form,
              claimant: null,
            }),
          );

          dispatch(
            updateNewClaimsDetails('claims', 'errorMsg', {
              ...state.newClaims.claims.errorMsg,
              claimant: null,
            }),
          );
        }
      }
    } catch (error) {
      showAlert(error);
    } finally {
      dispatch(updateLoaderClaimData('loader', {isLoading: false}));
    }
  };
}
