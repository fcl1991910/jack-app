import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import axios from "axios";
import ProductSimple from '../components/ProductSimple';

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

  _renderItem = ({ item }) => (
    <ProductSimple key={item.title} item={item} />
  );

  render() {
    return (
      <View>
        <ScrollView>
          <FlatList
            data={this.state.products}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ProductList;
