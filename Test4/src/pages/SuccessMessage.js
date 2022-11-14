import React from 'react';
import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import {Text, Button, Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Fonts} from '../fonts/Fonts';
const {width, height} = Dimensions.get('window');
const SuccessMessage = ({navigation, route}) => {
  console.log('Rouet ');
  console.log('Rouet ', route.params);
  const {from} = route.params;
  return (
    <View style={styles.parentContainer}>
      {from === 'OTP' && (
        <View style={styles.parentContainer}>         
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#FF5000', '#FDAE03']}
            style={styles.linearGradient}></LinearGradient>
          <View style={styles.iconUserView}>
            <View style={styles.CircleShapeView}>
              <View style={styles.CircleShapeInnerView}>
                <Icon
                  name="person"
                  type="ionicon"
                  iconStyle={styles.iconUser}
                />
              </View>
            </View>
          </View>
          <View style={styles.otpTextView}>
            <Text style={styles.newRegText}>DENISE FRANK</Text>

            <View style={styles.horizontalLine}></View>
            <View style={styles.thumbsUpView}>
              <Icon
                name="thumbs-up"
                type="font-awesome"
                iconStyle={styles.thumbsIcon}
              />
            </View>
            <Text style={styles.otpSuccessText}>Registration Success</Text>
            <Text style={styles.receiveText}>
              Confirmation mail is sent to your registered email.
            </Text>
          </View>
          <View style={styles.submitBtnView}>
            <View
              style={{...styles.horizontalLine, alignSelf: 'center'}}></View>
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
      )}
      {from==='REF' && (<View style={{alignItems: 'center',marginHorizontal:25,marginVertical:150}}>
        <Text
          style={{
            fontSize: 24,
            color: '#0A5688',
            fontFamily: Fonts.regular.fontFamily,
          }}>
          Thank you
        </Text>
        <Icon name="checkmark-circle" type="ionicon" color="#00C22D" size={65}/>
        <Text
          style={{
            fontSize: 16,
            color: '#333333',
            fontFamily: Fonts.regular.fontFamily,
            textAlign:'center'
          }}>
          Your have successfully referred a contact.
        </Text>
      </View>)}
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: 'white',
    height,
  },
  container: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'white',
  },
  linearGradient: {
    height: 65,
    alignItems: 'center',
  },
  iconView: {
    alignItems: 'flex-end',
    position: 'relative',
    marginTop: -50,
    marginRight: 20,
  },
  icon: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  iconUserView: {
    alignItems: 'center',
    marginTop: -50,
  },
  CircleShapeView: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: '#01B875',
    alignItems: 'center',
    opacity: 0.8,
  },
  CircleShapeInnerView: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: 'white',
    marginTop: 20,
  },
  iconUser: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  newRegText: {
    color: '#333333',
    marginTop: 10,
    fontSize: 18,
    fontFamily: Fonts.regular.fontFamily,
    height: 28,
    textAlign: 'center',
  },
  horizontalLine: {
    backgroundColor: '#bfcdd2',
    height: 2,
    width: 20,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpTextView: {
    alignItems: 'center',
  },
  otpSuccessText: {
    color: '#1D7CA7',
    textAlign: 'center',
    height: 40,
    marginHorizontal: 61,
    marginTop: 30,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: 14,
  },
  receiveText: {
    color: '#333333',
    textAlign: 'center',
    marginHorizontal: 61,
    marginTop: 10,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: 14,
  },

  submitBtnView: {
    marginVertical: 50,
  },

  thumbsUpView: {
    backgroundColor: '#263357',
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    alignItems: 'center',
    marginTop: 30,
  },
  thumbsIcon: {
    marginVertical: 14,
    color: 'white',
    fontSize: 50,
  },
  touchableOpatcity: {
    width: '100%',
    marginTop: 10,
  },
  submitbtn: {
    borderColor: '#01B875',
    backgroundColor: '#01B875',
    borderWidth: 2,
    width: '80%',
    borderRadius: 25,
    color: '#333333',
    fontFamily: Fonts.regular.fontFamily,
    alignSelf: 'center',
    fontSize: 9,
  },
  submitTitleStyle: {
    color: 'white',
    fontFamily: Fonts.regular.fontFamily,
  },
  menuIcon: {
    marginHorizontal: 15,
    fontSize: 20,
    color: 'white',
  },
});

export default SuccessMessage;
