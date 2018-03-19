import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view";
import Category from "../components/Category";
import Header from "../components/Header";
import TabHeader from "../components/TabHeader";

const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width
};

const FirstRoute = () => (
  <View style={[styles.container, { backgroundColor: "#ff4081" }]} />
);
const SecondRoute = () => (
  <View style={[styles.container, { backgroundColor: "#673ab7" }]} />
);
const ThirdRoute = () => (
  <View style={[styles.container, { backgroundColor: "#ff4081" }]} />
);
const FourthRoute = () => (
  <View style={[styles.container, { backgroundColor: "#673ab7" }]} />
);

class Comp extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  state = {
    index: 0,
    routes: [
      { key: "Category", title: "分类" },
      { key: "first", title: "第一" },
      { key: "second", title: "第二" },
      { key: "third", title: "第三" },
      { key: "fourth", title: "第四" }
    ]
  };

  onLearnMore = item => {
    this.props.navigation.navigate("SearchResult", item);
  };

  _renderScene = (route, navigator) => {
    if (route.route.key === "Category")
    <FirstRoute />;
      //return <Category onLearnMore={item => this.onLearnMore(item)} />;
    else if (route.route.key === "first") return <FirstRoute />;
    else if (route.route.key === "second") return <SecondRoute />;
    else if (route.route.key === "third") return <ThirdRoute />;
    else if (route.route.key === "fourth") return <FourthRoute />;
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
      <View style={styles.viewStyle}>
        <Header
          title=""
          icons={[]}
        />
        <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
  },
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

export default Comp;
