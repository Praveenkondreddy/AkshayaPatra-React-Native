import React, {useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import {Text, Icon, ListItem} from 'react-native-elements';
import HeaderBarIcon from '../compontent/headerBarIcon';
import DashLine from '../compontent/dashLine';
import {useDispatch, useSelector} from 'react-redux';
import {
  getMyPolicies,
  getPoliciesData,
  resetStateData,
  updatePolicyData,
} from '../store/policiesReducer';
import {Fonts} from '../fonts/Fonts';
import {getLogginData} from '../store/loginReducer';
import PageLoader from '../compontent/PageLoader';
import {Colors} from '../themes/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {APP_DATA} from '../commonHelper/appData';
import FooterBar from '../compontent/footerBar';
import DeviceInfo from 'react-native-device-info';
const MyPolicies = ({navigation}) => {
  const {STACK_SCREENS, APP_ICON} = APP_DATA;
  const {form, data} = useSelector(getLogginData);
  const {policies, routesParams, loader} = useSelector(getPoliciesData);
  const dispatch = useDispatch();
  console.log(loader);
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
    goToHome ? navigation.goBack() : navigation.toggleDrawer();
  };
  useEffect(() => {
    //data.linkId=239265;
    dispatch(resetStateData());
    dispatch(getMyPolicies({memberId: data.linkId}));
  }, []);

  const colorHelper = (status) => {
    switch (status) {
      case 'Active':
        return 'green';

      default:
        return Colors.LIGHTROSE;
    }
  };
  const goToMyPolicyDetails = (item) => {
    dispatch(
      updatePolicyData('routesParams', null, {...routesParams, policy: item}),
    );
    navigateTo(STACK_SCREENS.POLICYDET.NAME);
  };
  const navigateTo = (page) => {
    navigation.navigate(page);
  };
  const renderFlatListItem = ({item}) => {
    return (
      <>
        <ListItem bottomDivider={false}>
          <ListItem.Content style={[styles.listContent]}>
            <TouchableOpacity onPress={() => goToMyPolicyDetails(item)}>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <View
                  style={[
                    styles.verticleLine,
                    {backgroundColor: colorHelper(item.status)},
                  ]}></View>
                <View style={styles.viewContent1}>
                  <View style={styles.viewContent2}>
                    <Text style={styles.policyTitle}>Policy Ref#</Text>
                    <Text style={styles.policyDataPolicy}>
                      {' '}
                      {item.policyNumber}
                    </Text>
                    {/* <Text style={styles.policyData}> {item.policyNumber} - {item.network}</Text> */}
                  </View>
                  <View style={styles.viewContent2}>
                    <Text style={styles.policyTitle}>Plan Name </Text>
                    <Text style={styles.policyData}>{item.planName}</Text>
                  </View>
                  <View style={styles.viewContent2}>
                    <Text style={styles.policyTitle}>Category Name</Text>
                    <Text style={styles.policyData}>{item.categoryName}</Text>
                  </View>
                  <View style={styles.viewContent2}>
                    <Text style={styles.policyTitle}>Company Name</Text>
                    <Text style={styles.policyData}>{item.customerName}</Text>
                  </View>
                  <View style={styles.viewContent2}>
                    <Text style={styles.policyTitle}>Policy Period</Text>
                    <Text style={styles.policyData}>
                      {item.fromDate} - {item.toDate}
                    </Text>
                  </View>
                  {/* <View style={styles.viewContent2}>
                    <Text style={styles.policyTitle}>Status</Text>
                    <Text
                      style={[
                        styles.policyData,
                        {color: colorHelper(item.status)},
                      ]}>
                      {item.status}
                    </Text>
                  </View> */}
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
        <Text style={styles.titleText}>MY Policy(s)</Text>
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={policies}
        renderItem={renderFlatListItem}
      />
      <FooterBar />
    </View>
  );
};

const styles = StyleSheet.create({
  policyTitle: {
    marginLeft: wp('1%'),
    width: wp('36%'),
    fontFamily: Fonts.regular.fontFamily,
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  policyData: {
    marginLeft: wp('2%'),
    textTransform: 'capitalize',
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
    flex: 4,

    flexDirection: 'column',
  },
  policyDataPolicy: {
    marginLeft: wp('1%'),
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
    width: '100%',
  },
  viewContent1: {
    marginTop: hp('1%'),
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: wp('2%'),
  },
  viewContent2: {
    flexDirection: 'row',
    height: hp('6%'),
    width: '100%',
    marginTop: hp('3%'),
  },
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
});

export default MyPolicies;
