import * as React from 'react';
import {View, Text, Button, StyleSheet, BackHandler} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Login from './src/pages/Login';
import Home from './src/pages/Home';
import MyProfile from './src/pages/MyProfile';
import FAQs from './src/pages/FAQs';
import Notifications from './src/pages/Notifications';
import AccountSettings from './src/pages/AccountSettings';
import Help from './src/pages/Help';
import SignUp from './src/pages/SignUp';
import OTP from './src/pages/OTP';
import OTPSuccess from './src/pages/OTPSuccess';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HeaderBar from './src/compontent/headerBar';
import MyPolicies from './src/pages/MyPolicies';
import MyPolicyDetail from './src/pages/My-Policy-Details';
import MyBenefits from './src/pages/My-Benefits';
import ClaimsDetails from './src/pages/ClaimsDetails';
import ReferAConatct from './src/pages/ReferAContact';
import ReferAContactSuccess from './src/pages/ReferAContactSuccess';
import UsefulTips from './src/pages/UsefulTips';
import ContactUs from './src/pages/ContactUs';
import MyClaims from './src/pages/MyClaims';
import NewClaims from './src/pages/NewClaims';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import NewClaimsSuccess from './src/pages/NewClaimsSuccess';
import {getLogginData, restLoginStateData} from './src/store/loginReducer';
import {useSelector, useDispatch} from 'react-redux';
import FlatListWithSearch from './src/pages/searchableList';
import FlatListWithSearchTreatmentType from './src/pages/searchableListTreatmentType';
import FlatListWithSearchRelationShip from './src/pages/searchableListRelationShip';
import ForgotPassword from './src/pages/ForgotPassword';
import ForgotPasswordSuccess from './src/pages/ForgotPasswordSuccess';
import {useEffect} from 'react';
import ChangePassword from './src/pages/ChangePassword';
import ChangePasswordSuccess from './src/pages/ChangePasswordSuccess';
import {APP_DATA} from './src/commonHelper/appData';
import InternetConnectionAlert from 'react-native-internet-connection-alert';
import {Colors} from './src/themes/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RequestCallBack from './src/pages/RequestCallBack';
import Splash from './src/pages/Splash';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

