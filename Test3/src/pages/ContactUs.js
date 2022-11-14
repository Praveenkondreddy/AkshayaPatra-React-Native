import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native';
import {Text, Image, Icon} from 'react-native-elements';
import HeaderBarIcon from '../compontent/headerBarIcon';
import customData from '../common/customData.json';
import {SvgXml} from 'react-native-svg';
import map from '../../assets/icons/map.svg';
import phone from '../../assets/icons/phone.svg';
import support from '../../assets/icons/support.svg';
import DashLine from '../compontent/dashLine';
import {Fonts} from '../fonts/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../themes/Colors';
import DeviceInfo from 'react-native-device-info';
const ContactUs = ({navigation}) => {
  const phoneNumber = '2038452';
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBarIcon
          type="ion"
          iconName="home"
          onClick={action}
          goToHome={true}
        />
      ),
      headerRight: () => (
        <HeaderBarIcon
          type="fa"
          iconName="bars"
          onClick={action}
          goToHome={false}
        />
      ),
      headerTitle: () => null,
      headerStyle: {},
    });
  }, [navigation]);
  const action = (goToHome) => {
    goToHome ? navigation.goBack() : navigation.toggleDrawer();
  };
  const openPhoneDialer = () => {
    let phoneNo = '';
    if (Platform.OS !== 'android') {
      phoneNo = `telprompt:${phoneNumber}`;
    } else {
      phoneNo = `tel:${phoneNumber}`;
    }
    Linking.canOpenURL(phoneNo)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNo);
        }
      })
      .catch((err) => console.log(err));
  };

  const openMap = () => {
    // const lat =12.974357502167596 ; const lng= 80.24405200000777;  // Beyontec map
    const lat = customData.mapLat;
    const lng = customData.mapLng;
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${lat},${lng}`;
    const label = 'Sicom';
    const label1 = process.env.NODE_ENV;
    console.log('label1 :  ' + label1);
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };
  return (
    <View style={[styles.parentViewContainer]}>
      <View style={{flex: 1}}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>CONTACT US</Text>
        </View>
        <View style={{marginHorizontal: wp('0%'), marginVertical: hp('0%')}}>
          <View style={styles.titleView}>
            <View style={{marginTop: wp('0%')}}>
              <Image
                source={require('../../assets/images/contactus.png')}
                style={styles.imgContactus}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
          </View>
          <View style={styles.viewConatiner}>
            <SvgXml
              width={wp('10%')}
              height={hp('6%')}
              xml={phone}
              fill={Colors.BLACK}
              style={styles.svgSubmitIcon}
            />

            <View style={styles.viewConatiner1}>
              <Text style={styles.text}>
                CALL US NOW
                <Icon
                  name="chevron-forward-sharp"
                  type="ionicon"
                  size={hp('2%')}
                  color={Colors.ORANGE1}
                  style={styles.svgSubmitIcon}
                />
              </Text>
              <Text
                style={[
                  styles.text,
                  {textDecorationLine: 'underline', color: 'blue'},
                ]}
                onPress={openPhoneDialer}>
                {phoneNumber}
              </Text>
            </View>
          </View>
          <DashLine />
          <View style={styles.viewConatiner}>
            <SvgXml
              width={wp('10%')}
              height={hp('6%')}
              xml={support}
              fill={Colors.LIGHTBLACK}
              style={styles.svgSubmitIcon}
            />

            <View style={styles.viewConatiner1}>
              <Text
                style={styles.text}
                onPress={() => navigation.navigate('RequestCallBack')}>
                REQUEST A CALLBACK
                <Icon
                  name="chevron-forward-sharp"
                  type="ionicon"
                  size={hp('2%')}
                  color={Colors.ORANGE1}
                  style={{marginTop: hp('2%')}}
                />
              </Text>
            </View>
          </View>
          <DashLine />
          <View style={styles.viewConatiner}>
            <SvgXml
              width={wp('10%')}
              height={hp('6%')}
              xml={map}
              fill={Colors.LIGHTBLACK}
              style={styles.svgSubmitIcon}
            />
            <View style={styles.viewConatiner1}>
              <Text style={styles.text} onPress={openMap}>
                LOCATE US
                <Icon
                  name="chevron-forward-sharp"
                  type="ionicon"
                  size={hp('2%')}
                  color={Colors.ORANGE1}
                  style={{marginTop: hp('2%')}}
                />
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuIcon: {
    marginHorizontal: wp('5%'),
    fontSize: hp('2.5%'),
    color: Colors.WHITE,
  },
  parentViewContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    marginTop: DeviceInfo.isTablet() ? hp('4%') : hp('1.5%'),
  },

  titleView: {
    backgroundColor: Colors.BLUE1,
    marginTop: hp('0%'),
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: Colors.WHITE,
    fontFamily: Fonts.regular.fontFamily,
    marginLeft: wp('4%'),
    fontSize: hp('2.5%'),
  },
  imgContactus: {
    width: wp('30%'),
    height: hp('12%'),
    marginBottom: hp('1%'),
  },
  viewConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: hp('5%'),
    marginLeft: wp('20%'),
  },
  viewConatiner1: {
    flexDirection: 'column',
    marginLeft: wp('4%'),
  },
  text: {
    fontSize: hp('2.5%'),
    color: Colors.LIGHTBLACK,
    fontFamily: Fonts.regular.fontFamily,
  },
  listContent: {
    margin: hp('-2%'),
  },
  svgSubmitIcon: {
    marginTop: hp('1%'),
  },
});

export default ContactUs;
