import {getRequest, postRequest} from './apiRequest';
import {GET_API_SERVICE_URL, GET_WF_EVENT_ID} from './apiURL';

/**
 * @method apiGetMyPolicies
 * @description used to get my policies data
 */
export async function apiGetMyPolicies(requestobj) {
  return await postRequest(
    // `${GET_API_SERVICE_URL.GET_DATA}?WF_EVENT_ID=${GET_WF_EVENT_ID.GET_MY_POLICIES}&appinput.memberid=${requestobj.memberId}`,
    `${GET_API_SERVICE_URL.GET_POLICY_DATA}?compId=001&memberId=${requestobj.memberId}`,
  );
}
/**
 * @method apiGetPoliciesMember
 * @description used to get policies member details
 */
export async function apiGetPoliciesMember(requestobj) {
  console.log('ID', requestobj.policyId + ' - ' + requestobj.memberId);
  return await postRequest(
    // `${GET_API_SERVICE_URL.GET_DATA}?WF_EVENT_ID=${GET_WF_EVENT_ID.GET_POLICY_MEMBER}&appinput.policyid=${requestobj.policyId}`,
    `${GET_API_SERVICE_URL.GET_POLICY_MEMBER_DATA}?memberId=${requestobj.memberId}&compId=001&policyId=${requestobj.policyId}`,
  );
}

/**
 * @method apiGetMemeberClaims
 * @description used to get member claims details
 */
export async function apiGetMemeberClaims(requestobj) {
  return await postRequest(GET_API_SERVICE_URL.GET_MEMBER_CLIAMS, requestobj);
}

/**
 * @method apiGetMemeberClaimsDetails
 * @description used to get member claims details
 */
export async function apiGetMemeberClaimsDetails(requestobj) {
  return await getRequest(
    `${GET_API_SERVICE_URL.GET_MEMBER_CLIAMS_DETAILS}?sgsId=${requestobj.sgsId}`,
  );
}

/**
 * @method apiGetMemberBenefits
 * @description used to get member benefits details
 */
export async function apiGetMemberBenefits(requestobj) {
  console.log('Benefits' + requestobj.memberId + ' - ' + requestobj.policyId);
  return await postRequest(
    // `${GET_API_SERVICE_URL.GET_DATA}?WF_EVENT_ID=${GET_WF_EVENT_ID.GET_MEMBER_BENEGITS}&appinput.policyid=${requestobj.policyId}&appinput.memberid=${requestobj.memberId}`,
    `${GET_API_SERVICE_URL.GET_POLICY_BENEBITS_DATA}?memberId=${requestobj.memberId}&compId=001&policyId=${requestobj.policyId}`,
  );
}

/**
 * @method apiGetMemberSubBenefits
 * @description used to get member sub benefits details
 */
export async function apiGetMemberSubBenefits(requestobj) {
  return await postRequest(
    // `${GET_API_SERVICE_URL.GET_DATA}?WF_EVENT_ID=${GET_WF_EVENT_ID.GET_MEMBER_SUB_BENEGITS}&appinput.policyid=${requestobj.policyId}&appinput.memberid=${requestobj.memberId}&appinput.parentid=${requestobj.parentId}`,
    `${GET_API_SERVICE_URL.GET_POLICY_SUB_BENEBITS_DATA}?memberId=${requestobj.memberId}&compId=001&policyId=${requestobj.policyId}&benefitGroupId=${requestobj.parentId}`,
  );
}

/**
 * @method apiGetDiagonsisDetails
 * @description used to get Diagonsis details
 */
export async function apiGetDiagonsisDetails(requestobj) {
  return await postRequest(GET_API_SERVICE_URL.GET_DIAGONSIS, requestobj);
}

export async function apiGetInstitutionNameDetails(requestobj) {
  return await postRequest(
    GET_API_SERVICE_URL.GET_INSTITUTION_NAME_DETAILS,
    requestobj,
  );
}

/**
 * @method apiSaveRefContact
 * @description Save the Referal Contact Details
 */
export async function apiSaveRefContact(requestobj) {
  return await postRequest(
    GET_API_SERVICE_URL.SAVE_REFERAL_CONTACT,
    requestobj,
  );
}

/**
 * @method apiGenerateOTP
 * @description generate OTP via REST client
 */
export async function apiGenerateOTP(requestobj) {
  return await postRequest(
    `${GET_API_SERVICE_URL.GENERATE_OTP}/?memberId=${requestobj.memberId}&policyNo=${requestobj.policyNo}`,
    requestobj,
  );
}

/**
 * @method apiValidateOTP
 * @description Validated user level OTP via REST client
 */
export async function apiValidateOTP(requestobj) {
  return await getRequest(
    `${GET_API_SERVICE_URL.VALIDATE_OTP}/?otp=${requestobj.otp}&memberId=${requestobj.memberId}&policyNo=${requestobj.policyNo}`,
  );
}

/**
 * @method apiSignup
 * @description Register the new user via app
 */
export async function apiSignup(requestobj) {
  return await getRequest(
    `${GET_API_SERVICE_URL.SIGNUP}/?policyNo=${requestobj.policyNo}&memberId=${requestobj.memberId}&usertype=${requestobj.usertype}`,
  );
}

/**
 * @method apiForgotPassword
 * @description Reset the password by user based on Input request via Rest Client
 */
export async function apiForgotPassword(requestobj) {
  return await postRequest(GET_API_SERVICE_URL.FORGOT_PASSWORD, requestobj);
}

/**
 * @method apiChangePassword
 * @description Change the password by user based on Input request via Rest Client
 */
export async function apiChangePassword(requestobj) {
  return await postRequest(GET_API_SERVICE_URL.CHANGE_PASSWORD, requestobj);
}

/**
 * @method apiSignIn
 * @description Api SignIn request via Rest Client
 */
export async function apiSignIn(requestobj) {
  return await postRequest(GET_API_SERVICE_URL.GUEST_USER_SIGNUP, requestobj);
}
/**
 * @method apiGetMemberProfileData
 * @description GetMemberProfile request via Rest Client
 */

export async function apiGetMemberProfileData(requestobj) {
  return await postRequest(GET_API_SERVICE_URL.MEMBER_PROFILE_DATA, requestobj);
}
/**
 * @method apiGetMemberProfile
 * @description GetMemberProfile request via Rest Client
 */
export async function apiGetMemberProfile(requestobj) {
  return await postRequest(GET_API_SERVICE_URL.MEMBER_PROFILE, requestobj);
}

export async function apiGuestUserSignUp(requestobj) {
  return await postRequest(GET_API_SERVICE_URL.GUEST_USER_SIGNUP, requestobj);
}
/**
 * @method apiSaveNewClaim
 * @description Save the new claims data
 */
export async function apiSaveNewClaim(requestobj) {
  return await postRequest(GET_API_SERVICE_URL.SAVE_NEW_CLAIM, requestobj);
}

export async function apidocumentscanner(requestobj) {
  return await postRequest(GET_API_SERVICE_URL.SCANDOCUMENT, requestobj);
}

/**
 * @method apiUdsDefnData
 * @description Fetch the common definiation data
 */
export async function apiCommonDefnData(requestobj) {
  return await postRequest(GET_API_SERVICE_URL.UDS_DEFN_DATA, requestobj);
}
