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
  getReferalData,
  updateReferalData,
  resetStateData,
  getRelationShipData,
} from '../store/referaContactReducer';

import {Colors} from '../themes/Colors';
class FlatListWithSearchRelationShip extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      search: '',
    };
  }

  componentDidMount() {
    this.runSideEffect();
    const {relation} = this.props;
    this.setState({
      ...this.state,
      data: relation.relationShipsList,
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
    console.log('data' + JSON.stringify(data));
    const {relation, updateReferalData, navigation} = this.props;
    updateReferalData('relation', 'form', {
      ...relation.form,
      relationship: data,
    });
    updateReferalData('relation', 'errorMsg', {
      ...relation.errorMsg,
      relationship: null,
    });
    navigation.goBack();
  };

  renderHeader = () => {
    const {search} = this.state;
    return (
      <SearchBar
        placeholder="Search Here RelationShip"
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
    const {relation} = this.props;
    const newData = relation.relationShipsList.filter((item) => {
      if (item) {
        const itemData = `${item.description.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      }
      return null;
    });

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
  relation: state.referal.relation,
});
const mapDispatchToProps = () => {
  return {
    getReferalData,
    updateReferalData,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(FlatListWithSearchRelationShip);

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
