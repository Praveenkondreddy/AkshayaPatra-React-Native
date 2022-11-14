import React, {useLayoutEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Button, Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import HeaderBarIcon from '../compontent/headerBarIcon';
import {Fonts} from '../fonts/Fonts';
const NewClaimsSuccess = ({navigation}) => {
  useLayoutEffect(() => {
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
    goToHome ? navigation.navigate('Home') : navigation.toggleDrawer();
  };
  return (
    <View style={styles.parentContainer}>
      <View style={styles.viewContainer}>
        <Text style={styles.textView1}>Thank you</Text>
        <Text style={styles.textView2}>for submitting your claim</Text>
        <View style={styles.viewContainer1}>
          <Icon name="checkmark" type="ionicon" iconStyle={styles.icon} />
        </View>

        <Text style={styles.textView3}>
          Your claim reference no is C123D4567.
        </Text>

        <Text style={styles.textView4}>
          Please retain original documents for a period of 6 months Please use
          this reference number for further proceedings. The claim details is
          sent to your registered email
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: 'white',
    height: '100%',
  },
  container: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'white',
  },

  viewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  textView1: {
    color: '#0A5688',
    textAlign: 'center',
    marginHorizontal: 61,
    marginTop: 10,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: 22,
  },
  textView2: {
    color: '#0A5688',
    textAlign: 'center',
    marginTop: 1,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: 16,
  },
  textView3: {
    color: '#333333',
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: 14,
  },
  textView5: {
    color: '#333333',
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: 14,
  },
  textView4: {
    color: '#333333',
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: 12,
  },

  viewContainer1: {
    backgroundColor: '#00C22D',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: 'center',
    marginTop: 30,
  },
  icon: {
    marginVertical: 14,
    color: 'white',
    fontSize: 30,
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
    borderRadius: 5,
    color: '#333333',
    fontFamily: Fonts.regular.fontFamily,
    alignSelf: 'center',
    fontSize: 9,
  },
  submitTitleStyle: {
    color: 'white',
    fontFamily: Fonts.regular.fontFamily,
  },
});

export default NewClaimsSuccess;
