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

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  static navigationOptions = ({navigation}) => ({
    title: '产品'
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

  //_renderItem = ({ item }) => <ProductSimple key={item.title} item={item} />; //FlatList  FlatList  FlatList  FlatList  FlatList  FlatList

  onLearnMore = (item) => {
    this.props.navigation.navigate('Product',item);
  };

  render() {
    let products = [];
    let products_size = 0;
      for(var key in this.state.items){
        let item = this.state.items[key];
      products.push(
        <TouchableHighlight style={styles.TouchableHighlight} onPress={() => this.onLearnMore(item)} key={products_size++}>
          <View style={styles.product}>
            <Image style={styles.image} source={{ uri: item.image }} />
            <View style={styles.title}>
              <Text style={styles.text}>{item.title}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    }
    return (
      <View>
        <ScrollView style={styles.ScrollView}>
          <View style={styles.product_list}>{products}</View>
          {/*  FlatList  FlatList  FlatList  FlatList  FlatList  FlatList  FlatList  FlatList  FlatList  FlatList  FlatList  
          <FlatList
            data={this.state.products}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index}
          />
        */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ScrollView: {
    //flex: 1
  },
  product_list: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  TouchableHighlight: {
    marginTop: 7,
    width: 180,
    height: 208,
  },
  product: {
    flexDirection: "column",
    width: 180,
    height: 208,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: { width: 180, height: 180 },
  title: { width: 180,height: 30},
  text: { fontSize: 20, paddingBottom: 3, color: "#777", textAlign:'center', fontWeight: "800" }
});

export default ProductList;
