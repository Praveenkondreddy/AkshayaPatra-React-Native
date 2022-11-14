
import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { loginReducer } from "./loginReducer";
import { newClaimReducer } from "./newClaimReducer";
import { policiesReducer } from "./policiesReducer";
import { referAContactReducer } from "./referaContactReducer";
import { requestCallBackReducer } from "./requestCallBackReducer";
import { signupReducer } from "./signupReducer";

export const store = createStore(combineReducers({
  user:loginReducer,
  policies:policiesReducer,
  newClaims:newClaimReducer,
  referal:referAContactReducer,
  signup:signupReducer,
  reqCallBack:requestCallBackReducer,
}),applyMiddleware(thunk));


