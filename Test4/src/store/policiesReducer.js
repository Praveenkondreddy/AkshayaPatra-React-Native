import {
  apiGetMemberBenefits,
  apiGetMyPolicies,
  apiGetPoliciesMember,
  apiGetMemberSubBenefits,
  apiGetMemeberClaims,
  apiGetMemeberClaimsDetails,
} from '../api/apiHelper';
import {Alert} from 'react-native';

// Initial State Declaration
const initialState = {
  loader: false,
  policies: [],
  policyMembers: [],
  claims: [],
  memberBenefits: [],
  memberSubBenefits: [],
  routesParams: {
    policy: {},
    member: {},
    claim: {},
  },
  claimsDetails: {},
};

//action types
export const POLICIES_UPDATE_DATA = 'policies/updatePolicyData';
export const POLICIES_UPDATE_MEMBER_SUB_BENEFITS = 'policies/memberSubBenefits';
export const RESET_POLOCIES_STATE_DATA = 'policies/resetPoliciesStateData';
//action Reducers
export function policiesReducer(state = initialState, action) {
  switch (action.type) {
    case POLICIES_UPDATE_DATA:
      return {
        ...state,
        [action.node]: action.payload,
      };

    case POLICIES_UPDATE_MEMBER_SUB_BENEFITS:
      const index = state.memberBenefits.findIndex(
        (benefits) => benefits.cvMstId === action.other.parentId,
      );
      let _memberBenefits = Object.assign({}, state.memberBenefits);
      _memberBenefits[index].memberSubBenefits = action.payload;

      return {
        ...state,
        memberSubBenefits: action.payload,
      };
    case RESET_POLOCIES_STATE_DATA:
      return initialState;
    default:
      return state;
  }
}

export const getPoliciesData = (state) => {
   return state.policies;
};

//action creator
export const updatePolicyData = (node, key, data) => ({
  type: POLICIES_UPDATE_DATA,
  payload: data,
  node,
  key,
});
export const resetStateData = () => ({
  type: RESET_POLOCIES_STATE_DATA,
});
export function getMyPolicies(requestData) {
  return async function getMyPoliciesThunk(dispatch, getState) {
    dispatch(updatePolicyData('loader', null, true));
    try { 
       const state = getState();
      const response = await apiGetMyPolicies(requestData);
       const res = response.data;
       console.log("JK",JSON.stringify(response.data));
      const {data, status, message} = res;
         if (status === 'success') {
          console.log("status",data.Policies.policy);
        dispatch(updatePolicyData('policies', null, data.Policies.policy));
      }
    } catch (error) {
      showAlert(error);
    } finally {
      dispatch(updatePolicyData('loader', null, false));
    }
  };
}

export function getPolicyMembers(requestData) {
  return async function getPolicyMembersThunk(dispatch, getState) {
    dispatch(updatePolicyData('loader', null, true));
    try { 
      const state = getState();
      const response = await apiGetPoliciesMember(requestData);
      const res = response.data;
      const {data, status, message} = res;
       if (status === 'success') {
        console.log("status",data.Members.Member);
        dispatch(updatePolicyData('policyMembers', null, data.Members.Member));
      }
    } catch (error) {
      showAlert(error);
    } finally {
      dispatch(updatePolicyData('loader', null, false));
    }
  };
}

export function getMembersClaims(requestData) {
  return async function getMembersClaimsThunk(dispatch, getState) {
    const state = getState();
    dispatch(updatePolicyData('loader', null, true));

    try {
      const response = await apiGetMemeberClaims(requestData);
      const {data, status, message} = response.data;
 

      if (status === 'success') {
        dispatch(updatePolicyData('claims', null, data.claims));
      }
    } catch (error) {
      showAlert(error);
    } finally {
      dispatch(updatePolicyData('loader', null, false));
    }
  };
}
export function getMembersClaimsDetails(requestData) {
  return async function getMembersClaimsDetailsThunk(dispatch, getState) {
    const state = getState();
    dispatch(updatePolicyData('loader', null, true));
    try {
      const response = await apiGetMemeberClaimsDetails(requestData);
       const {data, status, message} = response.data;
      if (status === 'success') {
        dispatch(updatePolicyData('claimsDetails', null, data.details));
      }
    } catch (error) {
      showAlert(error);
    } finally {
      dispatch(updatePolicyData('loader', null, false));
    }
  };
}

export function getMemberBenefits(requestData) {
  return async function getMemberBenefitsThunk(dispatch, getState) {
    dispatch(updatePolicyData('loader', null, true));
    try {
      const state = getState();
      const response = await apiGetMemberBenefits(requestData);

      const res = response.data;
      const {data, status, message} = res;
      //let _tempId = 10000;
      if (status === 'success') {
        for (const object of data.Benifits.Benifit) {
          object['memberSubBenefits'] = [];
        }

        dispatch(
          updatePolicyData('memberBenefits', null, data.Benifits.Benifit),
        );
      }
    } catch (error) {
      showAlert(error);
    } finally {
      dispatch(updatePolicyData('loader', null, false));
    }
  };
}

export function getMemberSubBenefits(requestData) {
  return async function getMemberSubBenefitsThunk(dispatch, getState) {
    dispatch(updatePolicyData('loader', null, true));
    try {
      const state = getState();
      const response = await apiGetMemberSubBenefits(requestData);

      const res = response.data;
      const {data, status, message} = res;
      if (status === 'success') {
        dispatch({
          type: POLICIES_UPDATE_MEMBER_SUB_BENEFITS,
          payload: data.SubBenefits.SubBenefit,
          other: {parentId: requestData.parentId},
        });
      }
    } catch (error) {
      showAlert(error);
    } finally {
      dispatch(updatePolicyData('loader', null, false));
    }
  };
}

function showAlert(error) {
  Alert.alert('Error ', JSON.stringify(error.message));
}
