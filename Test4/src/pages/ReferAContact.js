import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView, FlatList} from 'react-native';
import {Text, Icon, Input, Button} from 'react-native-elements';
import HeaderBarIcon from '../compontent/headerBarIcon';
import {useDispatch, useSelector} from 'react-redux';
import {Fonts} from '../fonts/Fonts';
import ReactiveIcon from '../compontent/ReactiveIcon';
import customData from '../common/customData.json';
import {
  getReferalData,
  updateReferalData,
  updateLoaderReferalData,
  resetStateData,
  getRelationShipData,
} from '../store/referaContactReducer';
import {apiSaveRefContact} from '../api/apiHelper';
import {Alert} from 'react-native';
import PageLoader from '../compontent/PageLoader';
import {useState} from 'react';
import {getLogginData} from '../store/loginReducer';
import {APP_DATA, APP_MESSAGES} from '../commonHelper/appData';
import {showAlert} from '../commonHelper/alertHelper';
import {Picker} from '@react-native-picker/picker';
import {Colors} from '../themes/Colors';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MantorySymbol from '../compontent/mantorySymbol';
import DeviceInfo from 'react-native-device-info';
const ReferAConatct = ({navigation}) => {
  const {errorMsg, loader, relation, required} = useSelector(getReferalData);
  const {data} = useSelector(getLogginData);
  const {msgreferacontact} = APP_MESSAGES;
  const {STACK_SCREENS} = APP_DATA;
  const dispatch = useDispatch();
  React.useLayoutEffect(() => {
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
    dispatch(resetStateData());
    dispatch(
      getRelationShipData({
        uidIdType: 'REFERAL_RELATION',
        compId: '001',
        moduleId: '*',
      }),
    );
  }, []);
  const action = (goToHome) => {
    goToHome ? navigation.goBack() : navigation.toggleDrawer();
  };

  function validateEmail(text) {
    if (text == null || text.trim().length == 0) {
      return;
    }

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      dispatch(
        updateReferalData('relation', 'errorMsg', {
          ...relation.errorMsg,
          emailId: msgreferacontact['emailIdInvalid'],
        }),
      );
      return false;
    }

    dispatch(
      updateReferalData('relation', 'errorMsg', {
        ...relation.errorMsg,
        emailId: null,
      }),
    );
    return true;
  }

  function checkReferalData(key, data) {
    let valid = true;
    let errors = {};
    for (let key of Object.keys(data.form)) {
      if (!data.form[key] && data.required[key]) {
        errors[key] = msgreferacontact[key];
        valid = false;
      } else {
        dispatch(
          updateReferalData('relation', 'errorMsg', {
            ...data.errorMsg,
            [key]: null,
          }),
        );
      }
    }
    console.log('A1' + valid);
    let validMail = validateEmail(data.form.emailId) || valid;

    if (!validMail) {
      dispatch(
        updateReferalData('relation', 'errorMsg', {
          ...data.errorMsg,
          ...errors,
        }),
      );
    }

    console.log('A2' + valid);
    if (validMail && valid) {
      valid = true;
    }
    return valid;
  }
  const saveRefContact = async () => {
    if (checkReferalData('relation', relation)) {
      dispatch(updateLoaderReferalData('loader', {isLoading: true}));

      try {
        let rsp = JSON.parse(JSON.stringify(relation.form));
        rsp['memberId'] = data.linkId;
        rsp['refType'] = 'R';
        rsp['comments'] = '';
        rsp['relationship'] = relation.form.relationship.id;
        console.log('save ref req - ', rsp);
        const response = await apiSaveRefContact(rsp);
        console.log('save ref resp - ', response);
        const {status} = response.data;

        if (status === 'Success') {
          //dispatch(resetStateData());
          navigation.navigate(STACK_SCREENS.REFACONTACTS.NAME, {
            message: 'referred a contact',
          });
        } else {
          showAlert('Failed to save refer a contact.', false);
        }
      } catch (error) {
        showAlert(JSON.stringify(error.message), false);
      } finally {
        dispatch(updateLoaderReferalData('loader', {isLoading: false}));
      }
    }
  };
  const action1 = (goTo) => {
    if (goTo === 'search') {
      navigation.navigate('SearchRelation');
    } else if (goTo === 'date') {
      showMode('date');
    }
  };
  // const inputTextWatcher = (key, newText) => {
  //   if(newText)
  //   {
  //     if (newText.length > 0) {
  //       dispatch(updateReferalData('relation',{key:key,value: newText}));
  //       dispatch(updateReferalData('errorMsg', {key:key,value: null}));
  //     } else {
  //       dispatch(updateReferalData('relation',{key:key,value: null}));
  //       dispatch(updateReferalData('errorMsg', {key:key,value: msgreferacontact[key]}));
  //     }
  //   }

  // };
  const inputTextWatcher = (key, newText) => {
    if (newText) {
      dispatch(
        updateReferalData('relation', 'form', {
          ...relation.form,
          [key]: newText,
        }),
      );

      dispatch(
        updateReferalData('relation', 'errorMsg', {
          ...relation.errorMsg,
          [key]: null,
        }),
      );
    } else {
      dispatch(
        updateReferalData('relation', 'form', {
          ...relation.form,
          [key]: null,
        }),
      );
      dispatch(
        updateReferalData('relation', 'errorMsg', {
          ...relation.errorMsg,
          [key]: msgreferacontact[key],
        }),
      );
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
          <Text style={styles.titleText}>REFER A CONTACT</Text>
        </View>
        <ScrollView>
          <View style={{marginHorizontal: wp('1%'), marginVertical: hp('1%')}}>
            <Input
              label={() => (
                <Text style={styles.labelStyle}>
                  FIRST NAME <MantorySymbol />
                </Text>
              )}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
              onChangeText={(newText) => inputTextWatcher('fname', newText)}
              /* value={relation.fname} */
              keyboardType={'default'}
              errorMessage={relation.errorMsg.fname}
              errorStyle={styles.errorInputStyle}
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
              /*  value={relation.lname} */
              keyboardType={'default'}
              errorMessage={relation.errorMsg.lname}
              errorStyle={styles.errorInputStyle}
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
              /* value={relation.phoneNo} */
              keyboardType={'phone-pad'}
              maxLength={customData.mobileNo}
              errorMessage={relation.errorMsg.phoneNo}
              errorStyle={styles.errorInputStyle}
            />
            <Input
              label={() => (
                <Text style={styles.labelStyle}>
                  E-MAIL
                  <MantorySymbol />
                </Text>
              )}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
              onChangeText={(newText) => {
                inputTextWatcher('emailId', newText);
                validateEmail(newText);
              }}
              /* value={relation.emailId} */
              keyboardType={'email-address'}
              autoCapitalize="none"
              errorMessage={relation.errorMsg.emailId}
              errorStyle={styles.errorInputStyle}
            />
            <View>
              <Input
                label={() => (
                  <Text style={styles.labelStyle}>
                    RELATIONSHIP
                    <MantorySymbol />
                  </Text>
                )}
                labelStyle={styles.labelStyle}
                inputStyle={styles.inputStyle}
                containerStyle={{width: wp('95%')}}
                inputContainerStyle={{borderBottomWidth: 1}}
                disabled={true}
                onChangeText={(newText) => {
                  inputTextWatcher('relationship', newText);
                }}
                value={relation.form.relationship?.description}
                errorMessage={relation.errorMsg.relationship}
                errorStyle={styles.errorInputStyle}
                keyboardType={'default'}
                rightIcon={
                  <ReactiveIcon
                    type="fa"
                    iconName="search"
                    onClick={() => action1('search')}
                    styles={styles.icon}
                  />
                }
              />
            </View>
            {/* <View style={styles.pickerView}>
            <Text style={styles.relationShipText}>RELATIONSHIP <MantorySymbol/> </Text>
            <Picker
              selectedValue={relation.relationship}
              onValueChange={(itemValue, itemIndex) =>
                {
                  if(relation.data.length>0)
                  {
                    inputTextWatcher('relationship', relation.data[itemIndex].id)
                  }
                }
                
              }>
              {relation.data.map((element) => (
                <Picker.Item
                  label={element.description}
                  value={element.id}
                  key={element.id}
                  style={styles.pickerItem}
                />
              ))}
            </Picker>
            {errorMsg.relationship && (
              <Text style={styles.relationShipErrorText}>
                {errorMsg.relationship}
              </Text>
            )}
            </View> */}
          </View>
        </ScrollView>
      </View>
      <View>
        <Button
          title="CONTINUE"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          onPress={() => saveRefContact()}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewConatiner: {flex: 1, backgroundColor: Colors.WHITE},
  titleView: {
    backgroundColor: Colors.BLUE1,
    marginTop: hp('0%'),
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
    marginLeft: wp('0%'),
    borderColor: Colors.RED,
    borderWidth: 0,
    fontSize: hp('2%'),
    color: Colors.BLACK,
    fontFamily: Fonts.regular.fontFamily,
  },
  inputStyle: {
    padding: hp('1%'),
    borderColor: Colors.RED,
    borderWidth: 0,
    fontSize: hp('2.2%'),
    marginLeft: wp('-1%'),
    marginTop: hp('-1.5%'),
    color: Colors.BLACK,
    fontFamily: Fonts.regular.fontFamily,
  },
  buttonStyle: {
    height: hp('6%'),
    backgroundColor: Colors.LIGHTGREEN1,
  },
  titleStyle: {
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
    textAlign: 'center',
  },
  errorInputStyle: {
    fontSize: hp('2%'),
    fontFamily: Fonts.regular.fontFamily,
    marginLeft: wp('-1%'),
  },
  icon: {
    color: Colors.BLACK,
    fontSize: hp('3%'),
    fontWeight: 'bold',
    marginTop: hp('0%'),
  },
  relationShipText: {
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
    marginLeft: wp('0%'),
  },
  relationShipErrorText: {
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
    marginLeft: wp('0%'),
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
    color: Colors.BLACK,
  },
});

export default ReferAConatct;
