import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import {
  Button,
  Text,
  ListItem,
  Avatar,
  Card,
  Icon,
} from 'react-native-elements';
import PageLoader from '../compontent/PageLoader';
import {Fonts} from '../fonts/Fonts';
import FileViewer from 'react-native-files-viewer';
import {SvgXml} from 'react-native-svg';
import {upload as uploadSvg} from '../../assets/icons/cloud-upload.svg';
import {fileChooser, openCamera} from '../commonHelper/fileChooser';
import {apidocumentscanner} from '../api/apiHelper';
import {useDispatch, useSelector} from 'react-redux';
import {
  getNewCliamData,
  updateNewClaimsDetails,
} from '../store/newClaimReducer';
import {formatBytes} from '../commonHelper/functionHelper';
import {Alert} from 'react-native';
import {APP_MESSAGES} from '../commonHelper/appData';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors} from '../themes/Colors';
import {Picker} from '@react-native-picker/picker';
import MantorySymbol from './mantorySymbol';
import {TouchableOpacity} from 'react-native';
import {useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import {getMemberData} from '../store/signupReducer';

const NewUploadsTab = ({jumpTo}) => {
  const {upload, claims} = useSelector(getNewCliamData);
  const {memberProfileData} = useSelector(getMemberData);

  const {msgnewclaim} = APP_MESSAGES;
  const [open, setOpen] = useState(upload.open);
  const [value, setValue] = useState(upload.docType);
  const [items, setItems] = useState(upload.docTypes);
  const [imageView, setImageView] = useState(false);
  const [loader, setLoader] = useState(false);
  const [imageViewData, setimageViewData] = useState({});
  const fileExtArr = ['.jpg', '.png', '.jepg'];
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Upload');
    console.log('asdasdasdas', upload);

    upload.docTypes.forEach((mapDoc) => {
      if (!String(mapDoc.description).includes('*'))
        mapDoc.description =
          mapDoc.value === 'M#*'
            ? mapDoc.description + '   *'
            : mapDoc.description;
    });
  }, [upload]);
  const closeImageViewer = async (item) => {
    console.log('image data', item);
    let file = String(item.name).toLowerCase();
    let startIndex = file.indexOf('.');
    let extention = file.substring(startIndex, file.length);

    if (fileExtArr.indexOf(extention) != -1) {
      setimageViewData(item);
      setImageView(true);
    } else {
      console.log('extention', extention);
      try {
        if (item.uri.startsWith('content://')) {
          if (Platform.OS === 'android') {
            const path = FileViewer.openDoc(
              {url: item.uri, onlineurl: true, mimeType: item.type},
              () => {
                console.log('yes');
              },
            ); // absolute-path-to-my-local-file.
          }
        }
        console.log('item.uri', item.uri);
      } catch (e) {
        console.log('error', e);
      }
    }
  };
  const RenderFlatListItem = ({items, closeImageViewer}) => {
    const {index, item} = items;
    console.log('---------', items);
    const fileSize = formatBytes(item.data.size);
    return (
      <>
        <ListItem bottomDivider={true}>
          <ListItem.Content style={styles.listContent}>
            <View style={styles.viewContainer}>
              <Avatar
                size={hp('5%')}
                rounded
                icon={{
                  name: 'document-text-outline',
                  type: 'ionicon',
                  color: Colors.WHITE,
                }}
                containerStyle={{backgroundColor: Colors.LIGHTGREEN}}
              />
              <View style={{flexDirection: 'column', flex: 2}}>
                <Text
                  style={styles.fileName}
                  onPress={() => closeImageViewer(item.data)}>
                  {item.data.name}
                </Text>
                <Text style={styles.fileSize}>{fileSize}</Text>
              </View>
              <TouchableOpacity>
                <Avatar
                  size={hp('3.5%')}
                  rounded
                  overlayContainerStyle={{backgroundColor: Colors.RED}}
                  icon={{
                    name: 'close-outline',
                    type: 'ionicon',
                    color: Colors.WHITE,
                    size: hp('2%'),
                  }}
                  containerStyle={{
                    backgroundColor: Colors.DASH,
                    marginTop: -10,
                    marginLeft: 10,
                  }}
                  activeOpacity={0.7}
                  onPress={() => deleteFile(item.id)}
                />
              </TouchableOpacity>
            </View>
          </ListItem.Content>

          <ListItem.Chevron color={Colors.WHITE} />
        </ListItem>
        <View style={styles.horizontalLine}></View>
      </>
    );
  };
  const deleteFile = (id) => {
    const postDeletedFile = upload.files.filter((data) => data.id != id);
    dispatch(updateNewClaimsDetails('upload', 'files', postDeletedFile));
  };

  const showFile = (data) => {};

  function dispatchFilesData(files) {
    dispatch(updateNewClaimsDetails('upload', 'files', files));
    dispatch(updateNewClaimsDetails('upload', 'docType', null));
    dispatch(updateNewClaimsDetails('upload', 'errorMsg', null));
    setValue(null);
  }
  const documentscanservice = async (file) => {
    const formData = new FormData();
    //formData.append('memberId', data.linkId);
    formData.append('memberId', data.linkId);
    formData.append('memberName', data.userName);
    formData.append('policyNo', claims.form.policyNo);
    formData.append('providerId', claims.form.InstitutionNameReasion.UPD_ID);
    formData.append('illnessname', claims.form.natureofillness);
    formData.append('documents', file);
    var loop = [];

    setLoader(true);
    try {
      console.log('Save Data ' + JSON.stringify(formData));
      const response = await apidocumentscanner(formData);
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
        showAlert('Claim submission has been failed', false);
      }
    } catch (error) {
      showAlert(JSON.stringify(error.message), false);
    } finally {
      setLoader(false);
    }
  };
  const uploadDocument = async (type) => {
    if (value) {
      console.log('memberProfileData', memberProfileData);
      const fileResponse =
        type === 'C' ? await openCamera() : await fileChooser();
      console.log('fileResponse', fileResponse.data);
      if (fileResponse.status === 200) {
        let fileArr = [];
        fileArr.push(fileResponse.data);
        const files = upload.files;
        const formData = new FormData();

        formData.append('memberId', memberProfileData.memberId);
        formData.append('memberName', memberProfileData.memberName);
        //formData.append('documents', fileResponse.data);
        if (!Array.isArray(fileResponse.data)) {
          console.log('if condition', fileResponse.data);

          formData.append('documents', fileResponse.data);
        } else {
          console.log('else condition', fileResponse.data);

          formData.append('documents', fileResponse.data[0]);
        }

        // var loop = [];

        setLoader(true);
        try {
          console.log('Save Data ' + JSON.stringify(formData));
          const response = await apidocumentscanner(formData);
          const {status, message} = response.data;
          console.log('response api', status, message);
          console.log('response------', response);
          if (status == 200) {
            // var files = [];
            if (Array.isArray(fileResponse.data)) {
              fileResponse.data.forEach((item) => {
                let _fileObj = {
                  id: upload.docType,
                  data: item,
                };

                files.push(_fileObj);
              });
            } else {
              let _fileObj = {
                id: upload.docType,
                data: fileResponse.data,
              };

              files.push(_fileObj);
            }
            dispatchFilesData(files);
          } else {
            alert(message);
          }
        } catch (error) {
          console.log(error);
          // showAlert(JSON.stringify(error.message), false);
        } finally {
          setLoader(false);
        }
      } else if (fileResponse.status === 450) {
        console.log('fileResponse1', fileResponse);
        setTimeout(() => {
          alert('Please upload the file size below 5MB');
        }, 200);
      }
    } else {
      alert('Please select the valid document type');
    }
  };

  const goTo = () => {
    if (checkNewClaimsData()) {
      jumpTo('summary');
    }
  };
  function checkNewClaimsData() {
    const docs = upload.docTypes.filter(
      (data) =>
        data.value === 'M#*' ||
        data.value === (claims.form.treatmentType === '01' ? 'M#IP' : 'M#OP') ||
        data.value === 'M#IP,M#OP',
    );
    console.log('docs:', docs);
    console.log('Upload Files: ', upload.files);
    for (let obj of docs) {
      const _index = upload.files.findIndex((data) => data.id === obj.id);

      console.log('index:', _index);

      if (_index == -1) {
        dispatch(
          updateNewClaimsDetails(
            'upload',
            'errorMsg',
            `${obj.description} ${msgnewclaim.uploadDoc1}`,
          ),
        );
        return false;
      }
    }

    if (upload.files.length === 0) {
      console.log('uploadDoc ' + JSON.stringify(msgnewclaim.uploadDoc));
      dispatch(
        updateNewClaimsDetails('upload', 'errorMsg', msgnewclaim.uploadDoc),
      );
      return false;
    } else {
      dispatch(updateNewClaimsDetails('upload', 'errorMsg', null));
      return true;
    }
  }

  return (
    <View style={styles.parentContainer}>
      <PageLoader isLoading={loader} />
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

      <View
        style={{
          margin: 5,
          marginTop: 10,
          width: '95%',
          zIndex: 2000,
          height: '30%',
        }}>
        <Text style={[styles.treatmentTypeText]}>
          Document Type <MantorySymbol />{' '}
        </Text>
        <DropDownPicker
          schema={{
            label: 'description', // required
            value: 'id', // required
          }}
          open={open}
          value={value}
          items={upload.docTypes}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          dropDownMaxHeight={700}
          listItemContainerStyle={{overflow: 'scroll', flexGrow: 1}}
          placeholder="Select your document type"
          style={{overflow: 'scroll'}}
          dropDownContainerStyle={{
            overflow: 'scroll',
          }}
          onChangeValue={(value) => {
            array=upload.files;
          
            if(array[0]!==undefined){
              const dataType = array.some((item)=>{
                        return item.id==value;
              })
                   
              if (dataType===true){

                Alert.alert("Alert","Same document type cannot be selected.");
                setValue(null);
              }
              else{
                dispatch(updateNewClaimsDetails('upload', 'docType', value));
              }      
            }
            else{
            dispatch(updateNewClaimsDetails('upload', 'docType', value));
            }
          }}
        />
      </View>
      <View style={{backgroundColor: Colors.BLUE1}}>
        <View style={styles.viewContainer2}>
          <Card containerStyle={[styles.cardContainer]}>
            <Button
              title="Take a photo"
              type="outline"
              titleStyle={styles.cardBtnTitle}
              buttonStyle={styles.cardBtnStyle}
              onPress={() => uploadDocument('C')}
              icon={
                <Icon
                  name="camera"
                  size={13}
                  color="white"
                  type="ionicon"
                  style={styles.cardBtnIcon}
                />
              }
            />
          </Card>
          <Card containerStyle={[styles.cardContainer]}>
            <Button
              title="Choose File"
              type="outline"
              titleStyle={styles.cardBtnTitle}
              buttonStyle={styles.cardBtnStyle}
              onPress={() => uploadDocument('F')}
              icon={
                <Icon
                  name="file-tray"
                  size={13}
                  color="white"
                  type="ionicon"
                  style={styles.cardBtnIcon}
                />
              }
            />
          </Card>
        </View>
        <Text style={styles.uploadText}>
          Maximum upload file size is 5 MB each.
        </Text>
      </View>
      {upload.errorMsg && (
        <Text style={styles.errorMsg}>{upload.errorMsg}</Text>
      )}
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={upload.files}
        renderItem={(item) => (
          <RenderFlatListItem
            closeImageViewer={closeImageViewer}
            items={item}></RenderFlatListItem>
        )}
        style={{height: hp('30%')}}
      />

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button
          title="BACK"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          onPress={() => jumpTo('newClaims')}></Button>
        <Button
          title="CONTINUE"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          onPress={() => goTo()}></Button>
      </View>
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
    fontSize: hp('2%'),
  },
  fileSize: {
    marginHorizontal: wp('4%'),
    fontSize: hp('1.7%'),
    color: Colors.LIGHTGRAY3,
  },
  buttonStyle: {
    width: '100%',
    height: hp('8%'),
    backgroundColor: Colors.LIGHTGREEN1,
    marginHorizontal: wp('0.2%'),
  },
  titleStyle: {
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
    textAlign: 'center',
  },
  viewContainer1: {
    marginHorizontal: wp('10%'),
    marginVertical: hp('3%'),
    flexDirection: 'column',
    alignItems: 'center',
  },
  uploadbutton: {
    borderColor: Colors.WHITE,
    borderRadius: 25,
    width: wp('60%'),
    height: hp('7%'),
  },
  uploadText: {
    fontFamily: Fonts.light.fontFamily,
    color: Colors.WHITE,
    opacity: 0.5,
    fontSize: hp('1.7%'),
    textAlign: 'center',
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
  },
  errorMsg: {
    fontFamily: Fonts.regular.fontFamily,
    color: Colors.RED,
    fontSize: hp('2%'),
    textAlign: 'center',
    marginTop: hp('2%'),
    marginHorizontal: wp('2%'),
  },
  treatmentTypeText: {
    marginLeft: wp('1%'),
    fontSize: hp('2%'),
    color: Colors.BLACK,
    fontFamily: Fonts.regular.fontFamily,
  },
  treatmentTypeErrorText: {
    fontFamily: Fonts.regular.fontFamily,
    fontSize: 12,
    marginLeft: 15,
    color: Colors.RED,
  },
  pickerView: {
    borderBottomWidth: wp('0.3%'),
    borderBottomColor: 'black',
    marginHorizontal: wp('2%'),
    marginVertical: hp('1%'),
  },
  pickerItem: {
    fontSize: hp('2%'),
    fontFamily: Fonts.regular.fontFamily,
    color: Colors.LIGHTBLACK,
  },
  viewContainer2: {
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  cardContainer: {
    backgroundColor: Colors.BLUE1,
    borderColor: 'transparent',
    marginLeft: 21,
  },
  cardBtnTitle: {color: Colors.WHITE, fontSize: hp('2%')},
  cardBtnStyle: {borderColor: 'white'},
  cardBtnIcon: {marginRight: 10},
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
export default NewUploadsTab;
