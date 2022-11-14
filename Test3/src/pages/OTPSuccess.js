import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {Fonts} from '../fonts/Fonts';
import {Text,Button,Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {APP_MESSAGES,APP_DATA} from '../commonHelper/appData';
import { getSignupData } from '../store/signupReducer';
import { Colors } from '../themes/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');
const OTPSuccess = ({navigation}) => {
  const {STACK_SCREENS}=APP_DATA;
  const {memberProfile} = useSelector(getSignupData);
  
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
        <Text style={styles.newRegText}>{memberProfile.memberName}</Text>

        <View style={styles.horizontalLine}></View>
        <View  style={styles.thumbsUpView}>
            <Icon name="thumbs-up" type="font-awesome" iconStyle={styles.thumbsIcon}/>
          </View>
        <Text style={styles.otpSuccessText}>Registration Success</Text>
        <Text style={styles.receiveText}>Confirmation mail is sent to your registered email.</Text>
      </View>

     
     <View style={styles.submitBtnView}>
     <View style={{...styles.horizontalLine,'alignSelf':'center'}}></View>
     <TouchableOpacity style={styles.touchableOpatcity}>
            <Button
              buttonStyle={styles.submitbtn}
              titleStyle={styles.submitTitleStyle}
              title="LOGIN"
              onPress={() => navigation.navigate(STACK_SCREENS.LOGIN.NAME)}              
            />
          </TouchableOpacity>
    
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: Colors.WHITE,
    height
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
  imageView: {
    marginHorizontal: wp('12%'),
    marginVertical: hp('12%'),
  },
  image: {
    width: wp('12%'),
    height: hp('12%'),
  },
  iconView: {
    alignItems: 'flex-end',
    position: 'relative',
    marginTop: hp('-4%'),
    marginRight: wp('6%'),
  },
  icon: {
    color:Colors.WHITE,
    fontSize: hp('4%'),
    fontWeight: 'bold',
  },
  iconUserView: {
    alignItems: 'center',
    marginTop: hp('-8%'),
  },
  CircleShapeView: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    width: hp('32%') * 0.5,
    height: hp('32%') * 0.5,
    backgroundColor: Colors.LIGHTGREEN1,
    alignItems: 'center',
    opacity: 0.8,
  },
  CircleShapeInnerView: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    width: hp('18%') * 0.5,
    height: hp('18%') * 0.5,
    backgroundColor: Colors.WHITE,
    marginTop: hp('3.5%'),
  },
  iconUser: {
    color: Colors.BLACK,
    fontSize: hp('3%'),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp('3%'),
  },
  newRegText: {
    color: Colors.LIGHTBLACK,
    marginTop: hp('3%'),
    fontSize: hp('3%'),
    fontFamily: Fonts.regular.fontFamily,
    height: hp('5%'),
    textAlign: 'center',
  },
  horizontalLine: {
    backgroundColor: Colors.LIGHTGRAY2,
    height: hp('0.3%'),
    width: wp('5%'),
    marginTop: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpTextView: {
    alignItems: 'center',
  },
  otpSuccessText: {
    color: Colors.BLUE2,
    textAlign: 'center',
    height: hp('5%'),
    marginHorizontal: wp('18%'),
    marginTop:hp('5%'),
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2.2%'),
  },   
  receiveText: {
    color: Colors.LIGHTBLACK,
    textAlign: 'center',
    marginHorizontal: wp('18%'),
    marginTop: hp('2%'),
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2.2%'),
  },
  
  submitBtnView:{
      marginVertical:hp('3%')
  },

  thumbsUpView:{
    backgroundColor:Colors.DARKBLUE,
    borderRadius:
    Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ) / 2,
  width: hp('25%') * 0.5,
  height: hp('25%') * 0.5,
    alignItems: 'center',
    marginTop:hp('3%'),
   
  },
  thumbsIcon:{
      marginVertical:hp('2%'),
      color:Colors.WHITE,
      fontSize:50
  },
  touchableOpatcity: {
    width: wp('100%'),
    marginTop: hp('2%'),
  },
  submitbtn: {
    borderColor: Colors.LIGHTGREEN2,
    backgroundColor:  Colors.LIGHTGREEN3,
    borderWidth: wp('0.5%'),
    width: wp('80%'),
    borderRadius: 25,
    color: Colors.LIGHTBLACK,
    fontFamily: Fonts.regular.fontFamily,
    alignSelf:'center',
    fontSize: hp('1.8%'),
  },
  submitTitleStyle: {
    color: Colors.WHITE,
    fontFamily: Fonts.regular.fontFamily,
  },
});

export default OTPSuccess;
