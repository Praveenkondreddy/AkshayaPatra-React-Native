import React, {useEffect, useLayoutEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {Text, Icon, ListItem, Input} from 'react-native-elements';
import HeaderBarIcon from '../compontent/headerBarIcon';
import DashLine from '../compontent/dashLine';
import {Fonts} from '../fonts/Fonts';
import PageLoader from '../compontent/PageLoader';
import {Colors} from '../themes/Colors';
import FooterBar from '../compontent/footerBar';
import {faqs} from '../common/customData.json';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DeviceInfo from 'react-native-device-info';
const FAQs = ({navigation}) => {
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

  return (
    <View style={[styles.container]}>
      <PageLoader />
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Frequently asked questions</Text>
      </View>
      <ScrollView>
        <TouchableOpacity>
          <View>
            <Text style={styles.Questions}>
              1. How can I contact SICOM INSURANCE for my all-medical queries?
            </Text>
            <View>
              <Text style={styles.Answers}>{'\u2B24'}Membership Queries</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.AnswersSplit1}>Customer Hotline:</Text>
                <Text style={styles.AnswersSplit2}>203 8452</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.AnswersSplit1}>Email:</Text>
                <Text style={styles.AnswersSplit2}>
                  medical.underwriting@sicom.mu
                </Text>
              </View>
            </View>
            <Text style={styles.Answers}>{'\u2B24'}Claims Queries</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.AnswersSplit1}>Customer Hotline:</Text>
              <Text style={styles.AnswersSplit2}>203 8452</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.AnswersSplit1}>Email:</Text>
              <Text style={styles.AnswersSplit2}>medical.claims@sicom.mu</Text>
            </View>

            <Text style={styles.Answers}>{'\u2B24'}Admissions Queries</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.AnswersSplit1}>Customer Hotline:</Text>
              <Text style={styles.AnswersSplit2}>203 8452</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.AnswersSplit1}>Email:</Text>
              <Text style={styles.AnswersSplit2}>medical.claims@sicom.mu</Text>
            </View>
          </View>
        </TouchableOpacity>
        <DashLine />
        <TouchableOpacity>
          <View>
            <Text style={styles.Questions}>2. What is an inpatient claim?</Text>
            <Text style={styles.AnswersSubs}>
              Any justified costs/treatment prescribed by your treating doctor
              that require you to stay in any clinic/private hospital.
            </Text>
          </View>
        </TouchableOpacity>
        <DashLine />
        <TouchableOpacity>
          <View>
            <Text style={styles.Questions}>
              3. How to proceed in case of admission?
            </Text>
            <Text style={styles.AnswersUnderlined}>
              {'\u2B24'} Planned Admissions
            </Text>
            <View>
              <Text style={styles.Answers}>
                Send the information below at least 48 hours before your
                admission date on
              </Text>
              <Text style={styles.AnswersUnderlined}>
                medical.claims@sicom.mu
              </Text>
              <Text style={styles.Answers}>1. Date of admission.</Text>
              <Text style={styles.Answers}>2. Name of clinic.</Text>
              <Text style={styles.Answers}>
                3. Explanatory medical report with the treatment plan.
              </Text>
              <Text style={styles.Answers}>
                4. Estimate of costs. (If Available)
              </Text>
            </View>
            <Text style={styles.AnswersUnderlined}>
              {'\u2B24'} Emergency Admissions
            </Text>
            <Text style={styles.AnswersSubs}>
              Your next of kin or you need to contact Medical Department as soon
              as possible on 203 8452.
            </Text>
          </View>
        </TouchableOpacity>
        <DashLine />
        <TouchableOpacity>
          <View>
            <Text style={styles.Questions}>
              4. What is an outpatient claim?
            </Text>
            <Text style={styles.AnswersSubs}>
              Any costs/treatment prescribed by your treating doctor excluding
              hospitalization or day case as per the health insurance policy you
              have subscribed to.
            </Text>
          </View>
        </TouchableOpacity>
        <DashLine />
        <TouchableOpacity>
          <View>
            <Text style={styles.Questions}>
              5.How do I proceed in case of an outpatient claim?
            </Text>
            <Text style={styles.AnswersSubs}>
              You need to submit the following original documents for proper
              assessment of your medical claim:
            </Text>
            <Text style={styles.Answers}>
              {'\u2B24'}Duly filled in and signed claim form for each and every
              claim.
            </Text>
            <Text style={styles.Answers}>
              {'\u2B24'}Medical certificate specifying nature of illness.
            </Text>
            <Text style={styles.Answers}>
              {'\u2B24'}Detailed invoices/Receipts from: Doctor, pharmacy,
              optical, dental, laboratory.
            </Text>
            <Text style={styles.Answers}>
              {'\u2B24'} Optical: lenses details.
            </Text>
            <Text style={styles.Answers}>
              {'\u2B24'} Dental: notation of tooth surface, panoramic x-rays.
            </Text>
          </View>
        </TouchableOpacity>
        <DashLine />
        <View>
          <Text style={styles.Questions}>
            6. Where can I send my outpatient claim?
          </Text>
          <Text style={styles.AnswersSubs}>
            SICOM General Insurance Ltd- SICOM Building, Sir Célicourt Antelme
            Street, Port Louis or our branches
          </Text>
        </View>
        <DashLine />
      </ScrollView>

      <FlatList />
      <FooterBar />
    </View>
  );
};

const styles = StyleSheet.create({
  titleView: {
    marginLeft: wp('2%'),
    width: wp('30%'),
    fontFamily: Fonts.regular.fontFamily,
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  Questions: {
    marginLeft: wp('2%'),
    fontFamily: Fonts.regular.fontFamily,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
    width: '100%',
    marginTop: '4%',
    fontWeight: 'bold',
    color: Colors.BLUE1,
  },
  Answers: {
    marginLeft: wp('5%'),

    fontFamily: Fonts.regular.fontFamily,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
    width: '90%',
    color: Colors.BLUE1,
    justifyContent: 'center',
  },
  AnswersSubs: {
    marginLeft: wp('8%'),
    fontFamily: Fonts.regular.fontFamily,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
    width: '90%',
    color: Colors.BLUE1,
    justifyContent: 'center',
  },
  AnswersSplit1: {
    marginLeft: wp('9%'),
    fontFamily: Fonts.regular.fontFamily,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
    color: Colors.BLUE1,
  },
  AnswersSplit2: {
    marginLeft: wp('3%'),
    fontFamily: Fonts.regular.fontFamily,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
    color: Colors.BLACK,
    textDecorationLine: 'underline',
  },
  AnswersUnderlined: {
    marginLeft: wp('5%'),
    fontFamily: Fonts.regular.fontFamily,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
    width: '100%',
    color: Colors.BLUE1,
    textDecorationLine: 'underline',
  },
  faqData: {
    marginLeft: wp('1%'),
    fontFamily: Fonts.regular.fontFamily,
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2%'),
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    marginTop: DeviceInfo.isTablet() ? hp('1%') : hp('1%'),
    width: '100%',
  },
  titleView: {
    backgroundColor: Colors.BLUE1,
    marginTop: hp('2%'),
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
    // marginTop: hp('0.5%'),
    // marginHorizontal: hp('1%'),
    // marginVertical: wp('0%'),
    width: '100%',
    margin: DeviceInfo.isTablet() ? hp('0%') : hp('-1%'),
  },
  container1: {
    flexDirection: 'row',
    width: '100%',
    marginTop: hp('0.5%'),
    marginHorizontal: hp('1%'),
    marginVertical: wp('0%'),
  },
});

export default FAQs;
