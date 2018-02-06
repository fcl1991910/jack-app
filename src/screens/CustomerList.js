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
import { List, ListItem } from "react-native-elements";
import axios from "axios";
import albums from "../json/albums.json";

class CustomerList extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "客户"
  });

  componentWillMount() {
    let products = [];
    products = products.concat(albums);
    products = products.concat(albums);
    products = products.concat(albums);
    products = products.concat(albums);
    this.setState({
      items: products
    });
  }

  //_renderItem = ({ item }) => <ProductSimple key={item.title} item={item} />; //FlatList  FlatList  FlatList  FlatList  FlatList  FlatList

  onLearnMore = item => {
    this.props.navigation.navigate("Customer", item);
  };

  render() {
    let customers = [];
    let customers_size = 0;
    for (var key in this.state.items) {
      let item = this.state.items[key];
      customers.push(
        <ListItem
          key={customers_size++}
          roundAvatar
          avatar={{ uri: item.image }}
          title={item.name}
          subtitle={item.artist}
          onPress={() => this.onLearnMore(item)}
        />
      );
    }
    return (
      <View>
        <ScrollView style={styles.ScrollView}>
          <List>{customers}</List>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ScrollView: {
    //flex: 1
  }
});

export default CustomerList;
