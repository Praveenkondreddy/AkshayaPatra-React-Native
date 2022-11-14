import React,{useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {Fonts} from '../fonts/Fonts';
import {Text,Button,Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../themes/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');
const ChangePasswordSuccess = ({navigation}) => {
  useEffect(() => {
    //navigation.addListener('beforeRemove', (e) => {  e.preventDefault();})
    setTimeout(() => {
      
      navigation.navigate('Login');

    }, 3000);
}, []) ;
  return (
    <View style={styles.parentContainer}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[Colors.GRADIENT, Colors.GRADIENT1]}
        style={styles.linearGradient}></LinearGradient>
  
      <View style={styles.iconUserView}>
        <View style={styles.CircleShapeView}>
          <View style={styles.CircleShapeInnerView}>
            <Icon name="person" type="ionicon" iconStyle={styles.iconUser} />
          </View>
        </View>
      </View>
      <View style={styles.otpTextView}>      
      <Text style={styles.otpSuccessText}>Change Password Success</Text>
        <View  style={styles.thumbsUpView}>
            <Icon name="thumbs-up" type="font-awesome" iconStyle={styles.thumbsIcon}/>
          </View>
     
        <Text style={styles.receiveText}>Your Password Change Request has been updated successfully.</Text>
      </View>    
    
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: Colors.WHITE,
    height,
  },
  container: {
    alignItems: 'center',
    marginTop: hp('4%'),
    backgroundColor: Colors.WHITE,
  },
  linearGradient: {
    height: hp('10%'),
    alignItems: 'center',
  },
  iconView: {
    alignItems: 'flex-end',
    position: 'relative',
    marginTop: hp('-10%'),
    marginRight: wp('5%'),
  },
  icon: {
    color: 'white',
    fontSize: hp('4%'),
    fontWeight: 'bold',
  },
  iconUserView: {
    alignItems: 'center',
    marginTop: hp('-7%'),
  },
  CircleShapeView: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    width: hp('35%') * 0.5,
    height: hp('35%') * 0.5,
    backgroundColor: '#01B875',
    alignItems: 'center',
    opacity: 0.8,
  },
  CircleShapeInnerView: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    width: hp('22%') * 0.5,
    height: hp('22%') * 0.5,
    backgroundColor: 'white',
    marginTop: hp('3.5%'),
  },
  iconUser: {
    color: 'black',
    fontSize: hp('3%'),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp('3.5%'),
  },  
  otpTextView: {
    alignItems: 'center',
  },
  otpSuccessText: {
    color: Colors.BLUE2,
    textAlign: 'center',
    height: hp('10%'),
    marginHorizontal: wp('15%'),
    marginTop: hp('10%'),
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
  },
  receiveText: {
    color: Colors.LIGHTBLACK,
    textAlign: 'center',
    marginHorizontal:  wp('15%'),
    marginTop:  hp('10%'),
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
  },

  submitBtnView: {
    marginVertical: hp('10%'),
  },

  thumbsUpView: {
    backgroundColor: Colors.DARKBLUE,
    borderRadius:
    Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ) / 2,
  width: hp('30%') * 0.5,
  height: hp('30%') * 0.5,
    alignItems: 'center',
    marginTop: hp('5%'),
  },
  thumbsIcon: {
    marginVertical: hp('2%'),
    color: Colors.WHITE,
    fontSize:  hp('10%'),
  }
  
});

export default ChangePasswordSuccess;
