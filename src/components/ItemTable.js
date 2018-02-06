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
  console.log(props.items);
  for (var key in props.items) {
    let item = props.items[key];
    items.push(
      <TouchableHighlight
        style={touchablehighlight}
        onPress={() => props.onLearnMore(item)}
        key={items_size++}
      >
        <View style={product}>
          <Image style={image} source={{ uri: item.image }} />
          <View style={title}>
            <Text style={text}>{item.title}</Text>
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
