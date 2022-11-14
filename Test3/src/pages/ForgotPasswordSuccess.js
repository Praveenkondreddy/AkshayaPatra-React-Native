import React,{useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {Text,Button,Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors } from '../themes/Colors';
import {Fonts} from '../fonts/Fonts';
const {width, height} = Dimensions.get('window');
const ForgotPasswordSuccess = ({navigation}) => {
  useEffect(() => {
   // navigation.addListener('beforeRemove', (e) => {  e.preventDefault();})
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
      <Text style={styles.otpSuccessText}>Reset Password Success</Text>
        <View  style={styles.thumbsUpView}>
            <Icon name="thumbs-up" type="font-awesome" iconStyle={styles.thumbsIcon}/>
          </View>
     
        <Text style={styles.receiveText}>Confirmation mail is sent to your registered email.</Text>
      </View>

     
     <View style={styles.submitBtnView}>
     <View style={{...styles.horizontalLine,'alignSelf':'center'}}></View>
     <TouchableOpacity style={styles.touchableOpatcity}>
            <Button
              buttonStyle={styles.submitbtn}
              titleStyle={styles.submitTitleStyle}
              title="LOGIN"
              onPress={() => navigation.navigate('Login')}              
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
    height: hp('12%'),
    alignItems: 'center',
  }, 
  iconView: {
    alignItems: 'flex-end',
    position: 'relative',
    marginTop: hp('-10%'),
    marginRight: wp('5%'),
  },
  icon: {
    color: Colors.WHITE,
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
    width: hp('35%') * 0.5,
    height: hp('35%') * 0.5,
    backgroundColor: Colors.LIGHTGREEN1,
    alignItems: 'center',
    opacity: 0.8,
  },
  CircleShapeInnerView: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    width: hp('20%') * 0.5,
    height: hp('20%') * 0.5,
    backgroundColor:Colors.WHITE,
    marginTop: hp('4%'),
  },
  iconUser: {
    color: Colors.BLACK,
    fontSize: hp('3%'),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp('3.5%'),
  },
  newRegText: {
    color: Colors.LIGHTBLACK,
    marginTop: hp('2%'),
    fontSize: hp('3%'),
    fontFamily: Fonts.regular.fontFamily,
    height: hp('2%'),
    textAlign: 'center',
  },
  horizontalLine: {
    backgroundColor: Colors.LIGHTGRAY2,
    height: hp('0.5%'),
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
  
  submitBtnView:{
    marginVertical: hp('2%'),
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
  },
  touchableOpatcity: {
    width: '100%',
    marginTop: 10,
  },
  submitbtn: {
    borderColor: Colors.LIGHTGREEN1,
    backgroundColor: Colors.LIGHTGREEN1,
    borderWidth: wp('1%'),
    width: wp('80%'),
    borderRadius: 25,
    color: Colors.LIGHTBLACK,
    fontFamily: Fonts.regular.fontFamily,
    alignSelf:'center',
    fontSize: hp('1.8%'),
  },
  submitTitleStyle: {
    color:Colors.WHITE,
    fontFamily: Fonts.regular.fontFamily,
  },
});

export default ForgotPasswordSuccess;
