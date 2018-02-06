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
import ItemTable from "../components/ItemTable";

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
    let subsubCategories = (
      <ItemTable
        styles={styles_itemtable}
        onLearnMore={item => props.onLearnMore(item)}
        items={value1.children}
      />
    );
    subCategories.push(
      <View key={i} style={styles.subCategories}>
        <Text style={styles.subCategoriesText}>
          {value1.name}
        </Text>
        <View style={styles.subCategoriesView}>{subsubCategories}</View>
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
        title: value.name
      });
    }
    this.state = {
      index: 0,
      routes: routes
    };
  }

  _handleIndexChange = index => {};

  _changeIndex = index => this.setState({ index });

  render() {
    return (
      <View style={styles.container}>
        <TabHeader
          navigationState={this.state}
          styles={styles_tabheader}
          _changeIndex={i => this._changeIndex(i)}
        />
        <Subcategory index={this.state.index} onLearnMore={item => this.props.onLearnMore(item)}/>
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
    height: Dimensions.get("window").height * 0.12,
    width: undefined,
    alignSelf: "stretch"
  },
  subCategories: {
    paddingTop: 15
  },
  subCategoriesText: {},
  subCategoriesView: {
    padding: 7,
    backgroundColor: "#fff"
  }
});

const styles_tabheader = StyleSheet.create({
  tab: {
    flex: 1,
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
    justifyContent: "space-around"
  }
});

const styles_itemtable = StyleSheet.create({
  touchablehighlight: {
    marginTop: 7,
    width: 180,
    height: 208
  },
  product: {
    flexDirection: "column",
    width: 180,
    height: 208,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center"
  },
  image: { width: 180, height: 180 },
  title: { width: 180, height: 30 },
  text: {
    fontSize: 20,
    paddingBottom: 3,
    color: "#777",
    textAlign: "center",
    fontWeight: "800"
  },
  scrollview: {
    //flex: 1
  },
  product_list: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  }
});

export default Category;
