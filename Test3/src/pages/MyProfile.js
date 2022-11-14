import React, {useLayoutEffect, useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import HeaderBarIcon from '../compontent/headerBarIcon';
import {getLogginData} from '../store/loginReducer';
import {Colors} from '../themes/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native';
import {apiGetMemberProfileData, apiSignIn} from '../api/apiHelper';
import {Fonts} from '../fonts/Fonts';
import {useFocusEffect} from '@react-navigation/native';
import {getMemberData} from '../store/signupReducer';

const MyProfile = ({navigation}) => {
  const {data} = useSelector(getLogginData);
  const {memberProfileData} = useSelector(getMemberData);
  const [passwordIcon, setPasswordIcon] = useState(true);
  const timestemp = new Date(memberProfileData.dobDate);
  const t = new Date(memberProfileData.dobDate);
  const formatted =
    ('0' + t.getDate()).slice(-2) +
    '/' +
    ('0' + t.getMonth() + 1).slice(-2) +
    '/' +
    t.getFullYear();

  useFocusEffect(useCallback(() => {}, []));

  useLayoutEffect(() => {
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
  var icon =
    memberProfileData.gender === 'M'
      ? require('../../assets/images/male.png')
      : memberProfileData.gender === 'F'
      ? require('../../assets/images/female.png')
      : require('../../assets/images/child.png');
  return (
    <View style={styles.container}>
      {/*  <View style={styles.header}></View> */}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[Colors.GRADIENT, Colors.GRADIENT1]}
        style={
          ([StyleSheet.absoluteFill, styles.linearGradient],
          {height: 50, width: '100%'})
        }></LinearGradient>
      <Image style={styles.avatar} source={icon} />

      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{memberProfileData.memberName}</Text>
          <View style={{width: '100%', height: '90%', marginLeft: 0}}>
            <ScrollView>
              <View style={styles.container}>
                <Input
                  label="MemberId"
                  value={memberProfileData.memberId}
                  // inputContainerStyle={{ borderBottomColor: 'rgba(0, 0, 0, 0)' }}
                  disabled
                  leftIcon={
                    <Icon
                      name="link"
                      color={Colors.GRADIENT}
                      type="SimpleLineIcons"
                    />
                  }
                />

                <Input
                  label="DOB"
                  value={memberProfileData.dobDate}
                  // inputContainerStyle={{ borderBottomColor: 'rgba(0, 0, 0, 0)' }}
                  disabled
                  leftIcon={
                    <Icon
                      name="link"
                      color={Colors.GRADIENT}
                      type="SimpleLineIcons"
                    />
                  }
                />
                <Input
                  label="ID Number"
                  value={memberProfileData.nationalId}
                  // inputContainerStyle={{ borderBottomColor: 'rgba(0, 0, 0, 0)' ,marginTop:hp('1%')}}

                  disabled
                  leftIcon={
                    <Icon
                      name="link"
                      color={Colors.GRADIENT}
                      type="SimpleLineIcons"
                    />
                  }
                />
                <Input
                  label="Mobile Number"
                  value={memberProfileData.mobileNo}
                  // inputContainerStyle={{ borderBottomColor: 'rgba(0, 0, 0, 0)' }}

                  disabled
                  leftIcon={
                    <Icon
                      name="link"
                      color={Colors.GRADIENT}
                      type="SimpleLineIcons"
                    />
                  }
                />
                <Input
                  label="Bank"
                  value={memberProfileData.bank}
                  // inputContainerStyle={{ borderBottomColor: 'rgba(0, 0, 0, 0)' }}

                  disabled
                  leftIcon={
                    <Icon
                      name="link"
                      color={Colors.GRADIENT}
                      type="SimpleLineIcons"
                    />
                  }
                />
                <Input
                  label="Bank Account Number"
                  value={memberProfileData.accNo}
                  // inputContainerStyle={{ borderBottomColor: 'rgba(0, 0, 0, 0)' }}

                  disabled
                  secureTextEntry={passwordIcon}
                  rightIcon={
                    <Icon
                      name={passwordIcon ? 'eye-off' : 'eye'}
                      type="material-community"
                      iconStyle={styles.inputRightIcon}
                      onPress={() => setPasswordIcon(!passwordIcon)}
                    />
                  }
                />
                <Input
                  label="NIC"
                  value={memberProfileData.nationality}
                  // inputContainerStyle={{ borderBottomColor: 'rgba(0, 0, 0, 0)' }}

                  disabled
                  leftIcon={
                    <Icon
                      name="link"
                      color={Colors.GRADIENT}
                      type="SimpleLineIcons"
                    />
                  }
                />
                <Input
                  label="EMail"
                  value={memberProfileData.emailId}
                  // inputContainerStyle={{ borderBottomColor: 'rgba(0, 0, 0, 0)' }}
                  disabled
                  leftIcon={
                    <Icon
                      name="link"
                      color={Colors.GRADIENT}
                      type="SimpleLineIcons"
                    />
                  }
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  /* container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
   */
  viewContainer8: {
    marginLeft: wp('3%'),
  },
  header: {
    backgroundColor: '#00BFFF',
    // height: 100,
  },
  claimsTextTitle: {
    color: Colors.LIGHTGRAY1,
    fontSize: hp('2%'),
    fontFamily: Fonts.light.fontFamily,
  },
  claimsTextData: {
    color: Colors.BLACK,
    fontSize: hp('2%'),
    fontFamily: Fonts.regular.fontFamily,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 5,
  },
  name: {
    fontSize: 20,
    color: '#FFFFFF',
    // fontWeight: '600',
  },
  body: {
    marginTop: 50,
  },
  container: {
    marginTop: hp('0.5%'),
    marginHorizontal: hp('1%'),
    marginVertical: wp('0%'),
  },
  parentContainer: {flex: 1, backgroundColor: Colors.WHITE},
  listContent: {
    margin: 0,
  },
  bodyContent: {
    /*  flex: 1, */
    alignItems: 'center',
    padding: 0,
  },
  name: {
    color: '#696969',
    fontSize: 20,
  },
  info: {},
  viewContainer3: {
    flexDirection: 'column',
    marginVertical: hp('1%'),
  },
});

export default MyProfile;
