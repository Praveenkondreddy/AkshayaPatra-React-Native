import {Platform, PermissionsAndroid} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {formatBytes} from './functionHelper';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

import FileViewer from 'react-native-files-viewer';
export const fileChooser = async () => {
  // Opening Document Picker to select one file
  try {
    const res = await DocumentPicker.pick({
      // Provide which type of file you want user to pick
      type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      // There can me more options as well
      // DocumentPicker.types.allFiles
      // DocumentPicker.types.images
      // DocumentPicker.types.plainText
      // DocumentPicker.types.audio
      // DocumentPicker.types.pdf
    });

    return {status: checkFileSize(res.size) > 5 ? 450 : 200, data: res};
  } catch (err) {
    // Handling any exception (If any)
    if (DocumentPicker.isCancel(err)) {
      // If user canceled the document selection
      alert('Canceled');
    } else {
      // For Unknown Error
      alert('Unknown Error: ' + JSON.stringify(err));
      throw err;
      // return {status:500,data:err};
    }
  }
};

export const openCamera = async () => {
  try {
    const response = await MultipleImagePicker.openPicker({
      maxSelectedAssets: 5,
      mediaType: 'image',
      isPreview: true,
      singleSelectedMode: true,
      usedCameraButton: true,
    });
    let responseData = [response];
    let status = 200;
    let images = [];
    for (const data of responseData) {
      data['uri'] =
        Platform.OS === 'ios' ? data.path : 'file://' + data.realPath;
      data['name'] = data.fileName;
      data['type'] = data.mime;
      if (checkFileSize(data.size) > 5) {
        status = 450;
        images = [];
        break;
      }
      images.push(data);
    }

    return {status, data: images};
  } catch (error) {
    console.log(error);
  }
};
function checkFileSize(size) {
  return size / 4096 / 4096;
}
export const uploadFile = async () => {
  // Check if any file is selected or not
  if (singleFile != null) {
    // If file selected then create FormData
    const fileToUpload = singleFile;
    const data = new FormData();
    data.append('name', 'Image Upload');
    data.append('file_attachment', fileToUpload);
    // Please change file upload URL
    let res = await fetch('http://localhost/upload.php', {
      method: 'post',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data; ',
      },
    });
    let responseJson = await res.json();
    if (responseJson.status == 1) {
      alert('Upload Successful');
    }
  } else {
    // If no file selected the show alert
    alert('Please Select File first');
  }
};
/* const fileUrl =
    'https://www.sicom.mu/images/img-logo-sicom.png'; */
const fileUrl = 'https://www.clickdimensions.com/links/TestPDFfile.pdf';
//const fileUrl ='https://support.beyontec.com/providerservice/api/document/documentDownloadFile?docName=excel&memberId=165106&policyId=165106&docType=application/pdf';

const checkPermission = async () => {
  // Function to check the platform
  // If Platform is Android then check for permissions.

  if (Platform.OS === 'ios') {
    downloadFile();
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'Application needs access to your storage to download File',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Start downloading
        downloadFile();
        console.log('Storage Permission Granted.');
      } else {
        // If permission denied then show alert
        Alert.alert('Error', 'Storage Permission Not Granted');
      }
    } catch (err) {
      // To handle permission related exception
      console.log('++++' + err);
    }
  }
};

const downloadFile = () => {
  // Get today's date to add the time suffix in filename
  let date = new Date();
  // File URL which we want to download
  let FILE_URL = fileUrl;
  // Function to get extention of the file url
  let file_ext = getFileExtention(FILE_URL);

  //file_ext = '.' + file_ext[0];
  file_ext = '.pdf';

  // config: To get response by passing the downloading related options
  // fs: Root directory path to download

  let RootDir = fs.dirs.DownloadDir;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      path:
        RootDir +
        '/file_' +
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        file_ext,
      description: 'downloading file...',
      notification: true,
      // useDownloadManager works with Android only
      useDownloadManager: true,
    },
  };
  config(options)
    .fetch('GET', FILE_URL)
    .then((res) => {
      // Alert after successful downloading
      console.log('res -> ', JSON.stringify(res));
      FileViewer.open(res.data, {showOpenWithDialog: true})
        .then(() => {
          // success
        })
        .catch((error) => {
          // error
        });
      // alert('File Downloaded Successfully.');
    });
};

const getFileExtention = (fileUrl) => {
  // To get the file extension
  return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
};
export const fileDownload = async () => {
  checkPermission();
};
