import React, {useState} from 'react';

import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import {Text, Icon} from 'react-native-elements';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Members from '../compontent/members';
import Claims from '../compontent/Claims';
import HeaderBarIcon from '../compontent/headerBarIcon';
import {useDispatch, useSelector} from 'react-redux';
import {getPoliciesData} from '../store/policiesReducer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../themes/Colors';
import FooterBar from '../compontent/footerBar';
import PageLoader from '../compontent/PageLoader';
import {Fonts} from '../fonts/Fonts';
const MyPolicyDetail = ({navigation}) => {
  const {policyMembers, claims, routesParams,loader} = useSelector(getPoliciesData);

  const {policy} = routesParams;
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
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'members', title: 'Members'},
    {key: 'claims', title: 'Claims'},
  ]);

  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'members':
        return <Members jumpTo={jumpTo} />;
      case 'claims':
        return <Claims jumpTo={jumpTo} />;
      default:
        return null;
    }
  };
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: Colors.WHITE}}
      style={{backgroundColor: Colors.BLUE3}}
      renderLabel={({route, focused, color}) => (
        <View style={styles.renderLabelView}>
          <Text style={{color,fontSize:hp('2%'),fontFamily: Fonts.regular.fontFamily}}>{route.title}</Text>
          <Text style={{color,fontSize:hp('2%'),fontFamily: Fonts.regular.fontFamily,fontWeight:'bold'}}>
            {route.key === 'members' ? policyMembers.length : claims.length}
          </Text>
        </View>
      )}
      scrollEnabled={false}
    />
  );

  const initialLayout = {width: Dimensions.get('window').width};

  return (
    <View style={styles.container}>
      <PageLoader isLoading={loader} />
      <View style={[styles.parentView, {height: 'auto'}]}>
        <View style={styles.titleView}>
          <Text style={styles.policyNo}>
            {policy.policyNumber} | {policy.network}
          </Text>
          <Text style={styles.policyDesc}>{policy.planName}</Text>
          <Text style={styles.policyComp}>{policy.customerName}</Text>
          <Text style={styles.policyDate}>
            {policy.fromDate} - {policy.toDate}
          </Text>
        </View>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </View>
     <FooterBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  parentView: {
    flex: 1,
  },
  scene: {
    flex: 4,
  },
  bodyContainer: {
    flex: 1,
  },
  titleView: {
    backgroundColor: Colors.BLUE1,
    marginTop: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('13%'),
  },

  policyNo: {
    color: Colors.WHITE,
    fontFamily: Fonts.light.fontFamily,
    marginLeft: wp('2%'),
    fontSize: hp('1.8%'),
    marginTop: hp('1%'),
  },
  policyDesc: {
    color: Colors.WHITE,
    fontFamily: Fonts.regular.fontFamily,
    marginLeft: wp('2%'),
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  policyComp: {
    color: Colors.WHITE,
    fontFamily: Fonts.light.fontFamily,
    marginLeft: wp('2%'),
    fontSize: hp('1.8%'),
  },
  policyDate: {
    color: 'white',
    fontFamily: Fonts.light.fontFamily,
    marginLeft: wp('2.5%'),
    fontSize: hp('1.8%'),
  },
  renderLabelView: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
  }
});

export default MyPolicyDetail;
