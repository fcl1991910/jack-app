import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableHighlight,
  Image,
  Platform
} from "react-native";
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view";
import categories from "../json/categories";
import TabHeader from "../components/TabHeader";
import ItemTable from "../components/ItemTable";
import Header from "../components/Header";
import { connect } from "react-redux";
import * as func from "../func/func";
import Footer from "../components/Footer";

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
          no_item_message="暂无分类"
          styles={styles_itemtable}
          onLearnMore={item => props.onLearnMore(item)}
          items={value1.children}
          AddCategory={props.AddCategory}
          selectedCategory={props.selectedCategory}
        />
      );
      subCategories.push(
        <View key={i} style={styles.subCategories}>
          <Text style={styles.subCategoriesText}>{value1.name}</Text>
          <View style={styles.subCategoriesView}>{subsubCategories}</View>
        </View>
      );
    }
  else
    subCategories = (
      <View style={styles.subCategories}>
        <Text style={styles.subCategoriesText}>暂无</Text>
      </View>
    );
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
      AddCategory: this.props.navigation.state.params ? true : false,
      selectedCategory: this.props.navigation.state.params,
      index: 0,
      routes: [],
      data: []
    };
  }

  componentWillMount() {
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
        console.log("666", error.response.data.message);
      });
  }

  onBack = () => {
    this.props.navigation.goBack();
  };

  onHelp = () => {
    console.log("onHelp");
  };

  onSearch = item => {
    if (this.state.AddCategory) {
      if (
        func.myIncludes(this.state.selectedCategory, {
          name: item.name,
          id: item.id
        })
      )
        this.setState(prevState => {
          return {
            selectedCategory: prevState.selectedCategory.filter(function(
              value
            ) {
              return item.id !== value.id;
            })
          };
        });
      else
        this.setState(prevState => {
          return {
            selectedCategory: prevState.selectedCategory.concat({
              name: item.name,
              id: item.id
            })
          };
        });
    } else this.props.navigation.navigate("SearchResult", item.name?item.name:item);
  };

  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  _handleIndexChange = index => {};

  _changeIndex = index => this.setState({ index });

  onClickFooter = () => {
    this.props.navigation.state.params.onGoBack(this.state.selectedCategory);
    this.props.navigation.goBack();
  };

  render() {
    let footer = [];
    let header = [];
    if (this.state.AddCategory) {
      footer = <Footer onSubmit={() => this.onClickFooter()} />;
      header = <Header onBack={() => this.onBack()} icons={[]} />;
    } else
      header = (
        <Header
          onBack={() => this.onBack()}
          search={value => this.onSearch(value)}
          icons={[{ icon: "help", onClick: () => this.onHelp() }]}
        />
      );

    return (
      <View style={styles.container}>
        {header}
        <View
          style={[
            styles.categoryContainer,
            this.state.AddCategory
              ? {
                  marginBottom:
                    Platform.OS === "ios" &&
                    Dimensions.get("window").height === 812
                      ? 74
                      : 50
                }
              : {}
          ]}
        >
          <TabHeader
            navigationState={this.state}
            styles={styles_tabheader}
            _changeIndex={i => this._changeIndex(i)}
          />
          <Subcategory
            index={this.state.index}
            data={this.state.data}
            onLearnMore={item => this.onSearch(item)}
            AddCategory={this.state.AddCategory}
            selectedCategory={this.state.selectedCategory}
          />
        </View>
        {footer}
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
    width: 80,
    height: 95,
    justifyContent: "space-between",
    alignItems: "center"
  },
  product: {
    flexDirection: "column",
    width: 64,
    height: 94,
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
  messageText: {},
  selected: {
    borderWidth: 2,
    borderColor: "red"
  }
});

//export default Category;
export default connect(mapStateToProps, mapDispatchToProps)(Category);
