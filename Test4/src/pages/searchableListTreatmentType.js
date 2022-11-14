import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from 'react-native';

import {SearchBar, Icon} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import HeaderBarIcon from '../compontent/headerBarIcon';
import {Fonts} from '../fonts/Fonts';
import {
  getNewCliamData,
  updateNewClaimsDetails,
  getTreatmentTypeData,
} from '../store/newClaimReducer';

import {Colors} from '../themes/Colors';
class FlatListWithSearchTreatmentType extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      search: '',
    };
  }

  componentDidMount() {
    this.runSideEffect();
    const {claims} = this.props;
    this.setState({
      ...this.state,
      // data: claims.claimReasonsList,
      data: claims.treatmentTypes,
    });
  }
  runSideEffect() {
    const {navigation} = this.props;
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBarIcon
          type="ion"
          iconName="arrow-back"
          onClick={this.action}
          goToHome={true}
        />
      ),

      headerTitle: () => null,
      headerStyle: {},
    });
  }
  action = (goToHome) => {
    const {navigation} = this.props;
    navigation.goBack();
  };
  showItem = (data) => {
    const {claims, updateNewClaimsDetails, navigation} = this.props;
    updateNewClaimsDetails('claims', 'form', {
      ...claims.form,
      treatmentType: data,
    });
    updateNewClaimsDetails('claims', 'errorMsg', {
      ...claims.errorMsg,
      treatmentType: null,
    });
    navigation.goBack();
  };

  renderHeader = () => {
    const {search} = this.state;
    return (
      <SearchBar
        placeholder="Search Here"
        round
        onChangeText={(text) => this.searchAction(text)}
        autoCorrect={false}
        value={search}
        showLoading={true}
        underlineColorAndroid
        containerStyle={{
          backgroundColor: Colors.WHITE,
          borderTopColor: Colors.WHITE,
          marginTop: hp('1%'),
        }}
        inputContainerStyle={{
          backgroundColor: Colors.WHITE,
          borderTopColor: Colors.WHITE,
          height: hp('6%'),
        }}
        inputStyle={{fontFamily: Fonts.regular.fontFamily, fontSize: hp('2%')}}
        leftIconContainerStyle={{fontSize: hp('2%')}}
        color={Colors.BLACK}
        searchIcon={() => (
          <Icon name="search-sharp" type="ionicon" size={hp('3%')} />
        )}
      />
    );
  };

  searchAction = (text) => {
    const {claims} = this.props;
    const newData = claims.treatmentTypes.filter((item) => 
    item.description.toUpperCase().trim().includes(text.toUpperCase().trim()));

    this.setState({
      data: newData,
      search: text,
    });
  };

  renderItem = (item) => {
    return (
      <View key={item.id} style={styles.item}>
        <TouchableOpacity
          onPress={() => this.showItem(item)}
          style={{width: wp('100%')}}>
          <Text style={styles.itemName}>{item.description}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => this.renderItem(item)}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={this.renderHeader}></FlatList>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => ({
  claims: state.newClaims.claims,
});
const mapDispatchToProps = () => {
  return {
    getNewCliamData,
    updateNewClaimsDetails,
    getTreatmentTypeData,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(FlatListWithSearchTreatmentType);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    padding: hp('0.5%'),
  },
  item: {
    padding: hp('1.2%'),
    borderWidth: wp('0.5%'),
    borderRadius: 5,
    borderColor: Colors.GREEN2,
    marginBottom: hp('1%'),
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2.5%'),
  },
  itemName: {
    fontFamily: Fonts.regular.fontFamily,
    fontSize: hp('2.2%'),
  },
});
