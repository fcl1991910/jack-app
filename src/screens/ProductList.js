import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList, Image } from "react-native";
import axios from "axios";
import ProductSimple from "../components/ProductSimple";

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  componentWillMount() {
    axios
      .get("https://rallycoding.herokuapp.com/api/music_albums")
      .then(response => this.setState({ products: response.data }))
      .catch(error => console.log(error));
  }

  _renderItem = ({ item }) => <ProductSimple key={item.title} item={item} />;

  render() {
    let products = [];
    let products_size = 0;
    this.state.products.forEach(function(item){
      console.log(item.image);
      products.push(
        <View style={styles.product} key={products_size++}><Image source={{uri:item.image}}/></View>
      );
    });
    return (
      <View>
        <ScrollView style={styles.ScrollView}>
          <View style={styles.product_list}>
            {products}
          </View>
          {/*<FlatList
            data={this.state.products}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index}
          />*/}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ScrollView:{
    flex: 1
  },
  product_list: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  product: {
    width: 180,
    height: 180,
    backgroundColor: "#742",
    marginTop: 5
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ProductList;
