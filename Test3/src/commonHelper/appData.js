export const APP_DATA = {
  STACK_SCREENS: {
    HOME: {NAME: 'Home', TITLE: 'Home', LABEL: 'HOME'},
    LOGIN: {NAME: 'Login', TITLE: 'Login'},
    SPLASH: {NAME: 'Splash', TITLE: 'Splash'},
    SIGNUP: {NAME: 'SignUp', TITLE: 'SignUp'},
    OTP: {NAME: 'OTP', TITLE: 'OTP'},
    OTPS: {NAME: 'OTPSuccess', TITLE: 'OTPSuccess'},
    MYPROFILE: {NAME: 'MyProfile', TITLE: 'MyProfile', LABEL: 'MY PROFILE'},
    NOTIFICATION: {NAME: 'Notifications', TITLE: 'Notifications'},
    ACCOUNT: {NAME: 'AccountSettings', TITLE: 'AccountSettings'},
    HELP: {NAME: 'Help', TITLE: 'Help'},
    MYPOLICIES: {NAME: 'MyPolicies', TITLE: 'MyPolicies'},
    POLICYDET: {NAME: 'MyPolicyDetail', TITLE: 'MyPolicyDetail'},
    BENEFITS: {NAME: 'MyBenefits', TITLE: 'MyBenefits'},
    MYCLAIMS: {NAME: 'MyClaims', TITLE: 'MyClaims'},
    CLAIMSDET: {NAME: 'ClaimsDetails', TITLE: 'ClaimsDetails'},
    REFACONTACT: {NAME: 'ReferAContact', TITLE: 'ReferAContact'},
    REFACONTACTS: {NAME: 'ReferAContactSuccess', TITLE: 'ReferAContactSuccess'},
    USEFULTIPS: {NAME: 'UsefulTips', TITLE: 'UsefulTips'},
    CONTACTUS: {NAME: 'ContactUs', TITLE: 'ContactUs'},
    FAQS: {NAME: 'FAQs', TITLE: 'FAQs'},
    NEWCLAIM: {NAME: 'NewClaims', TITLE: 'NewClaims'},
    NEWCLAIMS: {NAME: 'NewClaimsSuccess', TITLE: 'NewClaimsSuccess'},
    FORGOTPASSWORD: {NAME: 'ForgotPassword', TITLE: 'ForgotPassword'},
    FORGOTPASSWORDS: {
      NAME: 'ForgotPasswordSuccess',
      TITLE: 'ForgotPasswordSuccess',
    },
    CHANGEPASSWORD: {NAME: 'ChangePassword', TITLE: 'ChangePassword'},
    CHANGEPASSWORDS: {
      NAME: 'ChangePasswordSuccess',
      TITLE: 'ChangePasswordSuccess',
    },
    SEARCH: {
      NAME: 'Search',
      TITLE: 'Search',
    },
    SEARCHRELATION: {
      NAME: 'SearchRelation',
      TITLE: 'Search Relation',
    },
    SEARCHTreatment: {
      NAME: 'SearchTreatmentType',
      TITLE: 'Search Treatmemnt',
    },
    REQCALLBACK: {
      NAME: 'RequestCallBack',
      TITLE: 'Request Call Back',
    },
  },
  APP_ICON: {
    TYPE: {
      ION: 'ionicon',
      ENT: 'entypo',
    },
    NAME: {
      PERSON: 'person',
      HOME: 'home',
      REMOVE: 'remove',
      ADD: 'add',
    },
  },
};

export const APP_MESSAGES = {
  msgsignup: {
    memberId: 'National Id field required',
    policyNo: 'Policy Number field required',
    otp: '4 digit OTP number required',
    depChk: 'Member does not exists or dependents are not allowed',
    criChk:
      'You have already singned up, please sign in using your critential ',
  },
  msgnewclaim: {
    policyNo: 'Policy No is required',
    claimant: 'Claimant is required',
    consAdminDate: 'Choose valid date',
    claimAmount: 'Enter the valid amount',
    claimremarksReason: 'Claim reason is required',
    InstitutionNameReasion: 'Institution Name is required',
    treatmentType: 'Treatment Name is required',
    uploadDoc: 'Required minimum one dcoument to procced a claim',
    uploadDoc1: ' document is required to proceed a claim',
    toothNumber: 'Please enter the tooth number field',
  },
  msgLogin: {
    authFailed: 'Authenication failed, Invaild username or password',
    userName: 'Enter your user name',
    password: 'Enter your password ',
  },
  msgaccordian: {
    amulance: 'Ambulance',
    inpatient: 'Inpatient',
    existing: 'Existing',
    chronic: 'Chronic',
    maternity: 'Maternity',
    pregnancy: 'Pregnancy',
    psychiatric: 'Psychiatric',
    dental: 'Dental',
    out: 'Out',
    repatriation: 'Repatriation',
  },
  msgreferacontact: {
    fname: 'Required First Name',
    lname: 'Required Last Name',
    phoneNo: 'Required Mobile No',
    emailId: 'Required Email Id',
    relationship: 'Required Relationship',
  },
};
