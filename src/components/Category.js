import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableHighlight,
  Image
} from "react-native";
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view";
import categories from "../json/categories";
import TabHeader from "../components/TabHeader";

const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width
};

export const Subcategory = props => {
  let subCate = categories[props.index]["children"];
  if (!subCate) return;
  let subCategories = [];
  for (let i = 0; i < subCate.length; i++) {
    let value1 = subCate[i];
    let subsubCategories = [];
    if (value1.children) {
      for (let j = 0; j < value1.children.length; j++) {
        value2 = value1.children[j];
        console.log(value2);
      }
    }
    subCategories.push(
      <View key={i} style={styles.subCategories}>
        <Text>{JSON.parse(value1.name).CN}</Text>
        {subsubCategories}
      </View>
    );
  }
  return (
    <ScrollView style={styles.ScrollView}>
      <Image
        style={styles.Image}
        source={require("../img/daily-deal-bg.jpg")}
        resizeMode="cover"
      />
      {subCategories}
    </ScrollView>
  );
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

  _renderHeader = props => (
    <TabHeader
      {...props}
      styles={styles_tabheader}
      _changeIndex={i => this._changeIndex(i)}
    />
  );

  _handleIndexChange = index => {};

  _changeIndex = index => this.setState({ index });

  render() {
    //console.log(this.state.categories);
    // <TabViewAnimated
    //     style={styles.container}
    //     navigationState={this.state}
    //     renderScene={this._renderScene}
    //     renderHeader={this._renderHeader}
    //     onIndexChange={this._handleIndexChange}
    //     initialLayout={initialLayout}
    //   />
    return (
      <View style={styles.container}>
        <TabHeader
          navigationState={this.state}
          styles={styles_tabheader}
          _changeIndex={i => this._changeIndex(i)}
        />
        <Subcategory index={this.state.index} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  ScrollView: {
    padding: 10,
    paddingTop: 15,
    backgroundColor: "#f7f7f7"
  },
  Image: {
    height: 90,
    width: undefined,
    alignSelf: 'stretch'
  },
  subCategories: {
    paddingTop: 15,
  }
});

const styles_tabheader = StyleSheet.create({
  tab: {
    height: 46,
    width: Dimensions.get("window").width * 0.23,
    flexDirection: "column",
    justifyContent: "center"
  },
  tabActive: {
    backgroundColor: "#f7f7f7",
    borderTopWidth: 1,
    borderColor: "#eee"
  },
  tabInactive: {
    backgroundColor: "#fefefe",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "#eee"
  },
  tabText: {
    fontSize: 13,
    textAlign: "center",
    fontWeight: "500"
  },
  tabActiveText: {
    color: "red"
  },
  tabInactiveText: {
    color: "#444"
  },
  tabHeader: {
    flexDirection: "column",
    height: 34
  }
});

export default Category;
