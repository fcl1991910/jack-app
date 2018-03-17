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
import { connect } from "react-redux";
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view";
import categories from "../json/categories";
import TabHeader from "../components/TabHeader";
import ItemTable from "../components/ItemTable";
import Header from "../components/Header";
import * as func from "../func/func";

const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width
};

export const Subcategory = props => {
  let subCate = props.data[props.index];
  if (!subCate) return <View />;
  let subCategories = [];
  if (subCate.children)
    for (let i = 0; i < subCate.children.length; i++) {
      let value1 = subCate.children[i];
      let subsubCategories = (
        <ItemTable
          styles={styles_itemtable}
          onLearnMore={item => props.onLearnMore(item)}
          items={value1.children}
        />
      );
      subCategories.push(
        <View key={i} style={styles.subCategories}>
          <Text style={styles.subCategoriesText}>{value1.name}</Text>
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

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({});
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [],
      data: []
    };
  }

  componentWillMount() {
    console.log("Called api/category");
    func
      .callApi("get", "api/category", {}, this.props.access_token)
      .then(response => {
        let routes = [];
        for (let i = 0; i < response.data.length; i++) {
          value = response.data[i];
          routes.push({
            index: i,
            key: value.id.toString(),
            title: value.name
          });
        }
        this.setState({
          routes: routes,
          data: response.data
        });
      })
      .catch(error => {
        console.log("555", error.response.data.message);
      });
  }

  onBack = () => {
    this.props.navigation.goBack();
  };

  onHelp = () => {
    console.log("onHelp");
  };

  onSearch = searchKey => {
    this.props.navigation.navigate("SearchResult", searchKey);
  };

  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  _handleIndexChange = index => {};

  _changeIndex = index => this.setState({ index });

  render() {
    return (
      <View style={styles.container}>
        <Header
          onBack={() => this.onBack()}
          search={value => this.onSearch(value)}
          icons={[{ icon: "help", onClick: () => this.onHelp() }]}
        />
        <View style={styles.categoryContainer}>
          <TabHeader
            navigationState={this.state}
            styles={styles_tabheader}
            _changeIndex={i => this._changeIndex(i)}
          />
          <Subcategory
            index={this.state.index}
            data={this.state.data}
            onLearnMore={item => this.onSearch(item.name)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  categoryContainer: {
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
    paddingTop: 18
  },
  subCategoriesText: {
    fontSize: 12,
    color: "#444",
    fontWeight: "600"
  },
  subCategoriesView: {
    padding: 7,
    marginTop: 7,
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
  scrollview: {
    //flex: 1
  },
  product_list: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  touchablehighlight: {
    marginTop: 7,
    width: 75,
    height: 90,
    justifyContent: "space-between",
    alignItems: "center"
  },
  product: {
    flexDirection: "column",
    width: 60,
    height: 66,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center"
  },
  image: { width: 60, height: 60 },
  title: { width: 60, height: 30 },
  text: {
    fontSize: 12,
    paddingBottom: 1,
    color: "#666",
    textAlign: "center",
    fontWeight: "400"
  },
});

//export default Category;
export default connect(mapStateToProps, mapDispatchToProps)(Category);
