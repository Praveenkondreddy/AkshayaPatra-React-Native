import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import DashLine from './dashLine';
import { useDispatch, useSelector } from 'react-redux';
import { getPoliciesData } from '../store/policiesReducer';
import { Colors } from '../themes/Colors';
import {Fonts} from '../fonts/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const ClaimsDetailsTab = () => {
  const navigation = useNavigation();
  const { claimsDetails, routesParams } = useSelector(getPoliciesData);
  const { policy } = routesParams;
  console.log("claimsDetails" + JSON.stringify(claimsDetails));
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <View style={styles.viewContent1}>
          <View style={styles.viewContent2}>
            <Text style={styles.title}>Claim Ref#</Text>
            <Text style={styles.data}>{claimsDetails.clfRefNo}</Text>
          </View>
          <View style={styles.viewContent3}>
            <Text style={styles.title}>Member ID</Text>
            <Text style={styles.data}>{claimsDetails.memberId}</Text>
          </View>
        </View>
        <DashLine /> */}
        <View style={styles.viewContent4}>

        <View style={styles.viewContent5}>
            <Text style={styles.title1}>Claim Ref#</Text>
            <Text style={styles.data1}>{claimsDetails.clfRefNo}</Text>
          </View>
          <View style={styles.viewContent5}>
            <Text style={styles.title1}>Member ID</Text>
            <Text style={styles.data1}>{claimsDetails.memberId}</Text>
          </View>

          <View style={[styles.viewContent5]}>
            <Text style={styles.title1}>Disability date</Text>
            {/* <Text style={styles.data1}>{claimsDetails.polFmd} - {claimsDetails.polTod}</Text> */}
            <Text style={styles.data1}>{claimsDetails.requestDate}</Text>
          </View>
          <View style={[styles.viewContent5, styles.marginTop]}>
            <Text style={styles.title1}>Provider</Text>
            <Text style={styles.data1}>{claimsDetails.providerId == null ? "" : claimsDetails.providerId}</Text>
          </View>
          <View style={[styles.viewContent5, styles.marginTop]}>
            <Text style={styles.title1}>Claim Amount</Text>
            <Text style={styles.data1}>{claimsDetails.requestAmount}</Text>
          </View>
          <View style={[styles.viewContent5, styles.marginTop]}>
            {/* <Text style={styles.title1}>Approved Amount</Text> */}
            <Text style={styles.title1}>Paid Amount</Text>
            <Text style={styles.data1}>{claimsDetails.approveAmount}</Text>
          </View>
          <View style={[styles.viewContent5, styles.marginTop]}>
            <Text style={styles.title1}>Status</Text>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: -5,
              }}>
              <Icon
                name="dot-single"
                type="entypo"
                iconStyle={{ fontSize: 20, color: 'green' }}
              />
              <Text style={styles.data1}>{claimsDetails.statusName}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height: 'auto',
  },
  title: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: wp('4%'),
    color: Colors.LIGHTGRAY1,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
  },
  data: {
    color: Colors.BLACK,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
    marginLeft: wp('4%'),
  },
  viewContent3: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: wp('15%'),
  },
  horizontalLine: {
    backgroundColor: Colors.LIGHTGRAY2,
    height: hp('0.5%'),
    width: 'auto',
    marginTop: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    margin: 0,
  },
  viewContent1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('3%'),
  },
  viewContent2: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 0,
  },
  viewContent4: {
    flexDirection: 'column',
    marginTop: hp('2%'),
    marginLeft: wp('4%'),
  },
  viewContent5: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  marginTop: {
    marginTop: hp('1%'),
  },
  title1: {
    color: Colors.LIGHTGRAY1,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
  },
  data1: {
    color: Colors.BLACK,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
  },
  dashLine: {
    width: wp('100%'),
    flexDirection: 'row',
    marginTop: hp('1%'),
    borderRadius: 100,
  },
});
export default ClaimsDetailsTab;
