import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view";
import Category from "../components/Category";
import Header from "../components/Header";
import TabHeader from "../components/TabHeader";
import ProductList from "../screens/ProductList";
import SearchResult from "../screens/SearchResult";

const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width
};

class AddProduct extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title:"添加商品"
  });

  state = {
    index: 0,
    routes: [
      { key: "Category", title: "分类" },
      { key: "SearchResult", title: "搜索商品" },
    ]
  };

  onLearnMore = item => {
    this.props.navigation.navigate("SearchResult", item);
  };

  _renderScene = (route, navigator) => {
    if (route.route.key === "Category") return <Category onLearnMore={item => this.onLearnMore(item)}/>;
    else if (route.route.key === "SearchResult") return <SearchResult />;
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

export default AddProduct;
