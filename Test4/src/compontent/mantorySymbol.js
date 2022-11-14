import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import { Colors } from '../themes/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const MantorySymbol = () => {
  const navigation = useNavigation();
  return <Text style={styles.text}>*</Text>;
};
const styles = StyleSheet.create({
  text: {color: Colors.RED, fontSize: hp('2.2%')},
});
export default MantorySymbol;
