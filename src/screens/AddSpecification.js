import React, { Component } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  Platform
} from "react-native";
import { Icon } from "react-native-elements";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { connect } from "react-redux";
import * as func from "../func/func";
var t = require("tcomb-form-native");
var Form = t.form.Form;
import AddedTag from "../components/AddedTag";
import { LOGIN_ATEMPT, LOGIN_DONE, LOGIN_FAIL } from "../constants/actionTypes";

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({});

var Amount = t.refinement(t.Number, function(n) {
  return n >= 0 && Number.isInteger(n);
});

var Price = t.refinement(t.Number, function(n) {
  return n >= 0;
});

class AddSpecification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      categories: [],
      specifications: []
    };
  }

  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  componentDidMount() {}

  onBack = () => {
    this.props.navigation.goBack();
  };

  onPress = () => {
    console.log(this.refs.form.getValue());
  };

  getType = () => {
    return t.struct({
      specifications: t.list(
        t.struct({
          name: t.String,
          amount: Amount,
          price: Price
        })
      )
    });
  };

  getOptions = () => {
    return {
      i18n: {
        optional: " (可选)",
        required: "",
        add: "添加商品规格", // add button
        remove: "✘", // remove button
        up: "↑", // move up button
        down: "↓" // move down button
      },
      fields: {
        specifications: {
          auto: 'placeholders',
          item: {
            label: "规格",
            fields: {
              name: {
                label: "规格名"
              },
              amount: {
                label: "数量"
              },
              price: {
                label: "预设价格"
              },
            }
          }
        }
      }
    };
  };

  onClickFooter = () => {
    var value = this.refs.form.getValue();
    console.log("onClickFooter:", this.props.navigation.state.params);
    if (value) {
      this.props.navigation.state.params.onGoBack(value.specifications);
      this.props.navigation.goBack();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          onBack={() => this.onBack()}
          title="添加自定义产品规格"
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
                value={{ specifications: this.props.navigation.state.params.specifications }}
              />
            </View>
          </ScrollView>
        </View>
        <Footer onSubmit={() => this.onClickFooter()} text={"提交商品规格"} />
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
    backgroundColor: "#ffffff",
    marginBottom:
      Platform.OS === "ios" && Dimensions.get("window").height === 812 ? 74 : 50
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
  }
});

//export default AddProduct;
export default connect(mapStateToProps, mapDispatchToProps)(AddSpecification);
