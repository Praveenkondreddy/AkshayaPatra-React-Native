import React from 'react';
import {View, StyleSheet} from 'react-native';
import Dash from 'react-native-dash';
import {Colors} from '../themes/Colors';

const DashLine = () => {
  return (
    <>
      <Dash
        style={styles.dashLine}
        dashColor={Colors.DASH}
        dashLength={3}
        dashGap={3}
        dashThickness={1}
      />
    </>
  );
};

const styles = StyleSheet.create({
  dashLine: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 5,
    borderRadius: 100,
  },
});

export default DashLine;
