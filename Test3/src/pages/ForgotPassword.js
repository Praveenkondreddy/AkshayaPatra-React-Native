import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  BackHandler,
} from 'react-native';
import {Fonts} from '../fonts/Fonts';
import {Button, Text, Input, Image, Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import ReactiveIcon from '../compontent/ReactiveIcon';
import {useDispatch, useSelector} from 'react-redux';
import {apiForgotPassword} from '../api/apiHelper';
import PageLoader from '../compontent/PageLoader';
import {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { showAlert } from '../commonHelper/alertHelper';
import { Colors } from '../themes/Colors';
const {width, height} = Dimensions.get('window');
const ForgotPassword = ({navigation}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  useEffect(() => {
   /*  navigation.addListener('beforeRemove', (e) => {
      console.log("Ads")
      e.preventDefault();
    }); */
  }, [navigation]);
  const action = () => {
    navigation.goBack();
  };
  const submit = async () => {
    let checkValues = true;
    if (!userName && !email) {
      checkValues = false;
    }

    if (checkValues) {
      setLoader(true);
      try {
        let requestObj = {userName, email};

        const response = await apiForgotPassword(requestObj);

        const {status, error} = response.data;
         if (status === 400) {
        
          showAlert(response.data.message,false);
        } else {
          navigation.navigate('ForgotPasswordSuccess');
        }
      } catch (error) {
        showAlert(JSON.stringify(error.message),false);
       
      } finally {
        setLoader(false);
       
      }
    } else {
      showAlert('Please enter all field',false);
     
    }
  };
  return (
    <ScrollView>
      <PageLoader isLoading={loader} />
      <View style={[styles.parentContainer]}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[Colors.GRADIENT, Colors.GRADIENT1]}
          style={[styles.linearGradient]}></LinearGradient>
        <View style={styles.iconView}>
          <ReactiveIcon
            type="fa"
            iconName="times-circle"
            onClick={action}
            styles={styles.icon}
          />
        </View>
        <View style={styles.iconUserView}>
          <View style={styles.CircleShapeView}>
            <View style={styles.CircleShapeInnerView}>
              <Icon name="person" type="ionicon" iconStyle={styles.iconUser} />
            </View>
          </View>
        </View>
        <View style={styles.otpTextView}>
          <Text style={styles.newRegText}>Forgot Password</Text>
          <View style={styles.horizontalLine}></View>
        </View>
        <View style={styles.viewContainer1}>
          <View style={styles.inputView}>
            <Input
              placeholder="User Name"
              leftIcon={
                <Icon
                  name="person"
                  type="ionicon"
                  iconStyle={styles.inputLeftIcon}
                />
              }
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              placeholderTextColor={Colors.LIGHTGRAY3}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              onChangeText={(newText) => setUserName(newText)}
              value={userName}
            />
          </View>

          <View style={styles.inputView}>
            <Input
              placeholder="Regsistered Mail Id"
              leftIcon={
                <Icon
                  name="mail"
                  type="ionicon"
                  iconStyle={styles.inputLeftIcon}
                />
              }
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              placeholderTextColor={Colors.LIGHTGRAY3}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              onChangeText={(newText) => setEmail(newText)}
              value={email}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.touchableOpatcity}>
          <Button
            buttonStyle={styles.submitbtn}
            titleStyle={styles.submitTitleStyle}
            title="SUBMIT"
            onPress={() => submit()}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex:1,
    backgroundColor: Colors.WHITE,
    height,
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
    marginTop: hp('-8%'),
    marginRight: wp('6%'),
  },
  icon: {
    color: Colors.WHITE,
    fontSize: hp('4%'),
    fontWeight: 'bold',
  },
  iconUserView: {
    alignItems: 'center',
    marginTop: hp('-4%'),
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
    marginTop: hp('3%'),
    fontSize: hp('3%'),
    fontFamily: Fonts.regular.fontFamily,
    height: hp('5%'),
    textAlign: 'center',
  },
  touchableOpatcity: {
    width: wp('100%'),
    marginTop: hp('3%'),
  },
  submitbtn: {
    borderColor: Colors.LIGHTGREEN1,
    backgroundColor: Colors.LIGHTGREEN1,
    borderWidth: 2,
    width: wp('80%'),
    borderRadius: 25,
    color: Colors.LIGHTBLACK,
    fontFamily: Fonts.regular.fontFamily,
    alignSelf: 'center',
  },
  submitTitleStyle: {
    color: Colors.WHITE,
    fontFamily: Fonts.regular.fontFamily,
    fontSize:hp('2%')
  },
  otpTextView: {
    alignItems: 'center',
  },
  horizontalLine: {
    backgroundColor: Colors.LIGHTGRAY2,
    height: hp('0.5%'),
    width: wp('5%'),
    marginTop: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewContainer1: {
    marginTop: hp('4%'),
    backgroundColor:Colors.WHITE,
    height: hp('20%'),
    width: wp('100%'),
    marginHorizontal: wp('10%'),
  },
  inputView: {
    width: wp('100%'),
    backgroundColor: Colors.WHITE,
    height: hp('10%'),
    marginTop: hp('1%'),
  },
  inputLeftIcon: {
    fontSize: hp('3%'),
    color: Colors.LIGHTGRAY3,
    marginLeft: hp('2%'),
  },
  inputStyle: {
    fontSize: hp('2%'),
    borderColor:Colors.LIGHTGRAY3,
    padding: hp('1%'),
    fontFamily: Fonts.regular.fontFamily,
  },
  inputContainerStyle: {
    borderColor: Colors.LIGHTGRAY3,
    borderWidth: hp('0.2%'),
    borderRadius: hp('10%'),
    height: hp('7%'),
    width: wp('75%'),
  },
});

export default ForgotPassword;
