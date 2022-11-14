import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  LogBox,
} from 'react-native';
import {Fonts} from '../fonts/Fonts';
import {Text, Icon} from 'react-native-elements';
import {SvgXml} from 'react-native-svg';
import Members from '../compontent/members';
import Claims from '../compontent/Claims';
import insurance from '../../assets/icons/insurance.svg';
import phone from '../../assets/icons/phone.svg';
import team from '../../assets/icons/team.svg';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import DocumentsTab from '../compontent/DocumentsTab';
import ClaimsDetailsTab from '../compontent/ClaimsDetailsTab';
import HeaderBarIcon from '../compontent/headerBarIcon';
import {
  getMembersClaimsDetails,
  getPoliciesData,
  updatePolicyData,
} from '../store/policiesReducer';
import {useDispatch, useSelector} from 'react-redux';
import PageLoader from '../compontent/PageLoader';
import {getLogginData} from '../store/loginReducer';
import {widthPercentageToDP as wp , heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {APP_DATA} from '../commonHelper/appData';
import { Colors } from '../themes/Colors';
import FooterBar from '../compontent/footerBar';
 ClaimsDetails = ({navigation}) => {
 
  const dispatch = useDispatch();
  const {STACK_SCREENS, APP_ICON} = APP_DATA;
  const {claims, loader, claimsDetails,routesParams,policyMembers} = useSelector(getPoliciesData);  

  const{policy,claim}=routesParams;
  const {form} = useSelector(getLogginData);
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    //claim.searchSgsId=277;
    dispatch(
      getMembersClaimsDetails({
        sgsId: claim.searchSgsId,
      }),
    );
  }, []);
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
    goToHome ? navigateTo(STACK_SCREENS.HOME.NAME) : navigation.toggleDrawer();
  };
  const navigateTo = (page) => {
    navigation.navigate(page);
  };
  const barWidth = Dimensions.get('screen').width - 50;
  const progressCustomStyles = {
    backgroundColor: 'green',
    borderRadius: 0,
    borderColor: 'green',
  };
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'claimsDetails', title: 'CLAIM DETAILS'},
    {key: 'documents', title: 'DOCUMENTS'},
  ]);

  const renderScene = SceneMap({
    claimsDetails: ClaimsDetailsTab,
    documents: DocumentsTab,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: Colors.LIGHTGREEN1, height: 3}}
      style={{backgroundColor: Colors.WHITE}}
      renderLabel={({route, focused, color}) => (
        <View style={styles.renderLabelView}>
          <Text
            style={{
              color: focused ? Colors.LIGHTGREEN : Colors.LIGHTGRAY1,
              fontFamily: Fonts.regular.fontFamily,
              fontSize: hp('2%'),
            }}>
            {route.title}
          </Text>
        </View>
      )}
      scrollEnabled={false}
    />
  );

  const initialLayout = {width: Dimensions.get('window').width};
  return (
    <View style={styles.container}>
      <View style={[styles.parentView, {height: 'auto',width:'100%'}]}>
        <View style={{height: 'auto', flexDirection: 'row'}}>
          <View style={[styles.titleView, {flexDirection: 'column'}]}>
            <View style={{alignItems:'center'}}> 
            <Text style={styles.policyNo}>
            {policy.policyNumber} | {policy.network}
            </Text>
            <Text style={styles.policyDesc}>{policy.planName}</Text>
            <Text style={styles.policyComp}>
            {policy.customerName}
            </Text>
            <Text style={styles.policyDate}>
            {policy.fromDate} - {policy.toDate}
            </Text>
            </View>
          </View>
          <View
            style={styles.viewConatiner}>
            <View
              // style={styles.viewConatiner1}
              >
              {/* <Text style={{color: Colors.LIGHTGRAY1, fontSize: hp('1.8%'), marginLeft: wp('2%')}}>
                Utilization
              </Text>
              <Text style={{color:  Colors.LIGHTGRAY1, fontSize: hp('1.8%'), marginLeft: wp('2%')}}>
                {claimsDetails.utilPerct}%
              </Text> */}
              <View 
              // style={{marginLeft: wp('1%')}}
              >
                {/* <ProgressBarAnimated
                  {...progressCustomStyles}
                  width={wp('25%')}
                  value={20}
                  height={hp('2%')}
                  backgroundColorOnComplete={Colors.GREEN1}
                  borderWidth={1}
                  barEasing="quad"
                  maxValue={100}
                /> */}
              </View>
            </View>
          </View>
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
  menuIcon: {
    marginHorizontal: wp('10%'),
    fontSize: hp('10%'),
    color: Colors.WHITE,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    marginTop:hp('4%')
  },
  viewConatiner:{
    backgroundColor: Colors.BLUE1,
    height: 'auto',
    marginTop: hp('-1%'),
    width: '100%',
    paddingLeft:wp('20%')
  },
  viewConatiner1:{
    backgroundColor: Colors.WHITE,
    marginTop: hp('5%'),
    height: hp('8%'),
    marginRight: wp('8%'),
    width:  wp('30%'),
  },
  parentView: {
    width:'100%',
    flex: 1,
  },
  titleView: {
    backgroundColor: Colors.BLUE1,
    marginTop: hp('-1%'),
    justifyContent: 'center',
    width:'100%',
    alignItems: 'center',
    height: hp('15%'),
   
  },

  policyNo: {
    color:Colors.WHITE,
    fontFamily: Fonts.light.fontFamily,
    marginLeft: wp('1%'),
    fontSize: hp('2%'),
    marginTop: hp('2%'),
  },
  policyDesc: {
    color:Colors.WHITE,
    fontFamily: Fonts.regular.fontFamily,
    marginLeft: hp('1%'),
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  policyComp: {
    color:Colors.WHITE,
    fontFamily: Fonts.light.fontFamily,
    marginLeft: hp('1%'),
    fontSize: hp('2%'),
  },
  policyDate: {
    color:Colors.WHITE,
    fontFamily: Fonts.light.fontFamily,
    marginLeft: hp('1%'),
    fontSize: hp('2%'),
  }
});

export default ClaimsDetails;
