import React, {useEffect,useState} from 'react';

import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {Text, Icon} from 'react-native-elements';
import Accordion from '../compontent/Accordian';
import HeaderBarIcon from '../compontent/headerBarIcon';
import {useDispatch, useSelector} from 'react-redux';
import {getPoliciesData, getMemberBenefits} from '../store/policiesReducer';
import {Fonts} from '../fonts/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {addressConcat} from '../commonHelper/functionHelper';
import {Colors} from '../themes/Colors';
import FooterBar from '../compontent/footerBar';
import DeviceInfo from 'react-native-device-info';
const MyBenefits = ({navigation, route}) => {
  const dispatch = useDispatch();

  const {memberBenefits, loader, routesParams} = useSelector(getPoliciesData);
  const {member, policy} = routesParams;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBarIcon
          type="ion"
          iconName="arrow-back"
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
    goToHome ? navigation.goBack() : navigation.toggleDrawer();
  };

  useEffect(() => {
   // policy.sgsId = 637653;
   // member.meMemberId = 234234;
    dispatch(
      getMemberBenefits({policyId: policy.sgsId, memberId: member.meMemberId}),
    );
  }, []);

  const renderAccordian = ({item}) => {
  
    return <Accordion benefits={item} loader={loader} />;
  };
  let address = addressConcat(member);
  return (
    <View style={styles.container}>
      <View style={[styles.parentView, {height: 'auto'}]}>
        <View style={styles.titleView}>
          <View style={styles.viewConatiner3}>
            <Text style={styles.textName}>
              {member.memberName}{' '}
              <Text style={styles.textPersonDetail}>
                {' '}
                {/* {member.gender}, {member.age} */}
              </Text>
            </Text>
            <Text style={styles.textPersonDetail}>
              {member.phone} | {member.email}
            </Text>
            <Text style={styles.textPersonDetail}>{address}</Text>
          </View>
        </View>
        <Text h4 h4Style={styles.title}>
          BENEFITS
        
        </Text>
        {/* {memberBenefits.length>0 &&
        <Text style={styles.currenctText}>{`* Showing Premimum in ${memberBenefits[0].currencyId} Limit`}</Text> 
        } */}
        <View style={styles.container}>
          <FlatList
            data={memberBenefits}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderAccordian}
            style={{height: '80%'}}
          />
        </View>
      </View>
      <FooterBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    marginTop:DeviceInfo.isTablet()?hp('4%'):hp('4%')
  },
  parentView: {
    flex: 1,
  },
  menuIcon: {
    marginHorizontal: wp('4%'),
    fontSize: hp('3%'),
    color: Colors.WHITE,
  },
  titleView: {
    backgroundColor: Colors.BLUE1,
    marginTop: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('12%'),
  },
  viewConatiner3: {
    flexDirection: 'column',
    width: wp('100%'),
    alignItems: 'center',
  },
  textName: {
    color: Colors.WHITE,
    fontSize: hp('2.2%'),
    fontFamily: Fonts.regular.fontFamily,
  },
  textPersonDetail: {
    color: Colors.WHITE,
    fontSize: hp('2%'),
    fontFamily: Fonts.light.fontFamily,
  },
  title: {
    fontSize: hp('2%'),
    marginLeft: wp('5%'),
    color: Colors.BLUE1,
    fontFamily: Fonts.ui.fontFamily,
    textTransform: 'uppercase',
    marginTop: hp('2%'),
    fontWeight: 'bold',
  },
  currenctText:{
    fontSize: hp('1.5%'),
    marginLeft: wp('5%'),
    color: Colors.BLUE1,
    fontFamily: Fonts.regular.fontFamily,
    textTransform: 'none',
    marginTop: hp('1%'),
    fontWeight: 'bold',
  }
});

export default MyBenefits;
