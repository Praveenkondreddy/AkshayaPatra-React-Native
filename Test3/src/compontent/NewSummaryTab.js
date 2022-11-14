import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  Dimensions,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Text, ListItem, Avatar, Button, Icon} from 'react-native-elements';
import DashLine from './dashLine';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Fonts} from '../fonts/Fonts';
import {
  getNewCliamData,
  resetNewClaimsStateData,
} from '../store/newClaimReducer';
import {
  formatBytes,
  rmCurrencyFormatMask,
} from '../commonHelper/functionHelper';
import {getSignupData} from '../store/signupReducer';
import {Colors} from '../themes/Colors';
import {apiSaveNewClaim} from '../api/apiHelper';
import PageLoader from '../compontent/PageLoader';
import {showAlert} from '../commonHelper/alertHelper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getLogginData} from '../store/loginReducer';
import moment from 'moment';
import {ScrollView} from 'react-native';

const NewSummaryTab = ({jumpTo}) => {
  const [imageView, setImageView] = useState(false);
  const [imageViewData, setimageViewData] = useState({});
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {claims, upload} = useSelector(getNewCliamData);
  const {memberProfile} = useSelector(getSignupData);
  const [loader, setLoader] = useState(false);
  const {data} = useSelector(getLogginData);
  console.log('claims.form', claims.form);

  const submitClaim = async () => {
    const formData = new FormData();
    //formData.append('memberId', data.linkId);
    formData.append('memberId', claims.form.memberId);
    formData.append('memberName', data.userName);
    formData.append('policyNo', claims.form.policyNo);
    // formData.append('diagId', claims.form.claimReason.DiagnosisCode);
    formData.append('providerId', claims.form.InstitutionNameReasion.UPD_ID);
    formData.append('illnessname', claims.form.natureofillness);
    //formData.append('requestAmount', rmCurrencyFormatMask(claims.form.claimAmount));
    formData.append('requestAmount', claims.form.claimAmount);
    formData.append('requestDate', claims.form.consAdminDate);
    formData.append('type', claims.form.treatmentType.id);
    formData.append('treatmenValue', claims.form.treatmentType.value);
    formData.append('toothNo', claims.form.toothNumber);
    formData.append('remarks ', claims.form.remarks);
    formData.append('addlRemarks ', claims.form.additionalRemarks);
    formData.append('reportBy ', 'APP');
    formData.append('crBy ', data.userId);
    var loop = [];
    for (let obj of upload.files) {
      formData.append('documents', obj.data);
      let map = {
        documentId: obj.id,
        documentType: '',
        documentName: '',
      };
      loop.push(map);
    }
    formData.append('docList', JSON.stringify(loop));
    console.log('loop' + JSON.stringify(loop));
    setLoader(true);
    try {
      console.log('Save Data ' + JSON.stringify(formData));
      const response = await apiSaveNewClaim(formData);
      const {status, message} = response.data;
      console.log(response.data + 'Msg : ' + status);
      if (status === 'success') {
        dispatch(resetNewClaimsStateData());
        let msg =
          message +
          '\n' +
          '\nPlease retain original documents for a period of 6 months';
        const alertResponse = await showAlert(msg, false);

        if (alertResponse) {
          navigation.navigate('Home');
        }
      } else {
        console.log('res : ' + response);
        showAlert('Claim sumbmission has been failed', false);
      }
    } catch (error) {
      showAlert(JSON.stringify(error.message), false);
    } finally {
      setLoader(false);
    }
  };
  const closeImageViewer = (item) => {
    setimageViewData(item);
    setImageView(true);
  };
  const RenderFlatListItems = ({item, closeImageViewer}) => {
    console.log('item', item);
    const fileSize = formatBytes(item.data.size);
    return (
      <>
        <View style={{flex: 1}}>
          <ListItem bottomDivider={true}>
            <ListItem.Content style={styles.listContent}>
              <View style={styles.viewContainer}>
                <Avatar
                  size={hp('5%')}
                  rounded
                  icon={{
                    name: 'document-text-outline',
                    type: 'ionicon',
                    color: Colors.BLACK,
                  }}
                  containerStyle={styles.containerStyle1}
                />
                <View style={styles.viewContainer10}>
                  <Text
                    onPress={() => closeImageViewer(item.data)}
                    style={styles.fileName}>
                    {item.data.name}
                  </Text>
                  <Text style={styles.fileSize}>{fileSize}</Text>
                </View>
                <Avatar
                  size={hp('3%')}
                  rounded
                  overlayContainerStyle={styles.overlayContainer}
                  icon={{
                    name: 'md-checkmark',
                    type: 'ionicon',
                    color: Colors.WHITE,
                    size: hp('2%'),
                  }}
                  containerStyle={styles.containerStyle}
                  activeOpacity={0.7}
                />
              </View>
            </ListItem.Content>

            <ListItem.Chevron color={Colors.WHITE} />
          </ListItem>
        </View>
        <View style={styles.horizontalLine}></View>
      </>
    );
  };
  return (
    <View style={styles.parentContainer}>
      <PageLoader isLoading={loader} />
      <View style={styles.viewContainer1}>
        <Text style={styles.claimsTitle}>CLAIM REQUEST</Text>
      </View>
      <Modal animationType="slide" transparent={true} visible={imageView}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={() => setImageView(false)}>
                <Icon
                  name="close"
                  type="font-awesome"
                  iconStyle={styles.thumbsIcon}
                />
              </TouchableOpacity>
            </View>

            <Image
              source={{uri: imageViewData.uri}}
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.viewContainer2}>
        <ScrollView nestedScrollEnabled>
          <View style={styles.viewContainer3}>
            <View style={styles.viewContainer4}>
              <Text style={styles.claimsTextTitle}>Policy Number#</Text>
              <Text style={styles.claimsTextData}>{claims.form.policyNo}</Text>
            </View>
            <View style={styles.viewContainer5}>
              <Text style={styles.claimsTextTitle}>Name of Claimant</Text>
              <Text style={styles.claimsTextData}>{claims.form.claimant}</Text>
            </View>

            <View style={styles.viewContainer5}>
              <Text style={styles.claimsTextTitle}>Nature of Illness</Text>
              <Text style={styles.claimsTextData}>
                {claims.form.natureofillness}
              </Text>
            </View>
          </View>
          <View style={styles.viewContainer6}>
            <View style={styles.viewContainer4}>
              <Text style={styles.claimsTextTitle}>
                Date for Consultation/Admission
              </Text>
              <Text style={styles.claimsTextData}>
                {claims.form.consAdminDate}
              </Text>
            </View>
          </View>

          <View style={styles.viewContainer6}>
            <View style={styles.viewContainer4}>
              <Text style={styles.claimsTextTitle}>Treatment Type</Text>
              <Text style={styles.claimsTextData}>
                {claims.form.treatmentType?.description}
              </Text>
            </View>
          </View>

          <View style={styles.viewContainer6}>
            <View style={styles.viewContainer4}>
              <Text style={styles.claimsTextTitle}>Institution Name</Text>
              <Text style={styles.claimsTextData}>
                {claims.form.InstitutionNameReasion?.UPD_NAME}
              </Text>
            </View>
          </View>

          <View style={styles.viewContainer6}>
            <View style={styles.viewContainer4}>
              <Text style={styles.claimsTextTitle}>Claim Amount</Text>
              <Text style={styles.claimsTextData}>
                {claims.form.claimAmount}
              </Text>
            </View>
          </View>
          <DashLine />
        </ScrollView>
        <View style={styles.viewContainer1}>
          <Text style={styles.claimsTitle}>DOCUMENTS</Text>
        </View>
        <View>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={upload.files}
            renderItem={(item) => (
              <RenderFlatListItems
                item={item.item}
                closeImageViewer={closeImageViewer}></RenderFlatListItems>
            )}
            style={{height: hp('30%')}}
          />
        </View>
      </View>

      <View style={styles.viewContainer9}>
        <Button
          title="BACK"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          onPress={() => jumpTo('uploadDocuments')}></Button>
        <Button
          title="SUMBIT"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          onPress={submitClaim}></Button>
      </View>
      {/* <AlertModal alertVisible={modalVisible}/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {flex: 1, backgroundColor: Colors.WHITE},
  listContent: {
    margin: 0,
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileName: {
    marginHorizontal: wp('4%'),
    color: Colors.BLACK,
    fontSize: hp('2.1%'),
  },
  fileSize: {
    marginHorizontal: wp('4%'),
    fontSize: hp('1.8%'),
    color: Colors.LIGHTGRAY3,
  },
  claimsTitle: {
    fontFamily: Fonts.regular.fontFamily,
    color: Colors.LIGHTBLACK,
    fontSize: hp('2.2%'),
  },
  claimsTextTitle: {
    color: Colors.LIGHTGRAY1,
    fontSize: hp('2%'),
    fontFamily: Fonts.light.fontFamily,
  },
  claimsTextData: {
    color: Colors.BLACK,
    fontSize: hp('2%'),
    fontFamily: Fonts.regular.fontFamily,
    width: wp('90%'),
  },
  buttonStyle: {
    width: '100%',
    height: hp('7%'),
    backgroundColor: Colors.LIGHTGREEN1,
    marginHorizontal: hp('0.1%'),
  },
  titleStyle: {
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
    textAlign: 'center',
  },
  viewContainer1: {
    marginLeft: wp('4.5%'),
    marginTop: hp('2%'),
  },
  viewContainer2: {
    marginLeft: wp('2%'),
    marginTop: hp('1%'),
    flex: 1,
  },
  viewContainer3: {
    flexDirection: 'column',
    marginVertical: hp('1%'),
  },
  viewContainer4: {
    marginHorizontal: wp('6%'),
  },
  viewContainer5: {
    marginLeft: wp('6%'),
    marginTop: hp('2%'),
  },
  viewContainer6: {
    flexDirection: 'row',
    marginVertical: hp('2%'),
  },
  viewContainer7: {
    marginHorizontal: wp('3%'),
    width: wp('50%'),
  },
  viewContainer8: {
    marginLeft: wp('3%'),
  },
  viewContainer9: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewContainer10: {
    flexDirection: 'column',
    flex: 2,
  },
  overlayContainer: {
    backgroundColor: Colors.LIGHTGREEN,
  },
  containerStyle: {
    backgroundColor: Colors.DASH,
    marginTop: hp('-2%'),
    marginLeft: wp('2%'),
  },
  containerStyle1: {
    backgroundColor: Colors.DASH,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    height: '95%',
    width: '100%',
    padding: 35,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  thumbsIcon: {
    color: Colors.BLACK,
    fontSize: hp('5%'),
  },
});
export default NewSummaryTab;
