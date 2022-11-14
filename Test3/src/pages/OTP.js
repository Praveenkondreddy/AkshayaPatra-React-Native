import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Fonts} from '../fonts/Fonts';
import {Text, Input, Button, Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import ReactiveIcon from '../compontent/ReactiveIcon';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSignupData,
  resetStateData,
  updateSignupData,
  getMemberProfile,
} from '../store/signupReducer';
import {apiValidateOTP, apiSignup, apiGenerateOTP} from '../api/apiHelper';
import {Alert} from 'react-native';
import PageLoader from '../compontent/PageLoader';
import {useState} from 'react';
import {useEffect} from 'react';
import {APP_MESSAGES} from '../commonHelper/appData';
import {showAlert} from '../commonHelper/alertHelper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../themes/Colors';
const {width, height} = Dimensions.get('window');
const OTP = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const {otpForm, form, errorMsg} = useSelector(getSignupData);
  const [otpMessage, setMessage] = useState(
    'Please enter the verification code sent to your mobile',
  );
  const {msgsignup} = APP_MESSAGES;

  let otpRef = {
    otp1: React.createRef(),
    otp2: React.createRef(),
    otp3: React.createRef(),
    otp4: React.createRef(),
  };
  useEffect(() => {
    setMessage(route.params.message);
    otpRef.otp1.current.focus();
  }, []);
  const action = () => {
    navigation.navigate('Login');
  };
  const reSendOTP = async () => {
    setLoader(true);
    try {
      const response = await apiGenerateOTP(form);
      const {status, message} = response.data;

      if (status === 'Success') {
        setMessage(message);
      } else {
        const response = await showAlert(message, false);
      }
    } catch (error) {
      dispatch(resetStateData());
      const response = await showAlert(JSON.stringify(error.message), false);
    } finally {
      setLoader(false);
    }
  };
  const validateOTP = async () => {
    for (let key of Object.keys(otpForm)) {
      if (!otpForm[key]) {
        dispatch(updateSignupData('errorMsg', {otp: msgsignup.otp}));
        return null;
      }
    }
    dispatch(updateSignupData('errorMsg', {otp: null}));
    setLoader(true);
    try {
      let otp = parseInt(
        `${otpForm.otp1}${otpForm.otp2}${otpForm.otp3}${otpForm.otp4}`,
      );
      let requestObj = {otp, memberId: form.memberId, mobileNo: form.phoneNo};
      const response = await apiValidateOTP(requestObj);
      const {status, message} = response.data;

      if (status === 'Success') {
        doSignUp();
      } else {
        const response = await showAlert(message, false);
      }
    } catch (error) {
      const response = await showAlert(JSON.stringify(error.message), false);
    } finally {
      setLoader(false);
      //navigation.navigate('OTPSuccess');
    }
  };
  const doSignUp = async () => {
    console.log('status');
    let requestObj = {memberId: form.memberId, policyNo: form.policyNo,usertype:"M"};
    try {
      const sinupResponse = await apiSignup(requestObj);
      const {status, message} = sinupResponse.data;
      console.log('status' + status);
      if (status === 'Sucess') {
        console.log('A1');
        dispatch(resetStateData());
        console.log('B1');
        navigation.navigate('OTPSuccess');
      } else {
        dispatch(resetStateData());
        const response = await showAlert(message, false);
      }
    } catch (error) {
      const response = await showAlert(JSON.stringify(error.message), false);
    } finally {
      // navigation.replace('Login');
    }
  };
  const inputTextWatcher = (text, currentRef, nextRef) => {
    dispatch(updateSignupData('errorMsg', {otp: null}));
    dispatch(updateSignupData('otpForm', {[`otp${currentRef}`]: text}));
    if (text.length === 1) {
      otpRef[`otp${nextRef}`].current.focus();
    } else {
      let index = currentRef - 1;
      index != 0 ? otpRef[`otp${index}`].current.focus() : null;
    }
  };
  return (
    <ScrollView>
      <PageLoader isLoading={loader} />
      <View style={[styles.parentContainer]}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[Colors.GRADIENT, Colors.GRADIENT1]}
          style={[styles.linearGradient]}></LinearGradient>
        <View style={styles.iconView}>
          <ReactiveIcon
            type="fa"
            iconName="times-circle"
            onClick={action}
            styles={styles.icon}
          />
        </View>
        <View style={styles.iconUserView}>
          <View style={styles.CircleShapeView}>
            <View style={styles.CircleShapeInnerView}>
              <Icon name="person" type="ionicon" iconStyle={styles.iconUser} />
            </View>
          </View>
        </View>
        <View style={styles.otpTextView}>
          <Text style={styles.newRegText}>OTP VERIFICATION</Text>

          <View style={styles.horizontalLine}></View>
          <Text style={styles.otpText}>{otpMessage}</Text>
        </View>
        <View style={styles.otpViewContainer}>
          <View style={styles.otpTextInputView}>
            <Input
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              maxLength={1}
              keyboardType="number-pad"
              onChangeText={(newText) =>
                dispatch(updateSignupData('otpForm', {otp1: newText}))
              }
              value={otpForm.otp1}
              keyboardType={'number-pad'}
              ref={otpRef.otp1}
              onChangeText={(newText) => inputTextWatcher(newText, 1, 2)}
            />
          </View>
          <View style={styles.otpTextInputView}>
            <Input
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              maxLength={1}
              keyboardType="number-pad"
              onChangeText={(newText) =>
                dispatch(updateSignupData('otpForm', {otp2: newText}))
              }
              value={otpForm.otp2}
              ref={otpRef.otp2}
              onChangeText={(newText) => inputTextWatcher(newText, 2, 3)}
            />
          </View>
          <View style={styles.otpTextInputView}>
            <Input
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              maxLength={1}
              keyboardType="number-pad"
              onChangeText={(newText) =>
                dispatch(updateSignupData('otpForm', {otp3: newText}))
              }
              value={otpForm.otp3}
              ref={otpRef.otp3}
              onChangeText={(newText) => inputTextWatcher(newText, 3, 4)}
            />
          </View>
          <View style={styles.otpTextInputView}>
            <Input
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              maxLength={1}
              keyboardType="number-pad"
              onChangeText={(newText) =>
                dispatch(updateSignupData('otpForm', {otp4: newText}))
              }
              value={otpForm.otp4}
              ref={otpRef.otp4}
              onChangeText={(newText) => inputTextWatcher(newText, 4, 4)}
            />
          </View>
        </View>

        {errorMsg.otp && <Text style={styles.errorMsg}>{errorMsg.otp}</Text>}
        <Text style={styles.receiveText}>Didn't Receive OTP?</Text>
        <TouchableOpacity onPress={() => reSendOTP()}>
          <Text style={styles.reSendText}>RESEND OTP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableOpatcity}>
          <Button
            buttonStyle={styles.submitbtn}
            titleStyle={styles.submitTitleStyle}
            title="SUBMIT"
            onPress={() => validateOTP()}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: Colors.WHITE,
    height,
  },
  container: {
    alignItems: 'center',
    marginTop: hp('4%'),
    backgroundColor: Colors.WHITE,
  },
  linearGradient: {
    height: hp('10%'),
    alignItems: 'center',
  },
  imageView: {
    marginHorizontal: wp('12%'),
    marginVertical: hp('12%'),
  },
  image: {
    width: wp('12%'),
    height: hp('12%'),
  },
  iconView: {
    alignItems: 'flex-end',
    position: 'relative',
    marginTop: hp('-8%'),
    marginRight: wp('6%'),
  },
  icon: {
    color: 'white',
    fontSize: hp('4%'),
    fontWeight: 'bold',
    zIndex: 1000,
  },
  iconUserView: {
    alignItems: 'center',
    marginTop: hp('-4%'),
  },
  CircleShapeView: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    width: hp('32%') * 0.5,
    height: hp('32%') * 0.5,
    backgroundColor: Colors.LIGHTGREEN1,
    alignItems: 'center',
    opacity: 0.8,
  },
  CircleShapeInnerView: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    width: hp('18%') * 0.5,
    height: hp('18%') * 0.5,
    backgroundColor: Colors.WHITE,
    marginTop: hp('3.5%'),
  },
  iconUser: {
    color: Colors.BLACK,
    fontSize: hp('3%'),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp('3%'),
  },
  newRegText: {
    color: Colors.LIGHTBLACK,
    marginTop: hp('3%'),
    fontSize: hp('3%'),
    fontFamily: Fonts.regular.fontFamily,
    height: hp('5%'),
    textAlign: 'center',
  },
  horizontalLine: {
    backgroundColor: Colors.LIGHTGRAY2,
    height: hp('0.3%'),
    width: wp('5%'),
    marginTop: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpTextView: {
    alignItems: 'center',
  },
  otpText: {
    color: Colors.LIGHTGRAY3,
    textAlign: 'center',
    height: hp('10%'),
    marginHorizontal: wp('18%'),
    marginVertical: hp('8%'),
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
  },
  otpViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpTextInputView: {
    marginHorizontal: wp('2%'),
  },

  receiveText: {
    color: Colors.LIGHTGRAY3,
    textAlign: 'center',
    marginHorizontal: wp('18%'),
    marginTop: hp('5%'),
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
  },
  reSendText: {
    color: Colors.BLUE4,
    textAlign: 'center',
    marginHorizontal: wp('18%'),
    marginTop: hp('2%'),
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2.2%'),
  },
  submitBtn: {
    backgroundColor: Colors.LIGHTGREEN1,
    borderRadius: 25,
    height: hp('8%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('2%'),
    borderColor: '#01b875',
    borderWidth: 2,
    fontFamily: Fonts.regular.fontFamily,
    marginHorizontal: wp('10%'),
  },
  submitText: {
    color: Colors.WHITE,
    fontFamily: Fonts.regular.fontFamily,
  },
  inputStyle: {
    fontSize: hp('2%'),
    borderColor: Colors.LIGHTGRAY3,
    padding: hp('1%'),
    fontFamily: Fonts.regular.fontFamily,
    textAlign: 'center',
  },
  inputContainerStyle: {
    height: hp('5%'),
    width: '95%',
    marginLeft: wp('3%'),
    marginRight: wp('2%'),
    borderBottomWidth: wp('0.5%'),
    borderBottomColor: Colors.LIGHTGRAY2,
    textAlign: 'center',
    color: Colors.BLACK,
    fontSize: hp('2.5%'),
  },
  touchableOpatcity: {
    width: wp('100%'),
    marginTop: hp('2%'),
  },
  submitbtn: {
    borderColor: Colors.LIGHTGREEN3,
    backgroundColor: Colors.LIGHTGREEN2,
    borderWidth: wp('1%'),
    width: wp('80%'),
    borderRadius: 25,
    color: Colors.LIGHTBLACK,
    fontFamily: Fonts.regular.fontFamily,
    alignSelf: 'center',
    fontSize: hp('1%'),
  },
  submitTitleStyle: {
    color: Colors.WHITE,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
  },
  errorMsg: {
    color: Colors.RED,
    fontFamily: Fonts.regular.fontFamily,
    marginHorizontal: wp('10%'),
  },
});

export default OTP;
