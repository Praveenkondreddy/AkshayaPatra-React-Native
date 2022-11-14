import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  BackHandler,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';
import {storeStringData, getStringData} from '../api/localstorage';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Text, Input, Image, Icon} from 'react-native-elements';
import {
  getLogginData,
  restLoginStateData,
  updateLoginData,
  updateLoginReponse,
} from '../store/loginReducer';
import {useSelector, useDispatch} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PageLoader from '../compontent/PageLoader';
import {apiSignIn} from '../api/apiHelper';
import {APP_DATA, APP_MESSAGES} from '../commonHelper/appData';
import {showAlert} from '../commonHelper/alertHelper';
import {Colors} from '../themes/Colors';
import {Fonts} from '../fonts/Fonts';
import {useFocusEffect} from '@react-navigation/native';
import {getMemberProfileData} from '../store/signupReducer';

const Login = ({navigation, state}) => {
  const [isLoader, setLoader] = useState(false);
  const {token, form, errorMsg, data} = useSelector(getLogginData);
  const dispatch = useDispatch();
  const {msgLogin} = APP_MESSAGES; //Validation error
  const {STACK_SCREENS} = APP_DATA;
  const [passwordIcon, setPasswordIcon] = useState(true);
  useFocusEffect(
    useCallback(() => {
      dispatch(restLoginStateData());
    }, []),
  );
  BackHandler.addEventListener('hardwareBackPress', function () {
    if (null == form.userName || null == form.password) {
      Alert.alert(
        'SICOM',
        'Do you want exit Mobile App?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        },
      );
    }

    return true;
  });

  const signIn = async () => {
    let isError = false;
    for (let key of Object.keys(form)) {
      if (!form[key]) {
        dispatch(updateLoginData('errorMsg', {[key]: msgLogin[key]}));
        isError = true;
      } else {
        dispatch(updateLoginData('errorMsg', {[key]: null}));
        isError = false;
      }
    }
    if (isError) {
      return;
    }
    try {
      setLoader(true);

      const response = await apiSignIn({
        compId: '001',
        userName: form.userName,
        password: form.password,
      });
      const {status, data, message} = response.data;
      console.log('Res : ', data, status);
      if (status == 200) {
        if (data.userName != undefined) {
          console.log('Res : ', data);
          await storeStringData('token', data.token);
          dispatch(updateLoginReponse(data));

          dispatch(
            getMemberProfileData({
              memberId: data.linkId,
            }),
          );
          navigation.replace(
            data.loggedfirst === 'Y'
              ? STACK_SCREENS.CHANGEPASSWORD.NAME
              : STACK_SCREENS.HOME.NAME,
          );
        } else {
          showAlert(msgLogin.authFailed, false);
        }
      } else {
        showAlert(msgLogin.authFailed, false);
      }
    } catch (error) {
      showAlert(JSON.stringify(error.message), false);
    } finally {
      setLoader(false);
    }
  };

  const inputTextWatcher = (id, newText) => {
    if (newText.length > 0) {
      dispatch(updateLoginData('form', {[id]: newText.split(' ').join('')}));
      dispatch(updateLoginData('errorMsg', {[id]: null}));
    } else {
      dispatch(updateLoginData('form', {[id]: null}));
      dispatch(updateLoginData('errorMsg', {[id]: msgLogin[id]}));
    }
  };
  return (
    <ScrollView>
      <StatusBar style="auto" />
      <PageLoader isLoading={isLoader} />
      <View style={styles.parentContainer}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[Colors.GRADIENT, Colors.GRADIENT1]}
          style={styles.linearGradient}>
          <View style={styles.imageView}>
            <Image
              source={require('../../assets/images/comapany_logo_tmp.png')}
              style={styles.image}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
        </LinearGradient>

        <View style={styles.container}>
          <View style={styles.inputView}>
            <Input
              placeholder="User Name"
              leftIcon={
                <Icon
                  name="person"
                  type="ionicon"
                  iconStyle={styles.inputLeftIcon}
                />
              }
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              placeholderTextColor={Colors.LIGHTGRAY3}
              autoCapitalize="characters"
              autoCompleteType="off"
              autoCorrect={false}
              onChangeText={(newText) => inputTextWatcher('userName', newText)}
              value={form.userName}
              keyboardType={'default'}
              errorMessage={errorMsg.userName}
              errorStyle={styles.errorInputStyle}
            />
          </View>

          <View style={styles.inputView}>
            <Input
              placeholder="Password"
              leftIcon={
                <Icon
                  name="lock"
                  type="font-awesome"
                  iconStyle={styles.inputLeftIcon}
                />
              }
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              placeholderTextColor={Colors.LIGHTGRAY3}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              onChangeText={(newText) => inputTextWatcher('password', newText)}
              value={form.password}
              keyboardType={'default'}
              errorMessage={errorMsg.password}
              errorStyle={styles.errorInputStyle}
              secureTextEntry={passwordIcon}
              rightIcon={
                <Icon
                  name={passwordIcon ? 'eye-off' : 'eye'}
                  type="material-community"
                  iconStyle={styles.inputRightIcon}
                  onPress={() => setPasswordIcon(!passwordIcon)}
                />
              }
            />
          </View>
        </View>

        <View style={styles.forgotView}>
          <TouchableOpacity
            onPress={() => navigation.push(STACK_SCREENS.FORGOTPASSWORD.NAME)}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerlogin}>
          <LinearGradient
            style={styles.loginBtn}
            colors={[Colors.LIGHTGREEN2, Colors.LIGHTGREEN3]}>
            <TouchableOpacity style={styles.touchableOpatcity}>
              <Button
                buttonStyle={styles.loginBtn}
                titleStyle={styles.loginBtnTitleStyle}
                title="LOGIN"
                type="outline"
                onPress={signIn}
              />
            </TouchableOpacity>
          </LinearGradient>
          <View style={styles.signupView}>
            {/* <View style={styles.iconView}>
              <Icon
                name="angle-down"
                type="font-awesome"
                iconStyle={styles.icon}
              />
            </View> */}
            <Text style={styles.newUserText}>New User?</Text>
            <LinearGradient
              style={styles.signupbtn}
              colors={[Colors.LIGHTGREEN2, Colors.LIGHTGREEN3]}>
              <TouchableOpacity style={styles.touchableOpatcity}>
                <Button
                  buttonStyle={styles.signupbtn}
                  titleStyle={styles.sinupBtnTitleStyle}
                  title="SIGN UP"
                  type="outline"
                  onPress={() => navigation.navigate(STACK_SCREENS.SIGNUP.NAME)}
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  container: {
    marginTop: '7%',
    backgroundColor: Colors.WHITE,
    // height: '20%',
    width: '100%',
    // marginHorizontal: wp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    height: hp('25%'),
    alignItems: 'center',
    flex: 1,
  },

  containerlogin: {
    alignItems: 'center',
    marginTop: hp('1.8%'),
    height: hp('35%'),
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: wp('10%'),
  },
  imageView: {
    marginVertical: hp('5%'),
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    width: wp('70%'),
    height: hp('16%'),
    resizeMode: 'contain',
  },
  // image: {
  //   width: wp('20%'),
  //   height: hp('20%'),
  // },
  inputView: {
    backgroundColor: Colors.WHITE,
    height: hp('10%'),
    marginTop: hp('2%'),
    width: wp('80%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp('10%'),
    marginHorizontal: hp('20%'),
  },
  inputLeftIcon: {
    fontSize: hp('3%'),
    color: Colors.LIGHTGRAY3,
    marginLeft: hp('2%'),
  },
  inputRightIcon: {
    fontSize: hp('3%'),
    color: Colors.LIGHTGRAY3,
    marginRight: wp('2%'),
  },
  inputStyle: {
    fontSize: hp('2%'),
    borderColor: Colors.LIGHTGRAY3,
    padding: hp('1%'),
    fontFamily: Fonts.regular.fontFamily,
  },
  inputContainerStyle: {
    // borderColor: Colors.LIGHTGRAY3,
    // borderWidth: hp('0.2%'),
    // borderRadius: hp('10%'),
    // marginLeft: wp('16%'),
    // height: hp('7%'),
    // width: wp('75%'),
    width: wp('80%'),
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.LIGHTGRAY3,
    borderWidth: hp('0.2%'),
    borderRadius: hp('10%'),
  },
  forgotView: {
    alignItems: 'center',
    marginTop: hp('3%'),
    height: hp('3%'),
  },

  forgot: {
    color: Colors.BLACK,
    fontSize: hp('2%'),
    fontFamily: Fonts.regular.fontFamily,
  },
  loginBtn: {
    width: wp('80%'),
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: Fonts.regular.fontFamily,
    color: Colors.WHITE,
  },
  loginBtnTitleStyle: {
    color: Colors.WHITE,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('1.8%'),
  },

  sinupBtnTitleStyle: {
    color: Colors.BLACK,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('1.8%'),
  },
  signupView: {
    marginTop: hp('5%'),
    backgroundColor: Colors.LIGHTBLUE,
    width: wp('100%'),
    alignItems: 'center',
    color: Colors.BLACK,
    flex: 1,
  },
  newUserText: {
    color: Colors.LIGHTBLACK,
    width: wp('100%'),
    textAlign: 'center',
    marginTop: hp('3%'),
    fontFamily: Fonts.regular.fontFamily,
    // height: hp('5%'),
    fontSize: hp('2%'),
  },
  loginText: {
    color: Colors.WHITE,
    fontFamily: Fonts.regular.fontFamily,
  },
  singupText: {
    color: Colors.BLACK,
    fontFamily: Fonts.regular.fontFamily,
    width: wp('20%'),
    height: hp('8%'),
    fontSize: hp('8%'),
  },
  iconView: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    backgroundColor: Colors.WHITE,
    width: wp('16%') * 0.5,
    height: wp('16%') * 0.5,
    marginTop: hp('-2%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: Colors.BLACK,
    shadowColor: Colors.SHADOW,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 8,
  },
  icon: {
    color: Colors.BLUE1,
    fontSize: hp('3%'),
    fontWeight: 'bold',
  },
  touchableOpatcity: {
    width: wp('80%'),
    // marginTop: hp('0.4%'),
  },
  signupbtn: {
    borderColor: Colors.LIGHTGREEN2,
    backgroundColor: Colors.WHITE,
    borderWidth: 2,
    width: wp('80%'),
    borderRadius: 25,
    color: Colors.BLACK,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
  },
  errorInputStyle: {
    fontSize: 12,
    fontFamily: Fonts.regular.fontFamily,
    marginLeft: 15,
  },
});

export default Login;
