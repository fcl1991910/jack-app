import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight
} from "react-native";

const ItemTable = props => {
  //console.log('----------------------',props,'--------------');
  const {
    touchablehighlight,
    product,
    image,
    title,
    text,
    scrollview,
    product_list
  } = props.styles;
  let items = [];
  let items_size = 0;
  for (var key in props.items) {
    let item = props.items[key];
    console.log(item.image);
    var image
    var image = require('./my-icon-active.png');
    items.push(
      <TouchableHighlight
        style={touchablehighlight}
        onPress={() => props.onLearnMore(item)}
        key={items_size++}
      >
        <View style={product}>
          <Image style={image} source={{ uri: item.image }} />
          <View style={title}>
            <Text style={text}>{item.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  return (
    <View>
      <ScrollView style={scrollview}>
        <View style={product_list}>{items}</View>
      </ScrollView>
    </View>
  );
};

export default ItemTable;