const {STACK_SCREENS, APP_ICON} = APP_DATA;
const LandingScreen = ({navigation}) => {
  const headerBar = (props) => {
    return <HeaderBar {...props} headerHight={hp('8%')} />;
  };
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name={STACK_SCREENS.HOME.NAME}
        component={Home}
        options={{
          title: STACK_SCREENS.HOME.TITLE,
          gestureEnabled: false,
          headerBackground: (props) => headerBar(props),
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.LOGIN.NAME}
        options={{
          title: STACK_SCREENS.LOGIN.TITLE,
          headerShown: false,
          gestureEnabled: false,
        }}
        component={Login}
      />
      <Stack.Screen
        name={STACK_SCREENS.SPLASH.NAME}
        options={{
          title: STACK_SCREENS.SPLASH.TITLE,
          headerShown: false,
          gestureEnabled: false,
        }}
        component={Splash}
      />
      <Stack.Screen
        name={STACK_SCREENS.SIGNUP.NAME}
        options={{
          title: STACK_SCREENS.SIGNUP.TITLE,
          headerShown: false,
          gestureEnabled: false,
        }}
        component={SignUp}
      />
      <Stack.Screen
        name={STACK_SCREENS.OTP.NAME}
        options={{
          title: STACK_SCREENS.OTP.TITLE,
          headerShown: false,
          gestureEnabled: false,
          headerRight: () => <View></View>,
        }}
        component={OTP}
      />
      <Stack.Screen
        name={STACK_SCREENS.OTPS.NAME}
        options={{
          title: STACK_SCREENS.OTPS.TITLE,
          headerShown: false,
          gestureEnabled: false,
          headerRight: () => <View></View>,
        }}
        component={OTPSuccess}
      />
      <Stack.Screen
        name={STACK_SCREENS.MYPROFILE.NAME}
        component={MyProfile}
        options={{
          title: STACK_SCREENS.MYPROFILE.TITLE,
          gestureEnabled: false,
          headerBackground: (props) => headerBar(props),
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.FAQS.NAME}
        component={FAQs}
        options={{
          title: STACK_SCREENS.FAQS.TITLE,
          gestureEnabled: false,
          headerBackground: (props) => headerBar(props),
        }}
      />

      <Stack.Screen
        name={STACK_SCREENS.NOTIFICATION.NAME}
        component={Notifications}
        options={{
          title: STACK_SCREENS.NOTIFICATION.TITLE,
          gestureEnabled: false,
          headerShown: true,
          headerBackground: (props) => headerBar(props),
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.ACCOUNT.NAME}
        component={AccountSettings}
        options={{
          title: STACK_SCREENS.ACCOUNT.TITLE,
          gestureEnabled: false,
          headerShown: true,
          headerBackground: (props) => headerBar(props),
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.HELP.NAME}
        component={Help}
        options={{
          title: STACK_SCREENS.HELP.TITLE,
          gestureEnabled: false,
          headerShown: true,
          headerBackground: (props) => headerBar(props),
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.MYPOLICIES.NAME}
        component={MyPolicies}
        options={{
          title: STACK_SCREENS.MYPOLICIES.TITLE,
          gestureEnabled: false,
          headerShown: true,
          headerBackground: (props) => headerBar(props),
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.POLICYDET.NAME}
        component={MyPolicyDetail}
        options={{
          title: STACK_SCREENS.POLICYDET.TITLE,
          gestureEnabled: false,
          headerShown: true,
          headerBackground: (props) => headerBar(props),
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.BENEFITS.NAME}
        component={MyBenefits}
        options={{
          title: STACK_SCREENS.BENEFITS.TITLE,
          gestureEnabled: false,
          headerShown: true,
          headerBackground: (props) => headerBar(props),
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.MYCLAIMS.NAME}
        component={MyClaims}
        options={{
          title: STACK_SCREENS.MYCLAIMS.TITLE,
          gestureEnabled: false,
          headerShown: true,
          headerBackground: (props) => headerBar(props),
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.CLAIMSDET.NAME}
        component={ClaimsDetails}
        options={{
          title: STACK_SCREENS.CLAIMSDET.TITLE,
          gestureEnabled: false,
          headerShown: true,
          headerBackground: (props) => headerBar(props),
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.REFACONTACT.NAME}
        component={ReferAConatct}
        options={{
          title: STACK_SCREENS.REFACONTACT.TITLE,
          gestureEnabled: false,
          headerShown: true,
          headerBackground: (props) => headerBar(props),
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.REFACONTACTS.NAME}
        component={ReferAContactSuccess}
        options={{
          title: STACK_SCREENS.REFACONTACTS.TITLE,
          gestureEnabled: false,
          headerShown: true,
          headerBackground: (props) => headerBar(props),
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.USEFULTIPS.NAME}
        component={UsefulTips}
        options={{
          title: STACK_SCREENS.USEFULTIPS.TITLE,
          gestureEnabled: false,
          headerShown: true,
          headerBackground: (props) => headerBar(props),
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.CONTACTUS.NAME}
        component={ContactUs}
        options={{
          title: STACK_SCREENS.CONTACTUS.TITLE,
          gestureEnabled: false,
          headerShown: true,
          headerBackground: (props) => headerBar(props),
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.NEWCLAIM.NAME}
        component={NewClaims}
        options={{
          title: STACK_SCREENS.NEWCLAIM.TITLE,
          gestureEnabled: false,
          headerShown: true,
          headerBackground: (props) => headerBar(props),
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.NEWCLAIMS.NAME}
        component={NewClaimsSuccess}
        options={{
          title: STACK_SCREENS.FORGOTPASSWORDS.TITLE,
          gestureEnabled: false,
          headerShown: true,
          headerBackground: (props) => headerBar(props),
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.SEARCH.NAME}
        component={FlatListWithSearch}
        options={{
          title: STACK_SCREENS.FORGOTPASSWORDS.TITLE,
          gestureEnabled: false,
          headerShown: true,
          headerBackground: (props) => headerBar(props),
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.SEARCHRELATION.NAME}
        component={FlatListWithSearchRelationShip}
        options={{
          title: STACK_SCREENS.FORGOTPASSWORDS.TITLE,
          gestureEnabled: false,
          headerShown: true,
          headerBackground: (props) => headerBar(props),
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.SEARCHTreatment.NAME}
        component={FlatListWithSearchTreatmentType}
        options={{
          title: STACK_SCREENS.FORGOTPASSWORDS.TITLE,
          gestureEnabled: false,
          headerShown: true,
          headerBackground: (props) => headerBar(props),
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.FORGOTPASSWORD.NAME}
        component={ForgotPassword}
        options={{
          title: STACK_SCREENS.FORGOTPASSWORDS.TITLE,
          headerShown: false,
          gestureEnabled: false,
          headerRight: () => <View></View>,
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.FORGOTPASSWORDS.NAME}
        component={ForgotPasswordSuccess}
        options={{
          title: STACK_SCREENS.FORGOTPASSWORDS.TITLE,
          headerShown: false,
          gestureEnabled: false,
          headerRight: () => <View></View>,
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.CHANGEPASSWORD.NAME}
        component={ChangePassword}
        options={{
          title: STACK_SCREENS.CHANGEPASSWORD.TITLE,
          headerShown: false,
          gestureEnabled: false,
          headerRight: () => <View></View>,
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.CHANGEPASSWORDS.NAME}
        component={ChangePasswordSuccess}
        options={{
          title: STACK_SCREENS.CHANGEPASSWORDS.TITLE,
          headerShown: false,
          gestureEnabled: false,
          headerRight: () => <View></View>,
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.REQCALLBACK.NAME}
        component={RequestCallBack}
        options={{
          title: STACK_SCREENS.REQCALLBACK.TITLE,
          gestureEnabled: false,
          headerShown: true,
          headerBackground: (props) => headerBar(props),
        }}
      />
    </Stack.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  const {data} = useSelector(getLogginData);

  const dispatch = useDispatch();
  const goTo = (screen) => {
    if (screen === STACK_SCREENS.LOGIN.NAME) {
      dispatch(restLoginStateData());
    }
    props.navigation.toggleDrawer();
    props.navigation.navigate(screen);
  };
  return (
    <DrawerContentScrollView {...props}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[Colors.GRADIENT, Colors.GRADIENT1]}
        style={styles.linearGradient}>
        <View style={styles.userProfileView}>
          <View style={styles.userIconView}>
            <Icon
              name={APP_ICON.NAME.PERSON}
              type={APP_ICON.TYPE.ION}
              iconStyle={styles.userIcon}
            />
          </View>
          <View style={styles.userTextView}>
            <Text style={styles.userNameText}>{data.userName}</Text>
            <Text style={styles.userAddressText}>{''}</Text>
          </View>
        </View>
      </LinearGradient>
      <View style={{margin: DeviceInfo.isTablet() ? hp('2%') : hp('2%')}}>
        <DrawerItem
          label={STACK_SCREENS.HOME.LABEL}
          icon={() => (
            <Icon
              name={APP_ICON.NAME.HOME}
              type={APP_ICON.TYPE.ENT}
              iconStyle={styles.sideBarIcon}
            />
          )}
          onPress={() => goTo(STACK_SCREENS.HOME.NAME)}
          style={[styles.drawerItem]}
          labelStyle={[styles.drawerLabel]}
        />
        <DrawerItem
          label={STACK_SCREENS.MYPROFILE.LABEL}
          icon={() => (
            <Icon name="person" type="ionicon" iconStyle={styles.sideBarIcon} />
          )}
          onPress={() => goTo(STACK_SCREENS.MYPROFILE.NAME)}
          style={[styles.drawerItem]}
          labelStyle={[styles.drawerLabel]}
        />
        {/*  <DrawerItem
          label="NOTIFICATIONS"
          icon={() => (
            <Icon
              name="bell"
              type="font-awesome"
              iconStyle={styles.sideBarIcon}
            />
          )}
          onPress={() => goTo(STACK_SCREENS.NOTIFICATION.NAME)}
          style={[styles.drawerItem]}
          labelStyle={[styles.drawerLabel]}
        />
        <DrawerItem
          label="ACCOUNT SETTINGS"
          icon={() => (
            <Icon
              name="cog"
              type="font-awesome"
              iconStyle={styles.sideBarIcon}
            />
          )}
          onPress={() => goTo(STACK_SCREENS.ACCOUNT.NAME)}
          style={[styles.drawerItem]}
          labelStyle={[styles.drawerLabel]}
          
        /> */}

        <DrawerItem
          label="FAQs"
          icon={() => (
            <Icon
              name="question-circle"
              type="font-awesome"
              iconStyle={styles.sideBarIcon}
            />
          )}
          onPress={() => goTo(STACK_SCREENS.FAQS.NAME)}
          style={[styles.drawerItem]}
          labelStyle={[styles.drawerLabel]}
        />

        <DrawerItem
          label="HELP"
          icon={() => (
            <Icon
              name="question-circle"
              type="font-awesome"
              iconStyle={styles.sideBarIcon}
            />
          )}
          onPress={() => goTo(STACK_SCREENS.CONTACTUS.NAME)}
          style={[styles.drawerItem]}
          labelStyle={[styles.drawerLabel]}
        />

        {/*  <DrawerItemList {...props} />   */}

        <DrawerItem
          label="LOGOUT"
          icon={() => (
            <Icon
              name="log-out"
              type="ionicon"
              iconStyle={styles.sideBarIcon}
            />
          )}
          onPress={() => goTo(STACK_SCREENS.LOGIN.NAME)}
          style={[styles.drawerItem]}
          labelStyle={[styles.drawerLabel]}
        />

        {/*  <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      /> */}
      </View>
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          initialRouteName="HomeScreen"
          unmountInactiveRoutes="true"
        />
      )}
      drawerStyle={{
        backgroundColor: Colors.WHITE,
        width: wp('60%'),
      }}>
      <Drawer.Screen
        name="HomeScreen"
        component={LandingScreen}
        options={{
          swipeEnabled: true,
          drawerIcon: ({focused, size}) => (
            <Icon
              name="home"
              type="font-awesome"
              iconStyle={styles.sideBarIcon}

              /*  color={focused ? '#FF7F00' : '#FF7F00'} */
            />
          ),
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true);
  }, []);
  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);

  // return (
  //   <NavigationContainer onReady={() => SplashScreen.hide()}>
  //     {/* content */}
  //   </NavigationContainer>
  // );

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <InternetConnectionAlert
            onChange={(connectionState) => {
              SplashScreen.hide();
            }}>
            <MyDrawer />
          </InternetConnectionAlert>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    height: hp('13%'),
    alignItems: 'flex-start',
    marginTop: hp('-1%'),
  },
  userProfileView: {
    flexDirection: 'row',
  },
  userIconView: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    width: hp('15%') * 0.5,
    height: hp('15%') * 0.5,
    backgroundColor: Colors.WHITE1,
    marginHorizontal: wp('5%'),
    marginTop: hp('3%'),
    justifyContent: 'center',
  },
  userIcon: {
    color: Colors.ORANGE,
    fontSize: hp('3.5%'),
    alignSelf: 'center',
  },
  userTextView: {
    marginTop: hp('3.5%'),
  },
  userNameText: {
    color: Colors.WHITE1,
    fontSize: hp('2.2%'),
    marginTop: hp('1%'),
  },
  userAddressText: {
    color: Colors.WHITE1,
    fontSize: hp('1.5%'),
  },
  sideBarIcon: {
    fontSize: hp('3%'),
    color: Colors.ORANGE,
    marginLeft: 1,
  },
  sideBarText: {},
  drawerItem: {
    marginBottom: hp('-1%'),
    marginTop: hp('2%'),
    width: wp('100%'),
  },
  drawerLabel: {
    fontSize: hp('1.8%'),
    color: Colors.LIGHTBLACK,
    marginLeft: Platform.OS !== 'ios' ? hp('-3%') : hp('-1%'),
  },
});
export default App;
