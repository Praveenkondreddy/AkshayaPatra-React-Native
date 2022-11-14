import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../themes/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DeviceInfo from 'react-native-device-info';
const iconType = {
  fa: 'font-awesome',
  ion: 'ionicon',
};
const HeaderBarIcon = ({type, iconName, onClick, goToHome}) => {
  const navigation = useNavigation();
  return (
    <>
      <Icon
        name={iconName}
        type={iconType[type]}
        iconStyle={[styles.menuIcon]}
        onPress={() => onClick(goToHome)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  menuIcon: {
    marginHorizontal: wp('5%'),
    fontSize: hp('3%'),
    color: Colors.WHITE,
    height: hp('4%'),
    marginTop: DeviceInfo.isTablet('1%') ? hp('1%') : 0,
  },
});
export default HeaderBarIcon;
