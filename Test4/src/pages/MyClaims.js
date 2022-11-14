import React, {useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import {Text, Icon, ListItem} from 'react-native-elements';
import HeaderBarIcon from '../compontent/headerBarIcon';
import DashLine from '../compontent/dashLine';
import {useDispatch, useSelector} from 'react-redux';
import {
  getMembersClaims,
  getPoliciesData,
  resetStateData,
  updatePolicyData,
} from '../store/policiesReducer';
import PageLoader from '../compontent/PageLoader';
import {getLogginData} from '../store/loginReducer';
import {Fonts} from '../fonts/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../themes/Colors';
import FooterBar from '../compontent/footerBar';
import DeviceInfo from 'react-native-device-info';
const MyClaims = ({navigation}) => {
  const dispatch = useDispatch();
  const {claims, loader, routesParams} = useSelector(getPoliciesData);

  const {form, data} = useSelector(getLogginData);
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
  useEffect(() => {
    // data.linkId=103789;
    dispatch(resetStateData());
    dispatch(
      getMembersClaims({
        memberId: data.linkId,
        compId: '001',
      }),
    );
  }, []);
  const action = (goToHome) => {
    goToHome ? navigation.navigate('Home') : navigation.toggleDrawer();
  };

  const colorHelper = (status) => {
    switch (status) {
      case 'Settled':
        return Colors.LIGHTROSE;
      case 'Documents Under Review':
        return Colors.ORANGE;
      case 'Open':
        return Colors.LIGHTGREEN;
      default:
        return Colors.LIGHTROSE;
    }
  };
  const goTo = (item) => {
    let policy = {
      policyNumber: item.searchPolicyNo,
      network: item.searchNetwork,
      customerName: item.searchCustomerName,
      fromDate: item.searchPolicyFmd,
      toDate: item.searchPolicyTod,
      planName: item.searchPlan,
    };

    dispatch(
      updatePolicyData('routesParams', null, {
        ...routesParams,
        claim: item,
        policy,
      }),
    );
    navigation.navigate('ClaimsDetails');
  };
  const renderFlatListItem = ({item}) => {
    return (
      <>
        <ListItem bottomDivider={false}>
          <ListItem.Content style={[styles.listContent]}>
            <TouchableOpacity onPress={() => goTo(item)}>
              <View style={{flexDirection: 'row', width: '100%'}}>
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
                    <Text style={styles.claimsData}>{item.requestDate}</Text>
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
  return (
    <View style={[styles.container]}>
      <PageLoader isLoading={loader} />
      <View style={styles.titleView}>
        <Text style={styles.titleText}>MY CLAIM(S)</Text>
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={claims}
        renderItem={renderFlatListItem}
      />
      <FooterBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    marginTop: DeviceInfo.isTablet() ? hp('1%') : hp('1%'),
    width: '100%',
  },
  titleView: {
    backgroundColor: Colors.BLUE1,
    marginTop: hp('1%'),
    height: hp('7%'),
    justifyContent: 'center',
  },
  titleText: {
    color: Colors.WHITE,
    fontFamily: Fonts.regular.fontFamily,
    marginLeft: wp('2%'),
    fontSize: hp('2%'),
  },
  verticleLine: {
    height: 'auto',
    width: wp('1%'),
  },
  listContent: {
    width: '100%',
    margin: DeviceInfo.isTablet() ? hp('1%') : hp('-1%'),
  },
  viewContent1: {
    marginTop: hp('2%'),
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginLeft: wp('4%'),
  },
  viewContent2: {
    flexDirection: 'row',
    height: hp('4%'),
    width: '100%',
    marginTop: hp('1%'),
  },
  listViewContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  secondView: {
    marginLeft: wp('4%'),
    width: '100%',
  },
  claimsTitle: {
    marginLeft: wp('2%'),
    width: wp('30%'),
    fontFamily: Fonts.regular.fontFamily,
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  claimsData: {
    marginLeft: wp('4%'),
    fontFamily: Fonts.regular.fontFamily,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
    width: '100%',
  },
});

export default MyClaims;
