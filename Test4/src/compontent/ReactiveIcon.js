import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
const iconType={
  fa:'font-awesome',
  ion:'ionicon'
}
const ReactiveIcon = ({type,iconName,onClick,styles}) => {
const navigation=useNavigation();
  return (
    <>
    <Icon
    name={iconName}
    type={iconType[type]}
    iconStyle={styles.menuIcon}
    onPress={onClick}
    iconStyle={styles}
  />
  </>
  );
};

export default ReactiveIcon;