import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableHighlight
} from "react-native";
import ProductSimple from "../components/ProductSimple";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { connect } from "react-redux";
import * as func from "../func/func";
import Swiper from "react-native-swiper";

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({});

class Product extends Component {
  constructor() {
    super();
    this.state = {
      fullscreen: false,
      id: "",
      name: "",
      advantages: "",
      brand: "",
      categories: [],
      creator_type: [],
      description: [],
      images: [],
      instruction: [],
      tags: [],
      subs: []
    };
  }

  componentWillMount() {
    //item: this.props.navigation.state.params
    func
      .callApi(
        "get",
        "api/product/" + this.props.navigation.state.params.id,
        {},
        this.props.access_token
      )
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          advantages: response.data.advantages,
          brand: response.data.brand,
          categories: JSON.parse(response.data.categories),
          creator_type: response.data.creator_type,
          description: JSON.parse(response.data.description),
          images: JSON.parse(response.data.images),
          instruction: JSON.parse(response.data.instruction),
          tags: JSON.parse(response.data.tags),
          subs: response.data.subs
        });
      })
      .catch(error => {
        console.log("555", error.response.data.message);
      });
  }

  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  onBack = () => {
    this.props.navigation.goBack();
  };

  renderPagination = (index, total, context) => {
    return (
      <View style={this.state.fullscreen?styles.paginationStyleFull:styles.paginationStyle}>
        <Text style={this.state.fullscreen?styles.paginationTextFull:styles.paginationText}>
          {index + 1}/{total}
        </Text>
      </View>
    );
  };

  toggleImage = () => {
    this.setState(prevState => {
      return { fullscreen: !prevState.fullscreen };
    });
  };

  render() {
    let images = [];
    for (let i = 0; i < this.state.images.length; i++) {
      let value = this.state.images[i];
      images.push(
        <TouchableHighlight key={i} onPress={() => this.toggleImage()}>
          <Image
            style={styles.wrapperContainer}
            source={{ uri: "http://wangcai.com.au/" + value.path }}
          />
        </TouchableHighlight>
      );
    }
    return (
      <View style={styles.container}>
        <Header
          title={this.props.navigation.state.params.name}
          onBack={() => this.onBack()}
          icons={[{ icon: "help", onClick: () => this.onHelp() }]}
        />
        <View style={this.state.fullscreen?styles.wrapperContainerFull:{}}>
          <View style={styles.wrapperContainer}>
          <Swiper
            style={styles.wrapper}
            showsButtons={false}
            loop={false}
            renderPagination={this.renderPagination}
            key={this.state.images.length}
          >
            {images}
          </Swiper>
          </View>
        </View>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapperContainerFull: {
    zIndex:5,
    position:"absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width
  },
  wrapper: {
    height: Dimensions.get("window").width},
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  },
  paginationStyle: {
    position: "absolute",
    backgroundColor: "#ddd",
    borderColor: "#ddd",
    borderRadius: 15,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    bottom: 10,
    right: 10
  },
  paginationStyleFull: {
    position: "absolute",
    top: -Dimensions.get("window").height/6,
    left: Dimensions.get("window").width/2-8,
  },paginationTextFull:{
    
    fontSize: 17
  },
  paginationText: {
    color: "white",
    fontSize: 15
  }
});

//export default Product;
export default connect(mapStateToProps, mapDispatchToProps)(Product);
