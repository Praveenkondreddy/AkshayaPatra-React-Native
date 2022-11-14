import React, {useEffect} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import {Image} from 'react-native-elements';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Fonts} from '../fonts/Fonts';
import {Colors} from '../themes/Colors';
import {APP_DATA, APP_MESSAGES} from '../commonHelper/appData';
const Splash = ({navigation, state}) => {
  const {STACK_SCREENS} = APP_DATA;
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(STACK_SCREENS.LOGIN.NAME);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.parentContainer}>
      {/* <View style={styles.imageView}> */}
      <Image
        source={require('../../assets/images/splashcomapany_logo.png')}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator />}
      />
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },

  image: {
    width: wp('100%'),
    height: hp('100%'),
  },
});

export default Splash;
