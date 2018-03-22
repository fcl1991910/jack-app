import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableHighlight,
  ScrollView,
  Platform
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
          ingredients: JSON.parse(response.data.ingredients),
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
      <View
        style={
          this.state.fullscreen
            ? styles.paginationStyleFull
            : styles.paginationStyle
        }
      >
        <Text
          style={
            this.state.fullscreen
              ? styles.paginationTextFull
              : styles.paginationText
          }
        >
          {index + 1}/{total}
        </Text>
      </View>
    );
  };

  toggleImage = () => {
    // this.setState(prevState => {
    //   return { fullscreen: !prevState.fullscreen };
    // });
  };

  render() {
    let images = [];
    let params = {
      商品编号: this.state.id,
      商品品牌: this.state.brand,
      商品分类: this.state.categories,
      商品益处: this.state.advantages
    };
    let parameters = [];
    let i = 0;
    for (var key in params) {
      parameters.push(
        <View key={i++} style={styles.parameter}>
          <View style={styles.paramKey}>
            <Text style={styles.paramKeyText}>{key}</Text>
          </View>
          <View style={styles.paramVal}>
            <Text style={styles.paramValText}>{params[key]}</Text>
          </View>
        </View>
      );
    }
    let tags = [];
    for (let i = 0; i < this.state.tags.length; i++) {
      let value = this.state.tags[i];
      tags.push(
        <View key={i}>
          <TouchableHighlight style={styles.tagTouchable} onPress={()=>{}}>
            <View style={styles.tag}>
              <Text style={styles.tagDot}>·</Text>
              <Text style={styles.tagText}>{value}</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
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
    let instructions = [];
    for (let i = 0; i < this.state.instruction.length; i++) {
      instructions.push(
        <View key={i} style={styles.instruction}>
            <View style={styles.tip}>
            <View style={styles.tipIcon}>
              <Text style={styles.tipText}>Tip</Text>
              </View>
            </View>
            <View style={styles.instructionView}>
              <Text style={styles.instructionViewText}>
                {this.state.instruction[i]}
              </Text>
            </View>
          </View>
      );
    }
    //ingredientContainers
    let k = 0;
    let ingredients = [];
    for (var key in this.state.ingredients) {
      let value = this.state.ingredients[key];
      let sub_ingredients = [];
      for (var key2 in value) {
        let value2 = value[key2];
        sub_ingredients.push(
          <View key={k++} style={styles.ingredientBody}>
            <View style={styles.ingredientBodyLeft}>
              <Text style={styles.ingredientBodyLeftText}>{key2}</Text>
            </View>
            <View style={styles.ingredientBodyRight}>
              <Text style={styles.ingredientBodyRightText}>{value2}</Text>
            </View>
          </View>
        );
      }
      ingredients.push(
        <View key={k++} style={styles.ingredientContainer}>
          <View style={styles.ingredientHead}>
            <View style={styles.ingredientHeadLeft}>
              <Text style={styles.ingredientHeadLeftText}>成分表</Text>
            </View>
            <View style={styles.ingredientHeadRight}>
              <Text style={styles.ingredientHeadRightText}>{key}</Text>
            </View>
          </View>
          {sub_ingredients}
        </View>
      );
    }
    let questions = [];
    for (let i = 0; i < this.state.description.length; i++) {
      questions.push(
        <View key={i} style={styles.QandA}>
          <View style={styles.question}>
            <View style={styles.Q}>
              <Text style={styles.QText}>Q</Text>
            </View>
            <View style={styles.Qcontent}>
              <Text style={styles.QcontentText}>
                {this.state.description[i].title}
              </Text>
            </View>
          </View>
          <View style={styles.answer}>
            <View style={styles.Q}>
              <Text style={styles.AText}>A</Text>
            </View>
            <View style={styles.Qcontent}>
              <Text style={styles.AcontentText}>
                {this.state.description[i].content}
              </Text>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Header
          title={this.props.navigation.state.params.name}
          onBack={() => this.onBack()}
          icons={[{ icon: "help", onClick: () => this.onHelp() }]}
        />
        <ScrollView style={styles.scroll}>
          <View
            style={this.state.fullscreen ? styles.wrapperContainerFull : {}}
          >
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
          <View style={styles.parameterContainer}>{parameters}</View>
          <View style={styles.tagsContainer}>{tags}</View>
          <View style={styles.gapContainer} />

          <View style={styles.questionContainer}>
            <View style={styles.questionHeadContainer}>
              <Text style={styles.questionHead}>使用指南</Text>
            </View>
            <View style={styles.instructionsContainer}>{instructions}</View>
          </View>
          <View style={styles.ingredientsContainer}>{ingredients}</View>
          <View style={styles.questionContainer}>
            <View style={styles.questionHeadContainer}>
              <Text style={styles.questionHead}>问题咨询</Text>
            </View>
            <View style={styles.questionBodyContainer}>{questions}</View>
          </View>
        </ScrollView>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scroll: {
    backgroundColor: "#fff",
    borderColor: "#eee",
    borderTopWidth: 1,
    marginBottom:
      Platform.OS === "ios" && Dimensions.get("window").height === 812 ? 74 : 50
  },
  wrapperContainerFull: {
    zIndex: 5,
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  wrapperContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width
  },
  wrapper: {
    height: Dimensions.get("window").width
  },
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
    top: -Dimensions.get("window").height / 6,
    left: Dimensions.get("window").width / 2 - 8
  },
  paginationTextFull: {
    fontSize: 17
  },
  paginationText: {
    color: "white",
    fontSize: 15
  },
  tagsContainer:{
    flexDirection:"row",
    flexWrap: "wrap",
    marginHorizontal:10
  },
  tagTouchable:{
    justifyContent: "center",
    alignItems: "center"
  },

  tag:{
    margin:5,
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center"
  },
  tagDot:{
    fontSize:25,
    fontWeight:"800",
    color: "deeppink"
  },
  tagText:{

  },
  parameterContainer: {
    borderColor: "#eee",
    borderTopWidth: 1,
    paddingHorizontal: 12
  },
  parameter: {
    borderColor: "#eee",
    borderBottomWidth: 1,
    flexDirection: "row"
  },
  paramKey: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 4
  },
  paramKeyText: {
    color: "#888"
  },
  paramVal: {
    flex: 4,
    justifyContent: "center",
    //alignItems: "center",
    margin: 7
  },
  paramValText: {},
  gapContainer: {
    height: 7,
    backgroundColor: "#f4f4f4"
  },
  questionContainer: {
    margin: 13
  },
  questionHeadContainer: {},
  questionHead: {
    fontSize: 17
  },
  questionBodyContainer: {
    marginTop: 5
  },
  QandA: {
    margin: 7
  },
  question: {
    flexDirection: "row"
  },
  Q: {
    alignItems: "center"
  },
  QText: {
    color: "pink",
    fontSize: 16
  },
  Qcontent: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6
  },
  QcontentText: {
    fontSize: 13,
    fontWeight: "600"
  },
  answer: {
    flexDirection: "row",
    marginTop: 5
  },
  AText: {
    color: "lightskyblue",
    fontSize: 16
  },
  AcontentText: {
    fontSize: 12,
    fontWeight: "400"
  },
  ingredientsContainer: {
    marginTop: 13
  },
  ingredientContainer: {
    marginBottom: 10,
    marginHorizontal: 40,
    borderWidth: 1,
    borderColor: "#eee"
  },
  ingredientHead: {
    flexDirection: "row",
    backgroundColor: "rgba(255,215,0,0.6)",
    borderBottomWidth: 1,
    borderColor: "#eee"
  },
  ingredientHeadLeft: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  ingredientHeadLeftText: {
    fontSize: 17,
    fontWeight: "600",
    color: "indigo"
  },
  ingredientHeadRight: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: "flex-end"
  },
  ingredientHeadRightText: {
    fontSize: 12,
    color: "indigo"
  },
  ingredientBody: {
    flexDirection: "row",
    backgroundColor: "oldlace"
  },
  ingredientBodyLeft: {
    flex: 1,
    paddingHorizontal: 15
  },
  ingredientBodyLeftText: {
    color: "slategray",
    fontSize: 10
  },
  ingredientBodyRight: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: "flex-end"
  },
  ingredientBodyRightText: {
    color: "slategray",
    fontSize: 10
  },
  instructionsContainer: {
    marginTop: 13,
  },
    instruction: {
      flexDirection: "row",
      marginHorizontal:15,
      marginVertical: 5
    },
    tip: {
      flex:1,
      alignItems: "center",
    },
    tipIcon: {
      backgroundColor: "royalblue",
      borderColor: "royalblue",
      borderRadius: 4,
      borderTopWidth: 2,
      borderBottomWidth: 2,
      borderLeftWidth: 3,
      borderRightWidth: 3,
    },
    tipText: {
      fontSize:10,
      fontWeight:"600",
      color:"white"
    },
    instructionView: {
      flex:9
    },
    instructionViewText: {

    },
});

//export default Product;
export default connect(mapStateToProps, mapDispatchToProps)(Product);
