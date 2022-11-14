import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Fonts} from '../fonts/Fonts';
import {Text, Image, ListItem} from 'react-native-elements';
import HeaderBarIcon from '../compontent/headerBarIcon';
import {SvgXml} from 'react-native-svg';
import insurance from '../../assets/icons/insurance.svg';
import phone from '../../assets/icons/phone.svg';
import team from '../../assets/icons/team.svg';
import DashLine from '../compontent/dashLine';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../themes/Colors';
import FooterBar from '../compontent/footerBar';
import DeviceInfo from 'react-native-device-info';
const tipsList = [
  {
    id: 1,
    image: require('../../assets/images/child.png'),
    title: 'Vitamins & their importance',
    content:
      'Vitamins and minerals are essential nutrients because they perform hundreds of roles in the body.',
  },

  {
    id: 3,
    image: require('../../assets/images/child.png'),
    title: 'Healthy Nutrition Plan',
    content:
      'A healthy eating plan: Emphasizes vegetables, fruits, whole grains, and fat-free or low-fat dairy.',
  },
  {
    id: 4,
    image: require('../../assets/images/child.png'),
    title: 'Important Notes',
    content:
      '\u2022 Keep your contact details (including your phone number and email address) always updated with SICOM.\n \u2022 Check your insurance coverage every year for limits.\n \u2022 Purchase add-ons benefits for your personalised needs.\n \u2022 You can claim a tax deduction on SICOM health insurance premium under The Income Tax Act. \n \u2022 Vitamins & their importance as per existing text on Mobile App. \n \u2022 Healthy Nutrition Plan as per existing test on Mobile App.',
  },
];
const bulletIcon = '\u2022';
const UsefulTips = ({navigation}) => {
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
  const renderFlatListItem = ({item}) => {
    return (
      <>
        <ListItem bottomDivider={false}>
          <ListItem.Content style={styles.listContent}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={item.image}
                style={styles.image}
                PlaceholderContent={<ActivityIndicator />}
              />
              <ScrollView style={styles.viewContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                {item.content.includes('\u2022') ? (
                  <ListItem bottomDivider={false}>
                    <ListItem.Content style={styles.topNone}>
                      <View>
                        <Text>{bulletIcon}</Text>
                        <Text style={styles.bulletStyle}>
                          {
                            'Keep your contact details (including your phone number and email address) always updated with SICOM.'
                          }
                        </Text>
                      </View>
                      <View>
                        <Text>{bulletIcon}</Text>
                        <Text style={styles.bulletStyle}>
                          {
                            'Check your insurance coverage every year for limits.'
                          }
                        </Text>
                      </View>
                      <View>
                        <Text>{bulletIcon}</Text>
                        <Text style={styles.bulletStyle}>
                          {
                            'Purchase add-ons benefits for your personalised needs.'
                          }
                        </Text>
                      </View>
                      <View>
                        <Text>{bulletIcon}</Text>
                        <Text style={styles.bulletStyle}>
                          {
                            'You can claim a tax deduction on SICOM health insurance premium under The Income Tax Act.'
                          }
                        </Text>
                      </View>
                    </ListItem.Content>
                  </ListItem>
                ) : (
                  <Text style={styles.itemContent}>{item.content}</Text>
                )}
              </ScrollView>
            </View>
            <DashLine />
          </ListItem.Content>

          <ListItem.Chevron color={Colors.WHITE} />
        </ListItem>
      </>
    );
  };
  return (
    <View style={[styles.viewConatiner]}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>USEFUL TIPS</Text>
      </View>

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={tipsList}
        renderItem={renderFlatListItem}
      />
      <FooterBar />
    </View>
  );
};

const styles = StyleSheet.create({
  viewConatiner: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    marginTop: DeviceInfo.isTablet() ? hp('4%') : hp('4%'),
  },
  titleView: {
    backgroundColor: Colors.BLUE1,
    marginTop: hp('-1%'),
    height: hp('6%'),
    justifyContent: 'center',
  },
  titleText: {
    color: Colors.WHITE,
    fontFamily: Fonts.regular.fontFamily,
    marginLeft: wp('5%'),
    fontSize: hp('2%'),
  },

  listContent: {
    margin: hp('-2%'),
  },
  image: {
    width: wp('20%'),
    height: hp('11%'),
    borderColor: Colors.DARKGRAY,
    borderWidth: wp('0.3%'),
    marginLeft: wp('2%'),
    marginTop: hp('2%'),
  },
  viewContainer: {
    flexDirection: 'column',
    marginLeft: wp('2%'),
    marginTop: hp('1.5%'),
    width: wp('75%'),
  },
  itemTitle: {
    color: Colors.BLUE5,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2.3%'),
  },
  itemContent: {
    color: Colors.LIGHTBLACK,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('1.8%'),
  },
  bulletStyle: {
    justifyContent: 'space-between',
    flexDirection: 'column-reverse',
    alignSelf: 'flex-start',
    position: 'relative',
    left: '5%',
    marginTop: '-7%',
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('1.8%'),
  },
  topNone: {
    marginTop: '-7%',
    marginLeft: '-6%',
  },
});

export default UsefulTips;
