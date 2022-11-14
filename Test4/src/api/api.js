import axios from 'axios';

export default axios.create({
  //baseURL:'http://192.168.230.128:8083/'
  //baseURL:'http://192.168.2.115:9098/'
  // baseURL:'http://localhost:8083/'
  // baseURL: 'https://support.beyontec.com/',
  //baseURL: 'http://10.100.0.112:9098/',
  // baseURL: 'http://192.168.1.191:9093',
  //baseURL: 'https://test-health.sicom.mu/',
  // baseURL:'https://medapptest.mua.mu/'
  // baseURL:'https://medapppreprod.mua.mu/'
  //baseURL: 'http://192.168.43.39:8083/providerservice/',
  //QC//
  // baseURL: 'https://support.beyontec.com/',
  //UAT//
  //baseURL: 'https://test-health.sicom.mu/providerservice/',
  //TokenAuth UAT
  baseURL: 'https://m-health.sicom.mu',
  //Production//
  // baseURL: 'https://m-health.sicom.mu/providerservice/',
});
