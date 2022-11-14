import api from '../api/api';
import {storeStringData, getStringData} from '../api/localstorage';
import {useDispatch, useSelector} from 'react-redux';

export async function postRequest(apiURL, requestData, options) {
  // if (apiURL == 'api/login/signIn') {
  //   apiURL = 'SICOM_CORE_QC/' + apiURL;
  // } else {
  //   apiURL = 'SICOM_CORE_QC/core/' + apiURL;
  // }
  // console.log('apiURL', apiURL, requestData);

  //
  if (
    apiURL == 'api/login/signIn' ||
    apiURL.includes('virus/api/scan/uploadFileForScan')
  ) {
    apiURL = '/health-digital/' + apiURL;
  } else {
    apiURL = '/health-digital/core/' + apiURL;
  }
  console.log('apiURL', apiURL);

  //   apiURL = '/providerservice/' + apiURL;
  // } else {
  //   apiURL = '/providerservice/core/' + apiURL;
  // }
  await requestInterceptors(options);

  return await api.post(apiURL, requestData, options).catch((err) => {
    let errorMessage = null;
    console.log('error', err);
    // if (err.response.data.error) {
    //   console.log('Error');
    //   //throw new Error(`${err.config.url} not found`);

    //   errorMessage =
    //     'The server is temporarily unable to service your request due to maintenance downtime or capacity problems. Please try again later.';
    //   if (err.response.data.error) {
    //     console.log('Error');
    //     if (err.response.status != 503) {
    //       errorMessage = err.response.data.error;
    //     }

    //     throw new Error(errorMessage);
    //   } else {
    //     throw new Error(errorMessage);
    //   }
    // } else {
    //   // network error
    //   errorMessage =
    //     'The server is temporarily unable to service your request due to maintenance downtime or capacity     problems. Please try again later.';
    //   throw new Error(errorMessage);
    // }
  });
}

export async function getRequest(apiURL) {
  // if (apiURL == 'api/login/signIn') {
  //   apiURL = 'SICOM_CORE_QC/' + apiURL;
  // } else {
  //   apiURL = 'SICOM_CORE_QC/core/' + apiURL;
  // }
  if (apiURL == 'api/login/signIn') {
    apiURL = '/health-digital/' + apiURL;
  } else {
    apiURL = '/health-digital/core/' + apiURL;
  }
  //   apiURL = '/providerservice/' + apiURL;
  // } else {
  //   apiURL = '/providerservice/core/' + apiURL;
  // }
  await requestInterceptors({});
  return await api.get(apiURL);
}

const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      // We have data!!
      // console.log('asdasdas', value);
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
};

export async function requestInterceptors(options) {
  // declare a request interceptor
  //api.defaults.timeout = 500;
  api.interceptors.request.use(
    async (request) => {
      // perform a task before the request is sent
      //const {token}=options;

      //request.headers.authorization = (token)?token:'Token is null';
      /* const {token} = useSelector(getLogginData);
      console.log(token) */
      if (!request.url.includes('api/login/signIn')) {
        //const token = await getStringValue("token");
        let value = await getStringData('token');
        if (value.success) {
          const token = value.value;
          request.headers['Authorization'] = token;
        }
      }

      if (request.url.includes('saveClaimDetails')) {
        request.headers['Content-Type'] = 'multipart/form-data';
      } else {
        request.headers['Content-Type'] = ' application/json';
      }

      return request;
    },
    (error) => {
      // handle the error
      return Promise.reject(error);
    },
  );
}
