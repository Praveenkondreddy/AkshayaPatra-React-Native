import React, {useEffect, useLayoutEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Text, Icon, Input, Button} from 'react-native-elements';
import HeaderBarIcon from '../compontent/headerBarIcon';
import {useDispatch, useSelector} from 'react-redux';
import {getMemberData} from '../store/signupReducer';
import {apiSaveRefContact} from '../api/apiHelper';
import PageLoader from '../compontent/PageLoader';
import {getLogginData} from '../store/loginReducer';
import {APP_DATA, APP_MESSAGES} from '../commonHelper/appData';
import {showAlert} from '../commonHelper/alertHelper';
import {Colors} from '../themes/Colors';
import {Fonts} from '../fonts/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MantorySymbol from '../compontent/mantorySymbol';
import DeviceInfo from 'react-native-device-info';
import {
  getReqCallBackData,
  updateReqCallBackData,
  updateLoaderReferalData,
  resetReqCallBackState,
} from '../store/requestCallBackReducer';
const RequestCallBack = ({navigation}) => {
  const {form, errorMsg, loader, required} = useSelector(getReqCallBackData);
  const {data} = useSelector(getLogginData);
  const {msgreferacontact} = APP_MESSAGES;
  const {STACK_SCREENS} = APP_DATA;
  const {memberProfileData} = useSelector(getMemberData);

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBarIcon
          type="ion"
          iconName="home"
          onClick={action}
          goToHome={true}
        />
      ),
      headerRight: () => (
        <HeaderBarIcon
          type="fa"
          iconName="bars"
          onClick={action}
          goToHome={false}
        />
      ),
      headerTitle: () => null,
      headerStyle: {},
    });
  }, [navigation]);

  useEffect(() => {
    console.log('useEffect Data:', form);
    form.mfname = memberProfileData.mfName;
    form.mlname = memberProfileData.mlName;
    form.phoneNo = memberProfileData.mobileNo;
    form.emailId = memberProfileData.emailId;
    console.log('formData', form);

    return () => clearTimeout(timer);
  }, [data]);
  const action = (goToHome) => {
    goToHome ? navigation.goBack() : navigation.toggleDrawer();
  };
  const saveRequestCallBack = async () => {
    form.fname = memberProfileData.mfName;
    form.lname = memberProfileData.mlName;
    form.phoneNo = memberProfileData.mobileNo;
    form.emailId = memberProfileData.emailId;
    dispatch(updateLoaderReferalData('loader', {isLoading: true}));

    try {
      form['memberId'] = memberProfileData.memberId;
      form['refType'] = 'CB';
      form['relationship'] = '';

      console.log('Form', form);

      const response = await apiSaveRefContact(form);
      console.log('request callback response', response);
      const {status} = response.data;
      console.log('mIHUN', response.data);
      if (status === 'Success') {
        //dispatch(resetStateData());
        navigation.navigate(STACK_SCREENS.REFACONTACTS.NAME, {
          message: 'sent request callback',
        });
      } else {
        showAlert('Failed to save request callback', false);
      }
    } catch (error) {
      showAlert(JSON.stringify(error.message), false);
    } finally {
      dispatch(updateLoaderReferalData('loader', {isLoading: false}));
    }
  };
  const inputTextWatcher = (key, newText) => {
    if (newText) {
      if (newText.length > 0) {
        dispatch(updateReqCallBackData('form', {key: key, value: newText}));
        dispatch(updateReqCallBackData('errorMsg', {key: key, value: null}));
      } else {
        dispatch(updateReqCallBackData('form', {key: key, value: null}));
        dispatch(
          updateReqCallBackData('errorMsg', {
            key: key,
            value: msgreferacontact[key],
          }),
        );
      }
    }
  };

  return (
    <View
      style={[
        styles.viewConatiner,
        {marginTop: DeviceInfo.isTablet() ? hp('2%') : hp('2%')},
      ]}>
      <PageLoader isLoading={loader.isLoading} />
      <View style={{flex: 1}}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>REQUEST A CALLBACK</Text>
        </View>
        <ScrollView>
          <View style={{marginHorizontal: wp('2%'), marginVertical: hp('2%')}}>
            <Input
              label={() => (
                <Text style={styles.labelStyle}>
                  FIRST NAME <MantorySymbol />
                </Text>
              )}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
              onChangeText={(newText) => inputTextWatcher('fname', newText)}
              /* value={form.fname} */
              defaultValue={memberProfileData.mfName}
              keyboardType={'default'}
              errorMessage={errorMsg.fname}
              errorStyle={styles.errorInputStyle}
              disabled
            />
            <Input
              label={() => (
                <Text style={styles.labelStyle}>
                  LAST NAME <MantorySymbol />
                </Text>
              )}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
              onChangeText={(newText) => inputTextWatcher('lname', newText)}
              /*  value={form.lname} */
              defaultValue={memberProfileData.mlName}
              keyboardType={'default'}
              errorMessage={errorMsg.lname}
              errorStyle={styles.errorInputStyle}
              disabled
            />
            <Input
              label={() => (
                <Text style={styles.labelStyle}>
                  MOBILE <MantorySymbol />
                </Text>
              )}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
              onChangeText={(newText) => inputTextWatcher('phoneNo', newText)}
              //value={form.phoneNo}
              defaultValue={memberProfileData.mobileNo}
              keyboardType={'phone-pad'}
              maxLength={8}
              errorMessage={errorMsg.phoneNo}
              errorStyle={styles.errorInputStyle}
              // disabled
            />
            <Input
              label={() => <Text style={styles.labelStyle}>E-Mail</Text>}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
              onChangeText={(newText) => inputTextWatcher('emailId', newText)}
              /* value={form.emailId} */
              defaultValue={memberProfileData.emailId}
              keyboardType={'email-address'}
              errorMessage={errorMsg.emailId}
              errorStyle={styles.errorInputStyle}
              disabled
            />
            {/* <View style={[{flexDirection: 'row'},styles.viewTop]}>    */}
            <Input
              label={() => <Text style={styles.labelStyle}>Remarks </Text>}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
              onChangeText={(newText) => inputTextWatcher('comments', newText)}
              // value={form.comments}
              errorMessage={errorMsg.comments}
              errorStyle={styles.errorInputStyle}
              keyboardType={'default'}
              multiline={true}
              numberOfLines={3}
              maxLength={250}
            />
            {/* </View> */}
          </View>
        </ScrollView>
      </View>
      <View>
        <Button
          title="CONTINUE"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          onPress={() => saveRequestCallBack()}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewConatiner: {flex: 1, backgroundColor: Colors.WHITE},
  titleView: {
    backgroundColor: Colors.BLUE1,
    marginTop: hp('1%'),
    height: hp('7%'),
    justifyContent: 'center',
  },
  titleText: {
    color: Colors.WHITE,
    fontFamily: Fonts.regular.fontFamily,
    marginLeft: wp('2%'),
    fontSize: hp('2%'),
  },
  labelStyle: {
    marginLeft: wp('-1%'),
    borderColor: Colors.RED,
    borderWidth: 0,
    fontSize: hp('2.2%'),
    color: Colors.BLACK,
    fontFamily: Fonts.regular.fontFamily,
  },
  inputStyle: {
    padding: 1,
    borderColor: Colors.RED,
    borderWidth: 0,
    fontSize: hp('2.2%'),
    marginLeft: wp('-1.5%'),
    marginTop: Platform.OS !== 'ios' ? hp('-2%') : hp('0%'),
    color: Colors.BLACK,
    fontFamily: Fonts.regular.fontFamily,
  },
  buttonStyle: {
    height: hp('6%'),
    backgroundColor: Colors.LIGHTGREEN1,
  },
  titleStyle: {
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('1.8%'),
    textAlign: 'center',
  },
  errorInputStyle: {
    fontSize: hp('1.8%'),
    fontFamily: Fonts.regular.fontFamily,
    marginLeft: wp('1%'),
  },
  relationShipText: {
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('1.8%'),
    marginLeft: wp('1%'),
  },
  relationShipErrorText: {
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('1.8%'),
    marginLeft: wp('1%'),
    color: Colors.RED,
  },
  pickerView: {
    borderBottomWidth: wp('0.1%'),
    borderBottomColor: 'black',
    marginHorizontal: wp('4%'),
  },
  pickerItem: {
    fontSize: hp('2%'),
    fontFamily: Fonts.regular.fontFamily,
    color: Colors.LIGHTBLACK,
  },
  viewTop: {marginTop: hp('2%')},
});

export default RequestCallBack;
