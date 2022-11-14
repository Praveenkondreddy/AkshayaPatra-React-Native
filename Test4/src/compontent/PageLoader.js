import React, { useState } from 'react';
import {
  StyleSheet,

} from 'react-native';
import Loader from 'react-native-modal-loader';
import { Colors } from '../themes/Colors';
const PageLoader = ({isLoading}) => {
  
  return (
    <Loader
    loading={isLoading}
    color={Colors.LOADER}
    size="large"
    opacity="0.4"
    title="Logging in Please wait ..."
  />
  )
}

const styles = StyleSheet.create({});

export default PageLoader;