import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view";
import Category from "../components/Category";
import Header from "../components/Header";
import TabHeader from "../components/TabHeader";
import ProductList from "../screens/ProductList";
const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width
};

class AddProduct extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "",
    headerLeft: <Header />
  });

  state = {
    index: 0,
    routes: [
      { key: "Category", title: "分类" },
      { key: "AllProduct", title: "所有商品" },
    ]
  };

  onLearnMore = item => {
    this.props.navigation.navigate("SearchResult", item);
  };

  _renderScene = (route, navigator) => {
    if (route.route.key === "Category") return <Category onLearnMore={item => this.onLearnMore(item)}/>;
    else if (route.route.key === "AllProduct") return <ProductList />;
  };

  // _renderScene = SceneMap({
  //   Category: Category,
  //   first: FirstRoute,
  //   second: SecondRoute,
  //   third: ThirdRoute,
  //   fourth: FourthRoute
  // });

  _handleIndexChange = index => this.setState({ index });

  _changeIndex = index => this.setState({ index });

  _renderHeader = props => (
    <TabHeader
      {...props}
      styles={styles_tabheader}
      _changeIndex={i => this._changeIndex(i)}
    />
  );

  render() {
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
    backgroundColor: "#f7f7f7"
  },
  content: {
    marginTop: 34
  }
});

const styles_tabheader = StyleSheet.create({
  tab: {
    width: Dimensions.get("window").width * 0.14
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
    flexDirection: "row",
    justifyContent: "center",
    height: 34
  }
});

export default AddProduct;
