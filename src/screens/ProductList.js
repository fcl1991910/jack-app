import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableHighlight
} from "react-native";
import axios from "axios";
import ItemTable from "../components/ItemTable";

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "产品"
  });

  componentWillMount() {
    axios
      .get("https://rallycoding.herokuapp.com/api/music_albums")
      .then(response => {
        let products = [];
        products = products.concat(response.data);
        products = products.concat(response.data);
        products = products.concat(response.data);
        products = products.concat(response.data);
        this.setState({
          items: products
        });
      })
      .catch(error => console.log(error));
  }

  onLearnMore = item => {
    this.props.navigation.navigate("Product", item);
  };

  render() {
    return (
      <ItemTable
        styles={styles_itemtable}
        onLearnMore={(item) => this.onLearnMore(item)}
        items={this.state.items}
      />
    );
  }
}

const styles = StyleSheet.create({});

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
export default ProductList;
