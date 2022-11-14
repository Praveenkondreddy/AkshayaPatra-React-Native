import React,{useEffect,useState} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Text, ListItem} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import DashLine from './dashLine';
import {useDispatch, useSelector} from 'react-redux';
import {getMembersClaims, getPoliciesData, updatePolicyData} from '../store/policiesReducer';
import PageLoader from '../compontent/PageLoader';
import { getLogginData } from '../store/loginReducer';
import {Colors} from '../themes/Colors';
import {Fonts} from '../fonts/Fonts';
import DeviceInfo from 'react-native-device-info';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {APP_DATA} from '../commonHelper/appData';
const Claims = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {STACK_SCREENS, APP_ICON} = APP_DATA;
  const {claims,loader,routesParams} = useSelector(getPoliciesData);
  const {policy}=routesParams;
  const {form,data} = useSelector(getLogginData);

  useEffect(() => {
   //data.linkId=103789;
  
    dispatch(
      getMembersClaims({
        memberId: data.linkId,
        compId: '001',
      }),
    );
   
  }, []);
  const goTo=(item)=>{ 
   
    dispatch(updatePolicyData('routesParams', null, {...routesParams,claim:item}));  
    
    navigation.navigate(STACK_SCREENS.CLAIMSDET.NAME);
  };
  const renderFlatListItem = ({item}) => {
    return (
      <>
        <ListItem bottomDivider={false}>
          <ListItem.Content style={styles.listContent}>
            <TouchableOpacity
              onPress={() =>goTo(item)}>
              <View style={{flexDirection: 'row' ,width:'100%'}}>
                <View
                  style={[
                    styles.verticleLine,
                    {backgroundColor: colorHelper(item.searchApprovedStatus)},
                  ]}></View>
                <View style={styles.viewContent1}>
                  <View style={styles.viewContent2}>
                    <Text style={styles.claimsTitle}>Claim Ref#</Text>
                    <Text style={styles.claimsData}>{item.searchRegNo}</Text>
                  </View>
                  <View style={styles.viewContent2}>
                    <Text style={styles.claimsTitle}>Policy#</Text>
                    <Text style={styles.claimsData}>{item.searchPolicyNo}</Text>
                  </View>
                  <View style={styles.viewContent2}>
                    <Text style={styles.claimsTitle}>Member ID</Text>
                    <Text style={styles.claimsData}>{item.searchMemberId}</Text>
                  </View>
                  <View style={styles.viewContent2}>
                    <Text style={styles.claimsTitle}>Date</Text>
                    <Text style={styles.claimsData}>
                      {item.requestDate}
                    </Text>
                  </View>
                  <View style={styles.viewContent2}>
                    <Text style={styles.claimsTitle}>Status</Text>
                    <Text
                      style={[
                        styles.claimsData,
                        {color: colorHelper(item.searchApprovedStatus)},
                      ]}>
                      {item.searchApprovedStatus}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </ListItem.Content>

          <ListItem.Chevron color={Colors.WHITE} />
        </ListItem>
        <DashLine />
      </>
    );
  };
  const colorHelper = (status) => {
    switch (status) {
      case 'Settled':
        return Colors.SETTLED;
      case 'Documents Under Review':
        return Colors.ORANGE;
      case 'Open':
        return Colors.LIGHTGREEN;
      default:
        return Colors.GREEN;
    }
  };
  return (
    <View style={styles.container}>
        <PageLoader isLoading={loader} />
      <Text h4 h4Style={styles.title}>
        CLAIMS
      </Text>
      <View style={styles.horizontalLine}></View>

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={claims}
        renderItem={renderFlatListItem}
        style={{height: hp('80%')}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: hp('2.2%'),
    marginLeft: wp('3%'),
    color: Colors.BLUE1,
    fontFamily: Fonts.ui.fontFamily,
    textTransform: 'uppercase',
    marginTop: hp('2%'),
  },
  horizontalLine: {
    backgroundColor: Colors.LIGHTGRAY2,
    height: hp('0.2%'),
    width: 'auto',
    marginTop: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
  },container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    marginTop:DeviceInfo.isTablet()?hp('1%'):hp('1%'),
    width:'100%',
  },
  dashLine: {
    width: wp('100%'),
    flexDirection: 'row',
    marginTop: hp('2%'),
    borderRadius: 100,
  },
  listContent: {
    marginTop:DeviceInfo.isTablet()?hp('1%'):hp('1%'),
    width:'100%'
  },
  viewContent1: {
    marginTop: hp('1%'),
    marginLeft: wp('4%'),
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width:'100%'
  },
  viewContent2: {
    flexDirection: 'row',
    width:'100%'
  },
  claimsTitle: {
    marginLeft: wp('2%'),
    width: wp('30%'),
    fontFamily: Fonts.regular.fontFamily,
    fontWeight: 'bold',
  },
  claimsData: {
    marginLeft: wp('3%'),
    fontFamily: Fonts.regular.fontFamily,
  },
  verticleLine: {
    height: 'auto',
    width: wp('1%'),
  },
});
export default Claims;
