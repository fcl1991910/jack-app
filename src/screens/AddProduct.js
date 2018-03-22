import React, { Component } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { Icon } from "react-native-elements";
import Header from "../components/Header";
import { connect } from "react-redux";
import * as func from "../func/func";
var t = require("tcomb-form-native");
var Form = t.form.Form;
import AddedTag from "../components/AddedTag";
import { LOGIN_ATEMPT, LOGIN_DONE, LOGIN_FAIL } from "../constants/actionTypes";

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onGetAccessToken: (username, password) => {
    dispatch({
      type: LOGIN_ATEMPT
    });
    func
      .callApi("post", "oauth/token", {
        grant_type: "password",
        client_id: "2",
        client_secret: "0xySnTQxUbF5xmRUiBKvPQ4Sy8Wnkh8D9FMVrrPN",
        username: username,
        password: password
      })
      .then(response => {
        let payload = response.data;
        payload["username"] = username;
        dispatch({
          type: LOGIN_DONE,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: LOGIN_FAIL,
          payload: error.response.data.message
        });
      });
  }
});
class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      categories: [],
      specifications: [
        { name: "A2铂金牛奶粉一段200克装", amount: 5, price: 11.5 },
        { name: "A2铂金牛奶粉一段400克装", amount: 11, price: 19.5 },
        { name: "A2铂金牛奶粉一段900克装", amount: 2, price: 40.5 }
      ]
    };
  }

  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  componentDidMount() {
    this.props.onGetAccessToken("jack@gmail.com", "11111111");
    //this.refs.form.getComponent("name").refs.input.focus();
  }

  onChange = (value) => {
    this.setState({
      value
    });
  }

  onBack = () => {};

  onPress = () => {
    console.log(this.refs.form.getValue());
  };

  getType = () => {
    return t.struct({
      name: t.String
      // tags: t.String,
      // advantages: t.String,
      // subs: t.String,
    });
  };

  getOptions = () => {
    return {
      i18n: {
        optional: " (可选)",
        required: "",
        add: "添加", // add button
        remove: "✘", // remove button
        up: "↑", // move up button
        down: "↓" // move down button
      },
      fields: {
        name: {
          label: "商品名",
          placeholder: "输入商品名",
          error: "商品名不可用",
          maxLength: 15,
          autoCapitalize: "none"
        }
      }
    };
  };

  onAddSpecificationBack = value => {
    this.setState({
      specifications: value
    });
  };

  addSpecification = () => {
    let params = {
      specifications: this.state.specifications,
      onGoBack: this.onAddSpecificationBack
    };
    this.props.navigation.navigate("AddSpecification", params);
  };

  onAddCatogoryBack = value => {
    this.setState({
      categories: value
    });
  };

  addCatogory = () => {
    let params = this.state.categories;
    params.onGoBack = this.onAddCatogoryBack;
    this.props.navigation.navigate("Category", params);
  };

  clearCategory = value => {
    if (func.myIncludes(this.state.categories, value))
      this.setState(prevState => {
        return {
          categories: prevState.categories.filter(function(item) {
            return item.id !== value.id;
          })
        };
      });
  };

  render() {
    let specifications = [];
    if (this.state.specifications.length > 0) {
      for (let i = 0; i < this.state.specifications.length; i++) {
        let value = this.state.specifications[i];
        specifications.push(
          <View style={styles.specifications} key={i}>
            <AddedTag
              tag={
                value.name + " | ￥" + value.price + " | " + value.amount + "个"
              }
            />
          </View>
        );
      }
    } else
      selected_categories = (
        <Text style={styles.selectedCategoriesText}>
          点击修改按钮添加商品规格
        </Text>
      );
    let selected_categories = [];
    if (this.state.categories.length > 0) {
      for (let i = 0; i < this.state.categories.length; i++) {
        let value = this.state.categories[i];
        selected_categories.push(
          <View style={styles.selectedCategories} key={i}>
            <AddedTag
              id={value.id}
              tag={value.name}
              onClear={value => this.clearCategory(value)}
            />
          </View>
        );
      }
    } else
      selected_categories = (
        <Text style={styles.selectedCategoriesText}>点击加号添加商品</Text>
      );
    return (
      <View style={styles.container}>
        <Header
          onBack={() => this.onBack()}
          title="添加自定义产品"
          icons={[{ icon: "help", onClick: () => this.onHelp() }]}
        />
        <View style={styles.bodyContainer}>
          <View
            style={[styles.loadingContainer, false ? {} : { display: "none" }]}
          >
            <ActivityIndicator
              animating={false ? true : false}
              color="#77f"
              size="small"
            />
          </View>
          <ScrollView style={styles.scrollContainer}>
            <View>
              <Form
                ref="form"
                onChange={this.onChange}
                type={this.getType()}
                options={this.getOptions()}
                value={this.state.value}
              />
            </View>
            <View style={styles.categoryContainer}>
              <View style={styles.categoryHeader}>
                <View style={styles.categoryTitle}>
                  <Text style={styles.categoryTitleText}>
                    商品规格(至少添加一个)
                  </Text>
                </View>
                <TouchableHighlight onPress={() => this.addSpecification()}>
                  <View style={styles.editContainer}>
                    <Text style={styles.editText}>修改</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.specificationsContainer}>
                {specifications}
              </View>
              <View />
            </View>
            <View style={styles.categoryContainer}>
              <View style={styles.categoryHeader}>
                <View style={styles.categoryTitle}>
                  <Text style={styles.categoryTitleText}>分类(可选)</Text>
                </View>
                <TouchableHighlight onPress={() => this.addCatogory()}>
                  <View style={styles.addContainer}>
                    <Icon name="add" />
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.selectedCategoriesContainer}>
                {selected_categories}
              </View>
              <View />
            </View>
            <TouchableHighlight
              style={styles.button}
              onPress={this.onPress}
              underlayColor="#99d9f4"
            >
              <Text style={styles.buttonText}>提交</Text>
            </TouchableHighlight>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bodyContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff"
  },
  loadingContainer: {
    top: 0,
    zIndex: 5,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.5)",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    alignItems: "center"
  },
  loading: {},
  scrollContainer: {
    shadowColor: "#000",
    shadowOpacity: 0.95,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center"
  },
  button: {
    marginTop: 20,
    height: 36,
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  categoryContainer: {},
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 45
  },
  categoryTitle: {},
  categoryTitleText: {
    fontSize: 18,
    fontWeight: "400"
  },
  addContainer: {},
  specificationsContainer: {
    alignItems: "flex-start"
  },
  specifications: {
    marginBottom: 3
  },
  editContainer:{
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00BFFF",
    borderColor: "#00BFFF",
    borderRadius: 3,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  editText: {
    color: "white",
    fontSize:15,
  },
  selectedCategoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },

  selectedCategories: {
    marginRight: 7,
    marginBottom: 3
  },
  selectedCategoriesText: {}
});

//export default AddProduct;
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
