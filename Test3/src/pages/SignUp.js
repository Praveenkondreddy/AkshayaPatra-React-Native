import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Fonts} from '../fonts/Fonts';
import {Button, Text, Input, Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import ReactiveIcon from '../compontent/ReactiveIcon';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSignupData,
  updateSignupData,
  resetStateData,
  getGuestUserData,
  getMemberProfile,
  updateSignupMemberData,
} from '../store/signupReducer';
import {apiGenerateOTP} from '../api/apiHelper';
import {Alert} from 'react-native';
import PageLoader from '../compontent/PageLoader';
import {APP_MESSAGES} from '../commonHelper/appData';
import {showAlert} from '../commonHelper/alertHelper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../themes/Colors';
import {Dimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const {form, errorMsg, memberProfile} = useSelector(getSignupData);
  const {msgsignup} = APP_MESSAGES;

  useFocusEffect(
    useCallback(() => {
      console.log('S1', form);
      dispatch(resetStateData());
      dispatch(getGuestUserData({guestUser: true}));
      if (form.policyNo != null || form.policyNo != undefined) {
        dispatch(
          getMemberProfile({
            policyNo: form.policyNo,
            memberId: form.memberId,
            compId: '001',
          }),
        );
      }

      console.log('S2');
    }, []),
  );

  const action = () => {
    navigation.navigate('Login');
  };

  const generateOTP = async () => {
    //  await dispatch(
    //   getMemberProfile({
    //     policyNo: form.policyNo,
    //     memberId: form.memberId,
    //     compId: '001',
    //   })
    // );

    // for (let key of Object.keys(form)) {
    //   let isError = false;
    //   if (!form[key]) {
    //     dispatch(updateSignupData('errorMsg', {[key]: msgsignup[key]}));
    //     isError = true;
    //   }

    // }if(isError){
    //   return
    // }
    console.log('form member', form['memberId']);
    var error = false;
    if (form['memberId'] == null) {
      dispatch(
        updateSignupData('errorMsg', {['memberId']: msgsignup['memberId']}),
      );
      error = true;
    }
    if (form['policyNo'] == null) {
      dispatch(
        updateSignupData('errorMsg', {['policyNo']: msgsignup['policyNo']}),
      );
      error = true;
    }
    if (error) {
      return;
    }

    setLoader(true);
    try {
      console.log(form);
      const response = await apiGenerateOTP(form);
      const {status, message} = response.data;

      if (status === 'Success') {
        // dispatch(resetStateData());
        navigation.navigate('OTP', {message});
      } else {
        if (
          APP_MESSAGES.msgsignup.depChk == message ||
          APP_MESSAGES.msgsignup.criChk == message
        ) {
          navigation.navigate('Login', {message});
        }

        const response = await showAlert(message, false);
      }
    } catch (error) {
      const response = await showAlert(JSON.stringify(error.message), false);
    } finally {
      setLoader(false);
      // navigation.navigate('OTP');
    }
  };
  const inputTextWatcher = (id, newText) => {
    if (newText.length > 0) {
      dispatch(updateSignupData('form', {[id]: newText}));
      dispatch(updateSignupData('errorMsg', {[id]: null}));
    } else {
      dispatch(updateSignupData('form', {[id]: null}));
      dispatch(updateSignupData('errorMsg', {[id]: msgsignup[id]}));
    }
  };
  return (
    <ScrollView>
      <PageLoader isLoading={loader} />
      <View style={styles.parentContainer}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[Colors.GRADIENT, Colors.GRADIENT1]}
          style={styles.linearGradient}></LinearGradient>
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
          <Text style={styles.newRegText}>New User Registration</Text>

          <View style={styles.singupView}>
            <View style={styles.inputView}>
              <Input
                placeholder="NATIONAL ID"
                leftIcon={
                  <Icon
                    name="id-card-o"
                    type="font-awesome"
                    style={styles.inputLeftIcon}
                  />
                }
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                placeholderTextColor={Colors.LIGHTGRAY3}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                onChangeText={(newText) =>
                  inputTextWatcher('memberId', newText)
                }
                value={form.memberId}
                keyboardType={'default'}
                errorMessage={errorMsg.memberId}
                errorStyle={styles.errorInputStyle}
              />
            </View>
            {/*  <View style={styles.inputView}>
          <Input
            placeholder="MOBILE"
            leftIcon={<Icon name="mobile"  type="font-awesome" style={styles.inputLeftIcon} />}
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            placeholderTextColor="#999999"
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}          
            onChangeText={(newText) =>
              dispatch(updateSignupData('form',{phoneNo: newText}))
            }
            value={form.phoneNo}
            keyboardType={'phone-pad'}
          />
           
          </View>
          <View style={styles.inputView}>
          <Input
            placeholder="EMAIL"
            leftIcon={<Icon name="envelope-o"  type="font-awesome" style={styles.inputLeftIcon} />}
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            placeholderTextColor="#999999"
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}  
            onChangeText={(newText) =>
              dispatch(updateSignupData('form',{emailId: newText}))
            }
            value={form.emailId}        
            keyboardType={'email-address'}
            caretHidden={true}
          /> 
         
          </View>*/}
            <View style={styles.inputView}>
              <Input
                placeholder="POLICY NUMBER"
                leftIcon={
                  <Icon
                    name="building"
                    type="font-awesome"
                    style={styles.inputLeftIcon}
                  />
                }
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                placeholderTextColor={Colors.LIGHTGRAY3}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                onChangeText={(newText) =>
                  inputTextWatcher('policyNo', newText)
                }
                value={form.policyNo}
                keyboardType={'default'}
                errorMessage={errorMsg.policyNo}
                errorStyle={styles.errorInputStyle}
              />
            </View>
            {/* <LinearGradient
          colors={[Colors.GRADIENT, Colors.GRADIENT1]}> */}
            <TouchableOpacity style={styles.touchableOpatcity}>
              <Button
                buttonStyle={styles.continuebtn}
                titleStyle={styles.continueTitleStyle}
                title="CONTINUE"
                onPress={() => generateOTP()}
              />
            </TouchableOpacity>
            {/* </LinearGradient> */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    alignItems: 'center',
    marginTop: hp('2%'),
    backgroundColor: Colors.WHITE,
  },
  linearGradient: {
    height: hp('12%'),
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
    marginTop: hp('-6%'),
    marginRight: wp('6%'),
    zIndex: 2000,
  },
  icon: {
    color: 'white',
    fontSize: hp('4%'),
    fontWeight: 'bold',
    zIndex: 2000,
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
    width: hp('35%') * 0.5,
    height: hp('35%') * 0.5,
    backgroundColor: Colors.LIGHTGREEN1,
    alignItems: 'center',
    opacity: 0.8,
  },
  CircleShapeInnerView: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    width: hp('20%') * 0.5,
    height: hp('20%') * 0.5,
    backgroundColor: 'white',
    marginTop: hp('4%'),
  },
  iconUser: {
    color: Colors.BLACK,
    fontSize: hp('3%'),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp('3.5%'),
  },
  newRegText: {
    color: Colors.BLACK,
    marginTop: hp('3%'),
    fontSize: hp('3%'),
    fontFamily: Fonts.regular.fontFamily,
    height: hp('5%'),
  },
  scanCardBtn: {
    // backgroundColor: Colors.BLUE1,
    height: hp('10%'),
    width: wp('80%'),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('2%'),
    fontFamily: Fonts.regular.fontFamily,
  },
  camera: {
    fontSize: hp('2%'),
    color: 'white',
  },
  scanText: {
    fontSize: hp('2%'),
    color: 'white',
    paddingHorizontal: wp('5%'),
    fontFamily: Fonts.regular.fontFamily,
  },
  horizontalLine: {
    backgroundColor: Colors.LIGHTGRAY2,
    height: hp('0.1%'),
    width: wp('80%'),
    marginTop: hp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  ORTextCircleShapeView: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    width: hp('8%') * 0.5,
    height: hp('8%') * 0.5,
    backgroundColor: Colors.BLUE1,
    opacity: 0.8,
  },
  orText: {
    fontSize: hp('1.5%'),
    textAlign: 'center',
    marginTop: hp('1%'),
    color: Colors.WHITE,
    fontFamily: Fonts.regular.fontFamily,
  },
  singupView: {
    width: wp('100%'),
    marginTop: hp('4%'),
  },
  inputView: {
    height: hp('8%'),
    marginTop: hp('3%'),
    justifyContent: 'center',
    width: wp('100%'),
  },

  inputLeftIcon: {
    fontSize: hp('2.5%'),
    color: Colors.LIGHTGRAY3,
    marginLeft: hp('2%'),
    width: wp('10%'),
  },
  inputStyle: {
    fontSize: hp('2%'),
    borderColor: Colors.LIGHTGRAY3,
    padding: hp('1%'),
    fontFamily: Fonts.regular.fontFamily,
  },
  errorInputStyle: {
    fontSize: 12,
    fontFamily: Fonts.regular.fontFamily,
    marginLeft: 15,
  },
  inputContainerStyle: {
    borderBottomColor: Colors.LIGHTGRAY3,
    borderBottomWidth: 1,
    height: hp('8%'),
    width: wp('80%'),
    marginLeft: wp('5%'),
    marginRight: wp('5%'),
  },
  touchableOpatcity: {
    width: wp('100%'),
    marginTop: hp('2%'),
  },
  continuebtn: {
    borderColor: Colors.LIGHTGREEN3,
    backgroundColor: Colors.LIGHTGREEN2,
    borderWidth: wp('1%'),
    width: wp('80%'),
    borderRadius: 25,
    color: Colors.LIGHTBLACK,
    fontFamily: Fonts.regular.fontFamily,
    alignSelf: 'center',
    fontSize: hp('1.8%'),
  },
  continueTitleStyle: {
    color: Colors.WHITE,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
  },
});

export default SignUp;
``