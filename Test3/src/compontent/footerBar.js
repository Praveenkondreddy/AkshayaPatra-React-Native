import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../themes/Colors';
import insurance from '../../assets/icons/insurance.svg';
import phone from '../../assets/icons/phone.svg';
import team from '../../assets/icons/team.svg';
import {APP_DATA} from '../commonHelper/appData';
import DeviceInfo from 'react-native-device-info';
import {Fonts} from '../fonts/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
const FooterBar = ({headerHight}) => {
  const {STACK_SCREENS, APP_ICON} = APP_DATA;
  const navigation = useNavigation();
  const navigateTo = (page) => {
    navigation.navigate(page);
  };
  return (
    <View style={styles.footerContainer}>
      <View style={styles.viewConatiner1}>
        <TouchableOpacity
          style={styles.submitView}
          onPress={() => navigateTo(STACK_SCREENS.NEWCLAIM.NAME)}>
          <SvgXml
            width={wp('5%')}
            height={hp('5%')}
            xml={insurance}
            fill={Colors.BLACK1}
            style={styles.svgSubmitIcon}
          />

          <Text style={styles.submitText}>New Claim</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewConatiner1}>
        <TouchableOpacity
          style={styles.submitView}
          onPress={() => navigateTo(STACK_SCREENS.REFACONTACT.NAME)}>
          <SvgXml
            width={wp('5%')}
            height={hp('5%')}
            xml={team}
            fill={Colors.BLACK1}
            style={styles.svgSubmitIcon}
          />

          <Text style={styles.submitText}>Refer a Contact</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewConatiner2}>
        <TouchableOpacity
          style={styles.submitView}
          onPress={() => navigateTo(STACK_SCREENS.CONTACTUS.NAME)}>
          <SvgXml
            width={wp('5%')}
            height={hp('5%')}
            xml={phone}
            fill={Colors.BLACK1}
            style={styles.svgSubmitIcon}
          />

          <Text style={styles.submitText}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  footerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: DeviceInfo.isTablet() ? hp('13%') : hp('15%'),
    backgroundColor: Colors.BLUE2,
  },
  viewConatiner1: {
    flex: 1,
    marginHorizontal: wp('2.5%'),
    width: wp('30%'),
  },
  viewConatiner2: {
    marginHorizontal: wp('2%'),
    width: wp('30%'),
  },
  submitView: {
    marginVertical: hp('0%'),
    alignItems: 'center',
    height: hp('12%'),
    marginTop: hp('1%'),
    width: wp('30%'),
  },
  svgSubmitIcon: {
    marginTop: hp('0.5%'),
  },

  submitText: {
    // marginTop: hp('0.5%'),
    color: Colors.BLACK1,
    fontSize: hp('2%'),
    fontFamily: Fonts.regular.fontFamily,
  },
});
export default FooterBar;
