import React from 'react';
import {Alert} from 'react-native';

export const showAlert = (message, showButton) => {
  return new Promise(function (resolve, reject) {
    // call resolve if the method succeeds
    let cancelButton = {
      text: 'Cancel',
      onPress: () => resolve(false),
      style: 'cancel',
    };

    let cofirmButton = {text: 'OK', onPress: () => resolve(true)};
    let alertButton = [];

    if (showButton) {
      alertButton.push(cancelButton);
    }
    alertButton.push(cofirmButton);
    Alert.alert('Information', message, alertButton);
  });
};
