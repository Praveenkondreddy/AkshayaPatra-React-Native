import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import {storeStringData, getStringData} from '../api/localstorage';
import FileViewer from 'react-native-files-viewer';
import {Text, ListItem, Avatar, Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getPoliciesData} from '../store/policiesReducer';
import {Colors} from '../themes/Colors';
import {Fonts} from '../fonts/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DocumentsTab = () => {
  const [imageView, setImageView] = useState(false);
  const [imageViewData, setimageViewData] = useState({});
  const navigation = useNavigation();
  const {claimsDetails} = useSelector(getPoliciesData);

  const viewDocument = async (item) => {
    console.log('item123', item);
    if (Platform.OS === 'android') {
      let filename = item;
      let url =
        //QC 'https://support.beyontec.com/SICOM_CORE_QC/core/api/document/viewClaimDocument?docName=' +
        'https://m-health.sicom.mu/health-digital/core/api/document/viewClaimDocument?docName=' +
        filename;
      let mimeType = 'image/*';
      let filetype = 'jpg';

      let dotIndex = String(filename).lastIndexOf('.');
      let extension = String(filename).substring(
        dotIndex,
        String(filename).length,
      );
      if (extension.includes('pdf')) {
        mimeType = 'application/pdf';
        filetype = 'pdf';
      } else if (extension.includes('png')) {
        mimeType = 'image/*';
        filetype = 'png';
      }
      let value = await getStringData('token');
      if (value.success) {
        const token = value.value;

        const path = FileViewer.openDoc(
          {
            url: url,
            onlineurl: false,
            token: token,
            fileName: filename,
            fileType: filetype,
            cache: false,
            mimeType: mimeType,
          },
          (err) => {
            console.log('yes', err);
          },
        );
      }
    }
  };

  const closeImageViewer = (remarks) => {
    const uri =
      //QC  'https://support.beyontec.com/MUA_MOBILE_QC/api/document/viewClaimDocument?docName=' +
      'https://m-health.sicom.mu/health-digital/core/api/document/viewClaimDocument?docName=' +
      remarks;
    console.log('uri', uri);
    const item = {uri: uri};
    setimageViewData(item);
    console.log('imageviewdata', imageViewData);
    setImageView(true);
  };
  const RenderFlatListItems = ({item, index}) => {
    console.log('item', item);
    return (
      <>
        <ListItem bottomDivider={false}>
          <ListItem.Content style={styles.listContent}>
            <TouchableOpacity onPress={() => viewDocument(item.remarks)}>
              <View style={styles.viewContainer}>
                <Avatar
                  roundedb 
                  icon={{
                    name: 'document-text-outline',
                    type: 'ionicon',
                    color: Colors.BLACK,
                  }}
                  containerStyle={{backgroundColor: Colors.DASH}}
                />
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.fileName}>{item.documentName}</Text>
                  <Text style={styles.fileSize}>{item.fileSize}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ListItem.Content>

          <ListItem.Chevron color={Colors.WHITE} />
        </ListItem>
        {index === claimsDetails.documentDtoss.length - 1 ? (
          <View style={styles.horizontalLine}></View>
        ) : null}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Text h4 h4Style={styles.title}>
        CLAIM DOCUMENTS
      </Text>
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
      <View style={styles.horizontalLine}></View>

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={claimsDetails.documentDtoss || []}
        renderItem={(item) => (
          <RenderFlatListItems item={item.item}></RenderFlatListItems>
        )}
        style={{height: 300}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: hp('2.2%'),
    marginLeft: wp('2%'),
    color: Colors.BLUE1,
    fontFamily: Fonts.ui.fontFamily,
    textTransform: 'uppercase',
    marginTop: hp('2%'),
  },
  horizontalLine: {
    backgroundColor: Colors.LIGHTGRAY2,
    height: hp('0.5%'),
    width: 'auto',
    marginTop: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashLine: {
    width: wp('100%'),
    flexDirection: 'row',
    marginTop: 5,
    borderRadius: 100,
  },
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
    fontSize: hp('1.6%'),
    color: Colors.LIGHTGRAY3,
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
export default DocumentsTab;
