import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Text, Icon} from 'react-native-elements';
import {SvgUri, SvgXml} from 'react-native-svg';
import insurance from '../../assets/icons/insurance.svg';
import comment from '../../assets/icons/comment.svg';
import contract from '../../assets/icons/contract.svg';
import phone from '../../assets/icons/phone.svg';
import team from '../../assets/icons/team.svg';
import {getLogginData} from '../store/loginReducer';
import {useSelector} from 'react-redux';
import {Colors} from '../themes/Colors';
import {Fonts} from '../fonts/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HeaderBarIcon from '../compontent/headerBarIcon';
import DeviceInfo from 'react-native-device-info';
const menuData = [
  {id: 1, title: 'My Policy(s)', icon: contract, page: 'MyPolicies'},
  {id: 2, title: 'My Claim(s)', icon: insurance, page: 'MyClaims'},
  {id: 3, title: 'Refer a Contact', icon: team, page: 'ReferAContact'},
  {id: 4, title: 'Useful Tips', icon: comment, page: 'UsefulTips'},
  {id: 5, title: 'Contact Us', icon: phone, page: 'ContactUs'},
  {id: 6, title: 'Frequently asked questions', icon: comment, page: 'FAQ'},
];

const Home = ({navigation}) => {
  const {data, form} = useSelector(getLogginData);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBarIcon
          type="fa"
          iconName="bars"
          onClick={action}
          goToHome={false}
        />
      ),
      headerRight: () => null,
      headerTitle: () => (
        <View
          style={[
            styles.iconUserView,
            {
              marginTop: DeviceInfo.isTablet() ? hp('15%') : hp('11%'),
              marginRight: DeviceInfo.isTablet() ? hp('5%') : hp('8%'),
            },
          ]}>
          <View style={styles.CircleShapeView}>
            <View style={styles.CircleShapeInnerView}>
              <Icon name="person" type="ionicon" iconStyle={styles.iconUser} />
            </View>
          </View>
        </View>
      ),
      headerStyle: {},
    });
  }, [navigation]);
  const action = (goToHome) => {
    goToHome ? navigation.goBack() : navigation.toggleDrawer();
  };
  const renderFlatListItem = ({item, index}) => {
    if (index === menuData.length - 1) {
      return <View style={styles.flcontainer1}></View>;
    }
    return (
      <ScrollView>
        <View style={styles.flcontainer}>
          <LinearGradient
            style={styles.flTouchable}
            colors={[Colors.SANDEL2, Colors.SANDEL3]}>
            <TouchableOpacity
              style={styles.flTouchable}
              onPress={() => navigation.navigate(item.page)}>
              <SvgXml
                width={wp('5%')}
                height={hp('5%')}
                xml={item.icon}
                fill={Colors.BLACK1}
                style={styles.svgSubmitIcon}
              />

              <Text style={styles.flTitle}>{item.title}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.bodyContainer}>
        <View style={styles.userNameView}>
          <Text style={styles.userNameText}>{data.userName}</Text>

          <View style={styles.horizontalLine}></View>
        </View>
        <View style={styles.flContainerView}>
          <FlatList
            data={menuData}
            renderItem={renderFlatListItem}
            numColumns={3}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.submitView}
          onPress={() => navigation.navigate('NewClaims')}>
          <SvgXml
            width={wp('5%')}
            height={hp('4%')}
            xml={insurance}
            fill={Colors.WHITE}
            style={styles.svgSubmitIcon}
          />

          <Text style={styles.submitText}>SUBMIT NEW CLAIM</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  bodyContainer: {
    flex: 2,
  },
  menuIcon: {
    marginHorizontal: wp('5%'),
    fontSize: hp('2.5%'),
    color: Colors.WHITE,
    marginTop: hp('2.1%'),
  },

  iconUserView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  CircleShapeView: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    width: hp('32%') * 0.5,
    height: hp('32%') * 0.5,
    backgroundColor: Colors.LIGHTGREEN1,
    alignItems: 'center',
    opacity: 0.8,
  },
  CircleShapeInnerView: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    width: hp('20%') * 0.5,
    height: hp('20%') * 0.5,
    backgroundColor: Colors.WHITE,
    marginTop: hp('3.2%'),
  },
  iconUser: {
    color: Colors.BLACK,
    fontSize: hp('3%'),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp('3%'),
  },
  userNameView: {
    alignItems: 'center',
    marginTop: hp('15%'),
  },
  userNameText: {
    color: Colors.LIGHTBLACK,
    marginTop: hp('2%'),
    fontSize: hp('2.5%'),
    fontFamily: Fonts.regular.fontFamily,
    height: hp('5%'),
    textAlign: 'center',
  },
  horizontalLine: {
    backgroundColor: Colors.LIGHTGRAY2,
    height: hp('0.2%'),
    width: wp('8%'),
    marginTop: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    height: hp('12%'),
    backgroundColor: Colors.LIGHTGREEN1,
  },
  submitView: {
    marginVertical: hp('1%'),
    alignItems: 'center',
    height: hp('10%'),
    marginTop: hp('2%'),
  },
  svgSubmitIcon: {
    marginTop: hp('0.8%'),
  },

  submitText: {
    marginTop: hp('1%'),
    color: Colors.WHITE,
    fontSize: hp('2%'),
    fontFamily: Fonts.regular.fontFamily,
  },
  flContainerView: {
    marginHorizontal: wp('5%'),
  },
  flcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Colors.SANDEL,
    marginHorizontal: wp('1%'),
    marginTop: hp('2%'),
    borderRadius: 5,
  },
  flcontainer1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    marginHorizontal: wp('1%'),
    marginTop: hp('2%'),
    borderRadius: 5,
  },
  flTouchable: {
    marginVertical: hp('1%'),
    alignItems: 'center',
    height: hp('15%'),
    width: wp('28%'),
    marginTop: hp('1%'),
  },
  flTitle: {
    marginTop: hp('1%'),
    color: Colors.BLACK1,
    fontSize: hp('2%'),
    fontFamily: Fonts.regular.fontFamily,
    textAlign: 'center',
    paddingHorizontal: wp('1%'),
  },
});

export default Home;
