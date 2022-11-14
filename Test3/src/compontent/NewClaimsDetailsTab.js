import React, {useCallback, useState} from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView, Modal} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ReactiveIcon from '../compontent/ReactiveIcon';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import customData from '../common/customData.json';
import {useDispatch, useSelector} from 'react-redux';
import {Fonts} from '../fonts/Fonts';
import {
  getDiagonsisDetails,
  getDocumentTypeData,
  getNewCliamData,
  updateLoaderClaimData,
  getPolicies,
  getInstitutionName,
  getPolicyMembersData,
  getTreatmentTypeData,
  resetNewClaimsStateData,
  updateNewClaimsDetails,
} from '../store/newClaimReducer';
import {useEffect} from 'react';
import PageLoader from '../compontent/PageLoader';
import {Alert} from 'react-native';
import {APP_MESSAGES} from '../commonHelper/appData';
import {getMemberProfile, getSignupData} from '../store/signupReducer';
import {getLogginData} from '../store/loginReducer';
import {Colors} from '../themes/Colors';
import {Picker} from '@react-native-picker/picker';
import MantorySymbol from './mantorySymbol';
import {currencyFormatMask} from '../commonHelper/functionHelper';

const NewClaimsDetailsTab = ({jumpTo}) => {
  const navigation = useNavigation();
  const {claims, loader, upload} = useSelector(getNewCliamData);
  const {data} = useSelector(getLogginData);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  // const [isLoader, setLoader] = useState(false);
  const {msgnewclaim} = APP_MESSAGES;
  const dispatch = useDispatch();

  //   useFocusEffect(
  //   useCallback(() => {
  //    dispatch(resetNewClaimsStateData());
  //  }, []));

  useEffect(() => {
    dispatch(getPolicies({memberId: data.linkId}));

    // dispatch(
    //   getDiagonsisDetails({
    //     compId: '001',
    //     serviceFrom: '2021-03-18',
    //     diagnosisCode: '%%',
    //   }),
    // );
    dispatch(
      getInstitutionName({
        catgId: '112',
        compId: '001',
        providerName: '%%',
      }),
    );
    dispatch(
      getTreatmentTypeData({
        uidIdType: 'MED_TRMT_TYPES',
        compId: '001',
        moduleId: '02',
      }),
    );
    dispatch(
      getDocumentTypeData({
        uidIdType: 'UPL_DOC_LIST',
        compId: '001',
        moduleId: '02',
      }),
    );
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    inputTextWatcher('consAdminDate', moment(currentDate).format('DD/MM/YYYY'));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const action = (goTo) => {
    if (goTo === 'search') {
      navigation.navigate('Search');
    } else if (goTo === 'searchtreatmentType') {
      navigation.navigate('SearchTreatmentType');
    } else if (goTo === 'date') {
      showMode('date');
    }
  };
  const inputTextWatcher = (key, newText) => {
    if (newText) {
      dispatch(
        updateNewClaimsDetails('claims', 'form', {
          ...claims.form,
          [key]: newText,
        }),
      );

      dispatch(
        updateNewClaimsDetails('claims', 'errorMsg', {
          ...claims.errorMsg,
          [key]: null,
        }),
      );
    } else {
      dispatch(
        updateNewClaimsDetails('claims', 'form', {
          ...claims.form,
          [key]: null,
        }),
      );
      dispatch(
        updateNewClaimsDetails('claims', 'errorMsg', {
          ...claims.errorMsg,
          [key]: msgnewclaim[key],
        }),
      );
    }
  };

  const goTo = () => {
    if (checkNewClaimsData('claims', claims)) {
      jumpTo('uploadDocuments');
    }
  };

  function checkNewClaimsData(key, data) {
    let isValid = true;
    let errors = {};
    for (let key of Object.keys(data.form)) {
      if (!data.form[key] && data.required[key]) {
        errors[key] = msgnewclaim[key];
        isValid = false;
      } else {
        dispatch(
          updateNewClaimsDetails('claims', 'errorMsg', {
            ...data.errorMsg,
            [key]: null,
          }),
        );
      }
    }

    if (!isValid) {
      dispatch(
        updateNewClaimsDetails('claims', 'errorMsg', {
          ...data.errorMsg,
          ...errors,
        }),
      );
      console.log('DATA' + JSON.stringify(claims.form));
      console.log('ERR' + JSON.stringify(errors));
      console.log(!isValid);
      if (Object.keys(JSON.stringify(errors)).length === 0) {
        isValid = true;
      }
    }
    return isValid;
  }

  return (
    <SafeAreaView style={styles.parentContainer}>
      <PageLoader isLoading={loader.isLoading} />
      <View style={styles.viewContainer1}>
        <Text style={styles.pageTitle}>CLAIM REQUEST</Text>
      </View>
      <ScrollView>
        <View style={styles.viewContainer2}>
          <View style={[styles.pickerView]}>
            <Text style={styles.treatmentTypeText}>
              POLICY NUMBER <MantorySymbol />{' '}
            </Text>
            <Picker
              selectedValue={
                claims.form.policyNo == null ? '' : claims.form.policyNo
              }
              style={styles.treatmentTypedataText}
              onValueChange={(itemValue, itemIndex) => {
                if (itemIndex == 0) {
                  dispatch(
                    updateNewClaimsDetails('claims', 'form', {
                      ...claims.form,
                      claimant: null,
                      policyNo: null,
                    }),
                  );
                  dispatch(
                    updateNewClaimsDetails('claims', 'policyMembers', []),
                  );
                  return;
                }
                dispatch(
                  updateNewClaimsDetails('claims', 'form', {
                    ...claims.form,
                    claimant: null,
                    policyNo: itemValue,
                  }),
                );
                dispatch(updateNewClaimsDetails('claims', 'policyMembers', []));
                dispatch(
                  getPolicyMembersData({
                    policyId: claims.policies[itemIndex - 1].sgsId,
                    memberId: claims.policies[itemIndex - 1].memberId,
                  }),
                );
              }}>
              <Picker.Item
                label="Please Select"
                value=""
                key="-1"
                style={{
                  fontSize: hp('2%'),
                  marginLeft: wp('-1%'),
                  fontFamily: Fonts.regular.fontFamily,
                  color: Colors.LIGHTBLACK,
                }}
              />
              {claims.policies.map((element) => (
                <Picker.Item
                  label={element.policyNumber}
                  value={element.policyNumber}
                  key={element.sgsId}
                  style={{
                    fontSize: hp('2%'),
                    marginLeft: wp('-1%'),
                    fontFamily: Fonts.regular.fontFamily,
                    color: Colors.LIGHTBLACK,
                  }}
                />
              ))}
            </Picker>

            {claims.errorMsg.policyNo && (
              <Text style={styles.treatmentTypeErrorText}>
                {claims.errorMsg.policyNo}
              </Text>
            )}
          </View>
          <View style={[styles.pickerView, styles.viewTop]}>
            <Text style={styles.treatmentTypeText}>
              NAME OF CLAIMANT <MantorySymbol />{' '}
            </Text>
            <Picker
              selectedValue={
                claims.form.claimant == null ? '' : claims.form.claimant
              }
              style={styles.treatmentTypedataText}
              onValueChange={(itemValue, itemIndex) => {
                claims.form.memberId =claims.policyMembers[itemIndex-1].meMemberId;

                if (itemIndex == 0) {
                  dispatch(
                    updateNewClaimsDetails('claims', 'form', {
                      ...claims.form,
                      claimant: null,
                    }),
                  );
                  return;
                }

                inputTextWatcher('claimant', itemValue);
              }}>
              <Picker.Item
                label="Please Select"
                value=""
                key="-1"
                style={{
                  fontSize: hp('2%'),
                  marginLeft: wp('-1%'),
                  fontFamily: Fonts.regular.fontFamily,
                  color: Colors.LIGHTBLACK,
                }}
              />
              {claims.policyMembers.map((element) => (
                <Picker.Item
                  label={element.memberName}
                  value={element.memberName}
                  key={element.meSgsId}
                  style={{
                    fontSize: hp('2%'),
                    fontFamily: Fonts.regular.fontFamily,
                    color: Colors.LIGHTBLACK,
                  }}
                />
              ))}
            </Picker>
            {claims.errorMsg.claimant && (
              <Text style={styles.treatmentTypeErrorText}>
                {claims.errorMsg.claimant}
              </Text>
            )}
          </View>

          <View style={[{flexDirection: 'row'}, styles.viewTop]}>
            <Input
              label={() => (
                <Text style={styles.labelStyle}>
                  DATE FOR CONSULTATION/ADMISSION
                  <MantorySymbol />
                </Text>
              )}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyletmp}
              containerStyle={{width: wp('97%')}}
              inputContainerStyle={{
                borderBottomWidth: 1,
                marginTop: hp('-2.5%'),
              }}
              disabled={true}
              onChangeText={(newText) =>
                inputTextWatcher('consAdminDate', newText)
              }
              value={claims.form.consAdminDate}
              errorMessage={claims.errorMsg.consAdminDate}
              errorStyle={styles.errorInputStyletemp}
              keyboardType={'default'}
              rightIcon={
                <ReactiveIcon
                  type="fa"
                  iconName="calendar"
                  onClick={() => {
                    console.log('calendar : ' + claims.form.consAdminDate);
                    action('date');
                  }}
                  styles={styles.icon}
                />
              }
            />

            {Platform.OS !== 'ios' && show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                maximumDate={new Date()}
                minimumDate={
                  new Date(
                    moment().subtract(
                      customData.dateConfiguration.NoofWeeksSettings,
                      customData.dateConfiguration.CalculationTerm,
                    ),
                  )
                }
              />
            )}
            {Platform.OS === 'ios' && show && (
              <DateTimePickerModal
                isVisible={true}
                mode="date"
                display="inline"
                date={date == null ? new Date() : date}
                maximumDate={new Date()}
                minimumDate={
                  new Date(
                    moment().subtract(
                      customData.dateConfiguration.NoofWeeksSettings,
                      customData.dateConfiguration.CalculationTerm,
                    ),
                  )
                }
                onCancel={() => {
                  console.log('Cancel - ');
                  setShow(false);
                }}
                onConfirm={(selectedDate) => {
                  console.log('selectedDate - ' + selectedDate);
                  onChange(null, selectedDate);
                  setShow(false);
                }}
              />
            )}
          </View>

          <View style={[{flexDirection: 'row'}, styles.viewTopcontrol]}>
            <Input
              label={() => (
                <Text style={styles.labelStyle}>
                  TREATMENT TYPE
                  <MantorySymbol />
                </Text>
              )}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
              containerStyle={{width: wp('95%')}}
              inputContainerStyle={{
                borderBottomWidth: 1,
                marginTop: hp('-1.5%'),
              }}
              disabled={true}
              onChangeText={(newText) => {
                inputTextWatcher('treatmentType', newText);
              }}
              value={claims.form.treatmentType?.description}
              errorMessage={claims.errorMsg.treatmentType}
              errorStyle={styles.errorInputStyle}
              keyboardType={'default'}
              rightIcon={
                <ReactiveIcon
                  type="fa"
                  iconName="search"
                  onClick={() => action('searchtreatmentType')}
                  styles={styles.icon}
                />
              }
            />
          </View>

          <View style={[{flexDirection: 'row'}, styles.viewTopcontrol]}>
            <Input
              label={() => (
                <Text style={styles.labelStyle}>NATURE OF ILLNESS</Text>
              )}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
              onChangeText={(newText) =>
                inputTextWatcher('natureofillness', newText)
              }
              value={claims.form.natureofillness}
              errorMessage={claims.errorMsg.natureofillness}
              errorStyle={styles.errorInputStyle}
              keyboardType={'default'}
            />
          </View>
          <View style={[{flexDirection: 'row'}, styles.viewTopcontrol]}>
            <Input
              label={() => (
                <Text style={styles.labelStyle}>
                  INSTITUTION NAME
                  {/* <MantorySymbol /> */}
                </Text>
              )}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
              containerStyle={{width: wp('95%')}}
              inputContainerStyle={{
                borderBottomWidth: 1,
                marginTop: hp('-1.5%'),
              }}
              disabled={true}
              onChangeText={(newText) => {
                inputTextWatcher('InstitutionNameReasion', newText);
              }}
              value={claims.form.InstitutionNameReasion?.UPD_NAME}
              errorMessage={claims.errorMsg.InstitutionNameReasion}
              errorStyle={styles.errorInputStyle}
              keyboardType={'default'}
              rightIcon={
                <ReactiveIcon
                  type="fa"
                  iconName="search"
                  onClick={() => action('search')}
                  styles={styles.icon}
                />
              }
            />
          </View>
          <View style={[{flexDirection: 'row'}, styles.viewTopcontrol]}>
            <Input
              label={() => (
                <Text style={styles.labelStyle}>
                  TOTAL CLAIM AMOUNT
                  <MantorySymbol />
                </Text>
              )}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
              onChangeText={(newText) => {
                inputTextWatcher('claimAmount', newText);
              }}
              value={claims.form.claimAmount}
              errorMessage={claims.errorMsg.claimAmount}
              errorStyle={styles.errorInputStyle}
              keyboardType={'phone-pad'}
              /* onBlur={()=>inputTextWatcher('claimAmount', currencyFormatMask(claims.form.claimAmount))} */
            />
          </View>

          {claims.form.treatmentType === 'Dental' && (
            <View style={[{flexDirection: 'row'}, styles.viewTopcontrol]}>
              <Input
                label={() => (
                  <Text style={styles.labelStyle}>
                    TOOTH NUMBER
                    <MantorySymbol />
                  </Text>
                )}
                labelStyle={styles.labelStyle}
                inputStyle={styles.inputStyle}
                onChangeText={(newText) =>
                  inputTextWatcher('toothNumber', newText)
                }
                value={claims.form.toothNumber}
                errorMessage={claims.errorMsg.toothNumber}
                errorStyle={styles.errorInputStyle}
                keyboardType={'default'}
              />
            </View>
          )}
          <View style={[{flexDirection: 'row'}, styles.viewTopcontrol]}>
            <Input
              label={() => <Text style={styles.labelStyle}> REMARKS</Text>}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
              onChangeText={(newText) => inputTextWatcher('remarks', newText)}
              value={claims.form.remarks}
              errorMessage={claims.errorMsg.remarks}
              errorStyle={styles.errorInputStyle}
              keyboardType={'default'}
            />
          </View>
          {claims.form.treatmentType === 'Dental' && (
            <View style={[{flexDirection: 'row'}, styles.viewTopcontrol]}>
              <Input
                label={() => (
                  <Text style={styles.labelStyle}>
                    "ADDITIONAL REMARKS
                    <MantorySymbol />
                  </Text>
                )}
                labelStyle={styles.labelStyle}
                inputStyle={styles.inputStyle}
                onChangeText={(newText) =>
                  inputTextWatcher('additionalRemarks', newText)
                }
                value={claims.form.additionalRemarks}
                errorMessage={claims.errorMsg.additionalRemarks}
                errorStyle={styles.errorInputStyle}
                keyboardType={'default'}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <View>
        <Button
          title="CONTINUE"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          onPress={() => goTo()}></Button>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  viewContainer1: {
    marginLeft: wp('1%'),
    marginTop: hp('1%'),
  },
  viewContainer2: {
    marginTop: hp('0.5%'),
    marginHorizontal: hp('1%'),
    marginVertical: wp('6%'),
  },
  pageTitle: {
    fontFamily: Fonts.regular.fontFamily,
    color: Colors.BLACK,
    fontSize: hp('2.5%'),
  },
  labelStyle: {
    marginLeft: wp('-1%'),
    fontSize: hp('2%'),
    color: Colors.BLACK,
    fontFamily: Fonts.regular.fontFamily,
    width: '100%',
  },
  labelStyletemp: {
    marginTop: hp('4%'),
    marginLeft: wp('-1%'),
    fontSize: hp('2%'),
    color: Colors.BLACK,
    fontFamily: Fonts.regular.fontFamily,
  },
  inputStyle: {
    padding: hp('0%'),
    fontSize: hp('2%'),
    marginLeft: wp('-0.5%'),
    marginTop: hp('-1%'),
    color: Colors.BLACK,
    fontFamily: Fonts.regular.fontFamily,
  },
  inputStyletmp: {
    fontSize: hp('2%'),
    marginLeft: wp('-2%'),
    marginTop: hp('1%'),
    color: Colors.BLACK,
    fontFamily: Fonts.regular.fontFamily,
  },
  buttonStyle: {
    height: hp('8%'),
    backgroundColor: Colors.LIGHTGREEN1,
  },
  titleStyle: {
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
    textAlign: 'center',
  },
  icon: {
    color: Colors.BLACK,
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  errorInputStyle: {
    fontSize: hp('2%'),
    fontFamily: Fonts.regular.fontFamily,
    marginLeft: wp('-1%'),
  },
  errorInputStyletemp: {
    fontSize: hp('2%'),
    marginTop: hp('0%'),
    fontFamily: Fonts.regular.fontFamily,
    marginLeft: wp('-1%'),
  },
  treatmentTypeText: {
    marginLeft: wp('1%'),
    fontSize: hp('2%'),
    color: Colors.BLACK,
    fontFamily: Fonts.regular.fontFamily,
  },
  treatmentTypedataText: {
    marginTop: hp('-2%'),
    marginLeft: wp('-2.8%'),
    fontSize: hp('2%'),
    color: Colors.BLACK,
    fontFamily: Fonts.regular.fontFamily,
  },
  treatmentTypeErrorText: {
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
    marginLeft: wp('1%'),
    color: Colors.RED,
  },
  pickerView: {
    borderBottomWidth: wp('0.1%'),
    borderBottomColor: 'black',
  },
  pickerItem: {
    fontSize: hp('2%'),
    fontFamily: Fonts.regular.fontFamily,
    color: Colors.BLACK,
  },
  viewTop: {marginTop: hp('2%')},
  viewTopcontrol: {marginTop: hp('2%')},
});
export default NewClaimsDetailsTab;
