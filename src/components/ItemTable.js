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

//组件
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
    if (item.image) var image_source = { uri: "http://wangcai.com.au/"+item.image };
    else var image_source = require("../img/milk-powder.png");
    console.log(image_source);
    items.push(
      <TouchableHighlight
        style={touchablehighlight}
        onPress={() => props.onLearnMore(item)}
        key={items_size++}
      >
        <View style={product}>
          <Image style={image} source={image_source} />
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
