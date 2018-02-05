import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableHighlight
} from "react-native";
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view";
import categories from "../json/categories";
import TabHeader from "../components/TabHeader";

const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width
};

export const Subcategory = props => {
  //console.log('------------',props.route.index,'~~~~~~~~~~');
  return <View style={[styles.container, { backgroundColor: "#ff8" }]} />;
};

class Category extends Component {
  constructor(props) {
    super(props);
    let routes = [];
    for (let i = 0; i < categories.length; i++) {
      value = categories[i];
      routes.push({
        index: i,
        key: value.id.toString(),
        title: JSON.parse(value.name).CN
      });
    }
    this.state = {
      index: 0,
      routes: routes
    };
  }

  _renderScene = (route, navigator) => {
    //console.log('----------------------------------',route);
    return (
      <Subcategory
        key={route.route.key}
        navigator={navigator}
        route={route.route}
      />
    );
  };

  _renderHeader = props => <TabHeader {...props} styles={styles_tabheader} _changeIndex={(i)=>this._changeIndex(i)}/>;

  _handleIndexChange = index => {};

  _changeIndex = index => this.setState({ index });

  render() {
    //console.log(this.state.categories);
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  }
});

const styles_tabheader = StyleSheet.create({
  tab: {
    height: 50,
    width: Dimensions.get("window").width * 0.2
  },
  tabActive: {
    borderBottomWidth: 1.5,
    borderColor: "red"
  },
  tabInactive: {},
  tabText: {
    fontSize: 15,
    padding: 8,
    textAlign: "center",
    fontWeight: "500"
  },
  tabActiveText: {
    color: "red"
  },
  tabInactiveText: {
    color: "#666"
  },
  tabHeader: {
    flexDirection: "column",
    height: 34
  },
});

export default Category;
