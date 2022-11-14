import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {Fonts} from '../fonts/Fonts';
import {Icon} from 'react-native-elements';
import {SvgXml} from 'react-native-svg';
import ambulance from '../../assets/icons/ambulance.svg';
import balancesheet from '../../assets/icons/balancesheet.svg';
import dentist from '../../assets/icons/dentist.svg';
import fire from '../../assets/icons/fire.svg';
import menatlHealth from '../../assets/icons/mental-health.svg';
import outline from '../../assets/icons/Outline.svg';
import patient from '../../assets/icons/patient.svg';
import patient1 from '../../assets/icons/patient_1.svg';
import pregnant from '../../assets/icons/pregnant.svg';
import wellness from '../../assets/icons/wellness.svg';
import PageLoader from './PageLoader';
import {useDispatch, useSelector} from 'react-redux';
import {getPoliciesData, getMemberSubBenefits} from '../store/policiesReducer';
import {APP_MESSAGES, APP_DATA} from '../commonHelper/appData';
import {Colors} from '../themes/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Accordion = ({benefits, loader}) => {
  const dispatch = useDispatch();
  const {benefitName, benefitLimit, memberSubBenefits, cvMstId} = benefits;
  const {memberBenefits, routesParams} = useSelector(getPoliciesData);
  const {member, policy} = routesParams;
  const [state, setState] = useState({
    expanded: false,
  });
  const {msgaccordian} = APP_MESSAGES;
  const {APP_ICON} = APP_DATA;
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (!state.expanded) {
      dispatch(
        getMemberSubBenefits({
          policyId: policy.sgsId,
          memberId: member.meMemberId,
          parentId: cvMstId,
        }),
      );
    }

    setState({expanded: !state.expanded});
  };

  const getIconbyBenefits = (benefitName) => {
    if (
      benefitName.toLowerCase().includes(msgaccordian.amulance.toLowerCase())
    ) {
      return ambulance;
    } else if (
      benefitName.toLowerCase().includes(msgaccordian.inpatient.toLowerCase())
    ) {
      return patient;
    } else if (
      benefitName.toLowerCase().includes(msgaccordian.existing.toLowerCase())
    ) {
      return balancesheet;
    } else if (
      benefitName.toLowerCase().includes(msgaccordian.chronic.toLowerCase())
    ) {
      return wellness;
    } else if (
      benefitName.toLowerCase().includes(msgaccordian.maternity.toLowerCase())
    ) {
      return outline;
    } else if (
      benefitName.toLowerCase().includes(msgaccordian.pregnancy.toLowerCase())
    ) {
      return pregnant;
    } else if (
      benefitName.toLowerCase().includes(msgaccordian.psychiatric.toLowerCase())
    ) {
      return menatlHealth;
    } else if (
      benefitName.toLowerCase().includes(msgaccordian.dental.toLowerCase())
    ) {
      return dentist;
    } else if (
      benefitName.toLowerCase().includes(msgaccordian.out.toLowerCase())
    ) {
      return patient1;
    } else if (
      benefitName
        .toLowerCase()
        .includes(msgaccordian.repatriation.toLowerCase())
    ) {
      return fire;
    } else {
      return balancesheet;
    }
  };

  const renderFlatListItem = ({item, index}) => {
    return (
      <ScrollView>
        <View style={{marginBottom: 8}}>
          <TouchableOpacity
            style={[
              styles.childRow,
              styles.button,
              item.value ? styles.btnActive : styles.btnInActive,
              {width: wp('100%'), height: 'auto'},
            ]}>
            <Text
              style={[
                styles.font,
                styles.itemInActive,
                {marginLeft: wp('1%'), height: 'auto', width: wp('100%')},
              ]}>
              {item.benefitName}
            </Text>
            <Text
              style={[
                styles.font,
                styles.itemInActive,
                {
                  color: Colors.DARKGRAY,
                  flex: 1,
                  textAlign: 'right',
                  marginLeft: wp('10%'),
                },
              ]}>
              {item.benefitLimit}
            </Text>
          </TouchableOpacity>
          {/*  <View style={styles.childHr} /> */}
        </View>
      </ScrollView>
    );
  };
  const icon = getIconbyBenefits(benefitName);
  return (
    <View>
      <PageLoader isLoading={loader} />
      <TouchableOpacity style={styles.row}>
        <Icon
          name={state.expanded ? APP_ICON.NAME.REMOVE : APP_ICON.NAME.ADD}
          type={APP_ICON.TYPE.ION}
          size={20}
          color={Colors.DARKGRAY}
          onPress={() => toggleExpand()}
        />
        <SvgXml
          width="20"
          height="20"
          xml={icon}
          fill={Colors.ORANGE}
          style={{marginHorizontal: 10}}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Text
            style={[
              styles.title,
              {
                padding: 5,
                color: state.expanded ? Colors.DARKGRAY : Colors.LIGHTGRAY1,
              },
            ]}>
            {' '}
            {benefitName}
          </Text>
          <Text style={[styles.title, styles.benefitLimit]}>
            {' '}
            {benefitLimit}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.parentHr} />
      {state.expanded && (
        <View style={{}}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={memberSubBenefits}
            numColumns={1}
            scrollEnabled={false}
            renderItem={renderFlatListItem}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: wp('100%'),
    height: hp('10%'),
    alignItems: 'center',
    paddingLeft: wp('17%'),
    paddingRight: wp('17%'),
    fontSize: hp('2%'),
  },
  title: {
    fontSize: hp('2%'),
    fontFamily: Fonts.ui.fontFamily,
  },
  itemActive: {
    fontSize: hp('1.8%'),
    color: Colors.GREEN,
  },
  itemInActive: {
    height: 'auto',
    width: 'auto',
    flex: 1,
    flexWrap: 'nowrap',
    // flexDirection: 'column',
    justifyContent: 'flex-start',
    fontSize: hp('1.8%'),
    color: Colors.DARKGRAY,
  },
  btnActive: {
    borderColor: Colors.GREEN,
  },
  btnInActive: {
    borderColor: Colors.DARKGRAY,
  },
  row: {
    flexDirection: 'row',
    height: 'auto',
    width: 'auto',
    paddingLeft: wp('6%'),
    paddingRight: wp('9%'),
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderBottomColor: Colors.LIGHTGRAY,
    borderBottomWidth: 1,
  },
  childRow: {
    flex: 1,
    height: 'auto',
    width: 'auto',
    flexDirection: 'row',
    backgroundColor: Colors.GRAY,
  },
  parentHr: {
    height: 'auto',
    color: Colors.WHITE,
    width: wp('100%'),
  },
  childHr: {
    height: 'auto',
    width: 'auto',
    backgroundColor: Colors.LIGHTGRAY,
    width: wp('100%'),
  },
  colorActive: {
    borderColor: Colors.GREEN,
  },
  colorInActive: {
    borderColor: Colors.DARKGRAY,
  },
  benefitLimit: {
    flex: 1,
    color: Colors.BLUE,
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: wp('12%'),
  },
});

export default Accordion;
