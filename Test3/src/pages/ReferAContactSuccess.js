import React from 'react';
import {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {Text, Icon, Input, Button} from 'react-native-elements';
import HeaderBarIcon from '../compontent/headerBarIcon';
import {Fonts} from '../fonts/Fonts';
const ReferAContactSuccess = ({navigation, route}) => {
  const {message} = route.params;
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
    goToHome ? navigation.navigate('Home') : navigation.toggleDrawer();
  };
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  }, []);
  return (
    <View>
      <View
        style={{
          alignItems: 'center',
          marginHorizontal: 25,
          marginVertical: 150,
        }}>
        <Text
          style={{
            fontSize: 24,
            color: '#0A5688',
            fontFamily: Fonts.regular.fontFamily,
          }}>
          Thank you
        </Text>
        <Icon
          name="checkmark-circle"
          type="ionicon"
          color="#00C22D"
          size={65}
        />
        <Text
          style={{
            fontSize: 16,
            color: '#333333',
            fontFamily: Fonts.regular.fontFamily,
            textAlign: 'center',
          }}>
          {message == 'sent request callback'
            ? 'Your request to callback has been successfully submitted.'
            : 'Your have successfully ' + message + '.'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuIcon: {
    marginHorizontal: 15,
    fontSize: 20,
    color: 'white',
  },
});

export default ReferAContactSuccess;
