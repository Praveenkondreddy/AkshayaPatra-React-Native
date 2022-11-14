import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import {Text, Card, Button, Icon, Avatar} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import DashLine from './dashLine';
import {useDispatch, useSelector} from 'react-redux';
import {Fonts} from '../fonts/Fonts';
import {
  getPoliciesData,
  getPolicyMembers,
  updatePolicyData,
} from '../store/policiesReducer';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {addressConcat} from '../commonHelper/functionHelper';
import {Colors} from '../themes/Colors';
import {APP_DATA} from '../commonHelper/appData';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fileDownload} from '../commonHelper/fileChooser';
const Members = ({jumpTo}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {STACK_SCREENS, APP_ICON} = APP_DATA;
  const {policyMembers, routesParams} = useSelector(getPoliciesData);
  const {policy} = routesParams;
  useEffect(() => {
    dispatch(
      getPolicyMembers({policyId: policy.sgsId, memberId: policy.memberId}),
    );
  }, []);

  const goToMyPolicyDetails = (item) => {
    dispatch(
      updatePolicyData('routesParams', null, {...routesParams, member: item}),
    );
    navigateTo(STACK_SCREENS.BENEFITS.NAME);
  };
  const navigateTo = (page) => {
    navigation.navigate(page);
  };
  const goToClaimsDetails = () => {
    jumpTo('claims');
  };
  const renderFlatListItem = ({item}) => {
    var icon =
      item.gender === 'self'
        ? require('../../assets/images/male.png')
        : item.type === 'Spouse'
        ? require('../../assets/images/female.png')
        : require('../../assets/images/child.png');
    let address = addressConcat(item);

    return (
      <>
        <Card containerStyle={styles.cardContainer}>
          <View>
            <View style={styles.viewConatiner1}>
              <View style={styles.viewConatiner2}>
                <Image source={icon} style={styles.image} />
                <Text style={styles.textSelf}>{item.relation}</Text>
              </View>
              <View style={styles.viewConatiner3}>
                <Text style={styles.textName}>
                  {item.memberName},{''}
                  <Text style={styles.textPersonDetail}>
                    {' '}
                    {item.gender}, {item.age}
                  </Text>
                </Text>
                <Text style={styles.textPersonDetail}>
                  {item.phone}
                  {item.phone && ' | '}
                  {item.email}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textPersonDetail}>{address}</Text>
                </View>
              </View>
            </View>
            <DashLine />
            <View style={styles.viewConatiner4}>
              <View style={styles.viewConatiner5}>
                <Text style={styles.textMemeberId}>Member ID</Text>
                <Text style={styles.textPhone}> {item.meMemberId}</Text>
              </View>
              <View style={styles.viewConatiner6}>
                <Text style={styles.textMemeberId}>Date of Birth</Text>
                <Text style={styles.textPhone}> {item.dob}</Text>
              </View>
              <View style={styles.viewConatiner6}>
                <Text style={styles.textMemeberId}>Nationality</Text>
                <Text style={styles.textPhone}> {item.nationality}</Text>
              </View>
            </View>
            <DashLine />
            <View style={styles.viewConatiner7}>
              <TouchableOpacity onPress={() => goToMyPolicyDetails(item)}>
                <Text style={styles.textMyBenifits}>My Benefits</Text>
              </TouchableOpacity>
              <Text style={styles.textMyBenifits}>|</Text>
              <TouchableOpacity onPress={() => goToClaimsDetails()}>
                <Text style={styles.textMyBenifits}>My Claims</Text>
              </TouchableOpacity>
            </View>
            <Button
              icon={
                <Icon
                  name="arrow-down-circle-outline"
                  type="ionicon"
                  size={hp('3%')}
                  color="white"
                  iconStyle={{height: hp('4%'), marginTop: 0}}
                />
              }
              titleStyle={styles.insuCardTitle}
              buttonStyle={styles.insuCardButtonStyle}
              title="INSURANCE CARD"
              onPress={() => fileDownload()}
            />
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'red',
              flex: 1,
            }}></View>
        </Card>
      </>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text h4 h4Style={styles.title}>
          Members
        </Text>
        <View style={styles.horizontalLine}></View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={policyMembers}
          renderItem={renderFlatListItem}
          style={{height: '88%'}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: hp('1%'),
  },
  viewConatiner1: {
    height: 'auto',
    flexDirection: 'row',
  },
  viewConatiner2: {
    width: wp('10%'),
    maxWidth: wp('10%'),
    alignItems: 'center',
    marginLeft: wp('7%'),
    marginHorizontal: wp('3%'),
    flexDirection: 'column',
  },
  textSelf: {
    color: Colors.BLACK,
    fontSize: hp('2%'),
    width: hp('15%'),
    marginLeft: wp('12%'),
    fontWeight: 'bold',
    fontFamily: Fonts.regular.fontFamily,
  },
  viewConatiner3: {
    flexDirection: 'column',
    width: wp('100%'),
    marginLeft: '10%',
  },
  textName: {
    color: Colors.BLACK,
    fontSize: hp('2%'),
    fontFamily: Fonts.regular.fontFamily,
    width: wp('75%'),
  },
  textPersonDetail: {
    color: Colors.LIGHTBLACK,
    fontSize: hp('1.8%'),
    fontFamily: Fonts.light.fontFamily,
    flexWrap: 'wrap',
    width: wp('80%'),
  },
  viewConatiner4: {flexDirection: 'row', marginTop: hp('1%')},
  viewConatiner5: {
    flexDirection: 'column',
    marginLeft: wp('1%'),
  },
  textMemeberId: {
    fontSize: hp('2%'),
    color: Colors.LIGHTGRAY1,
    fontFamily: Fonts.regular.fontFamily,
  },
  textPhone: {
    fontSize: hp('1.7%'),
    color: Colors.BLACK,
    fontFamily: Fonts.regular.fontFamily,
  },
  viewConatiner6: {
    flexDirection: 'column',
    marginLeft: wp('7%'),
  },
  viewConatiner7: {
    flexDirection: 'row',
    marginLeft: 0,
    marginTop: hp('1%'),
  },
  textMyBenifits: {
    marginHorizontal: wp('1%'),
    fontSize: hp('2%'),
    color: Colors.BLUE,
    fontFamily: Fonts.regular.fontFamily,
  },
  title: {
    fontSize: hp('2.2%'),
    marginLeft: wp('5%'),
    color: Colors.BLUE1,
    fontFamily: Fonts.ui.fontFamily,
    textTransform: 'uppercase',
    marginTop: 20,
  },
  horizontalLine: {
    backgroundColor: '#bfcdd2',
    height: hp('0.2%'),
    width: 'auto',
    marginTop: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  insuCardTitle: {
    fontSize: hp('1.8%'),
    fontFamily: Fonts.regular.fontFamily,
    textAlign: 'center',
    marginLeft: wp('2%'),
    marginTop: -3,
  },
  insuCardButtonStyle: {
    fontSize: hp('1.8%'),
    fontFamily: Fonts.regular.fontFamily,
    backgroundColor: Colors.LIGHTGREEN1,
    height: hp('5%'),
    width: '100%',
  },
  image: {
    width: hp('10%'),
    height: hp('10%'),
  },
});
export default Members;
