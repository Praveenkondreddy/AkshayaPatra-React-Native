import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../themes/Colors';
const HeaderBar = ({headerHight}) => {
  return (
    <ScrollView>
      <View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[Colors.GRADIENT, Colors.GRADIENT1]}
          style={
            ([StyleSheet.absoluteFill, styles.linearGradient],
            {height: headerHight})
          }></LinearGradient>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    backgroundColor: 'transparent',
  },
});
export default HeaderBar;
