import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  BackHandler,
} from 'react-native';
import {Fonts} from '../fonts/Fonts';
import {Button, Text, Input, Image, Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import ReactiveIcon from '../compontent/ReactiveIcon';
import {getLogginData, restLoginStateData} from '../store/loginReducer';
import {useSelector, useDispatch} from 'react-redux';
import {apiChangePassword} from '../api/apiHelper';
import {Alert} from 'react-native';
import PageLoader from '../compontent/PageLoader';
import {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {showAlert} from '../commonHelper/alertHelper';
import {Colors} from '../themes/Colors';
const {width, height} = Dimensions.get('window');
const ChangePassword = ({navigation}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [oldPassword, setOldPassword] = useState(null);
  const [oldPasswordIcon, setOldPasswordIcon] = useState(true);
  const [errorMsg1, setErrorMsg1] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [newPasswordIcon, setNewPasswordIcon] = useState(true);
  const [errorMsg2, setErrorMsg2] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(true);
  const [errorMsg3, setErrorMsg3] = useState(null);
  const {form, data} = useSelector(getLogginData);
  let oldPasswordRef = React.createRef();
  let newPasswordRef = React.createRef();
  let confirmPasswordRef = React.createRef();
  useEffect(() => {
    /* navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    }); */
    oldPasswordRef.current.focus();
  }, []);
  const action = () => {
    navigation.navigate('Login');
  };
  const submit = async () => {
    if (!oldPassword) {
      setErrorMsg1('Please enter old password');
      return null;
    } else if (!newPassword) {
      setErrorMsg2('Please enter new password');
      return null;
    } else if (!confirmPassword) {
      setErrorMsg3('Please enter confirm password');
      return null;
    } else {
      setErrorMsg1(null);
      setErrorMsg2(null);
      setErrorMsg3(null);
    }
    if (oldPassword == newPassword) {
      // setErrorMsg3('Old Password and New Password should be same');
      showAlert('Old Password and New Password should not be same', true);
      return;
    } else if (newPassword != confirmPassword) {
      showAlert('Confirm and New Password should be same', true);
      return;
    } else {
      setErrorMsg3(null);
    }
    setLoader(true);
    try {
      let requestObj = {userName: data.userName, oldPassword, newPassword};
      console.log(requestObj);
      const response = await apiChangePassword(requestObj);

      const {status, message} = response.data;

      if (status === 404) {
        showAlert(message, false);
      } else {
        setOldPassword(null);
        setNewPassword(null);
        setConfirmPassword(null);
        dispatch(restLoginStateData());
        navigation.navigate('ChangePasswordSuccess');
      }
    } catch (error) {
      showAlert(JSON.stringify(error.message), false);
    } finally {
      setLoader(false);
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
          <Text style={styles.newRegText}>Change Password</Text>
          <View style={styles.horizontalLine}></View>
        </View>
        <View style={styles.viewContainer1}>
          <View style={styles.inputView}>
            <Input
              placeholder="Old Password"
              leftIcon={
                <Icon
                  name="form-textbox-password"
                  type="material-community"
                  iconStyle={styles.inputLeftIcon}
                />
              }
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              placeholderTextColor={Colors.LIGHTGRAY3}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              onChangeText={(newText) => setOldPassword(newText)}
              value={oldPassword}
              secureTextEntry={oldPasswordIcon}
              ref={oldPasswordRef}
              onSubmitEditing={() => {
                newPasswordRef.current.focus();
              }}
              errorMessage={errorMsg1}
              rightIcon={
                <Icon
                  name={oldPasswordIcon ? 'eye-off' : 'eye'}
                  type="material-community"
                  iconStyle={styles.inputRightIcon}
                  onPress={() => setOldPasswordIcon(!oldPasswordIcon)}
                />
              }
            />
          </View>

          <View style={styles.inputView}>
            <Input
              placeholder="New Password"
              leftIcon={
                <Icon
                  name="form-textbox-password"
                  type="material-community"
                  iconStyle={styles.inputLeftIcon}
                />
              }
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              placeholderTextColor={Colors.LIGHTGRAY3}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              onChangeText={(newText) => setNewPassword(newText)}
              value={newPassword}
              secureTextEntry={newPasswordIcon}
              ref={newPasswordRef}
              onSubmitEditing={() => {
                confirmPasswordRef.current.focus();
              }}
              rightIcon={
                <Icon
                  name={newPasswordIcon ? 'eye-off' : 'eye'}
                  type="material-community"
                  iconStyle={styles.inputRightIcon}
                  onPress={() => setNewPasswordIcon(!newPasswordIcon)}
                />
              }
            />
          </View>

          <View style={styles.inputView}>
            <Input
              placeholder="Confirm Password"
              leftIcon={
                <Icon
                  name="form-textbox-password"
                  type="material-community"
                  iconStyle={styles.inputLeftIcon}
                />
              }
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              placeholderTextColor={Colors.LIGHTGRAY3}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              onChangeText={(newText) => setConfirmPassword(newText)}
              value={confirmPassword}
              secureTextEntry={confirmPasswordIcon}
              ref={confirmPasswordRef}
              rightIcon={
                <Icon
                  name={confirmPasswordIcon ? 'eye-off' : 'eye'}
                  type="material-community"
                  iconStyle={styles.inputRightIcon}
                  onPress={() => setConfirmPasswordIcon(!confirmPasswordIcon)}
                />
              }
            />
          </View>
        </View>
        <TouchableOpacity style={styles.touchableOpatcity}>
          <Button
            buttonStyle={styles.submitbtn}
            titleStyle={styles.submitTitleStyle}
            title="SUBMIT"
            onPress={() => submit()}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    height,
  },
  container: {
    alignItems: 'center',
    marginTop: hp('4%'),
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
    marginTop: hp('-8%'),
    marginRight: wp('6%'),
  },
  icon: {
    color: 'white',
    fontSize: hp('4%'),
    fontWeight: 'bold',
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
  touchableOpatcity: {
    width: '100%',
    marginTop: hp('3%'),
  },
  submitbtn: {
    borderColor: Colors.LIGHTGREEN1,
    backgroundColor: Colors.LIGHTGREEN1,
    borderWidth: 2,
    width: '80%',
    borderRadius: 25,
    color: Colors.LIGHTBLACK,
    fontFamily: Fonts.regular.fontFamily,
    alignSelf: 'center',
  },
  submitTitleStyle: {
    color: Colors.WHITE,
    fontFamily: Fonts.regular.fontFamily,
  },
  otpTextView: {
    alignItems: 'center',
  },
  horizontalLine: {
    backgroundColor: Colors.LIGHTGRAY2,
    height: hp('0.3%'),
    width: wp('5%'),
    marginTop: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewContainer1: {
    marginTop: hp('4%'),
    backgroundColor: Colors.WHITE,
    height: hp('30%'),
    width: wp('100%'),
    marginHorizontal: wp('10%'),
  },
  inputView: {
    width: wp('100%'),
    backgroundColor: 'white',
    height: hp('10%'),
    marginTop: hp('1%'),
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
    borderColor: Colors.LIGHTGRAY3,
    borderWidth: hp('0.2%'),
    borderRadius: hp('10%'),
    height: hp('7%'),
    width: wp('75%'),
  },
});

export default ChangePassword;
