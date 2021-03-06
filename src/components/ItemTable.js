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
import { Icon } from "react-native-elements";
import * as func from "../func/func";

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
    product_list,
    messageText,
    selected
  } = props.styles;
  let items = [];
  if (!props.items || props.items.length === 0) {
    items = <Text style={messageText}>{props.no_item_message}</Text>;
  } else {
    let items_size = 0;
    for (var key in props.items) {
      let item = props.items[key];
      if (item.image)
        var image_source = { uri: "http://wangcai.com.au/" + item.image };
      else var image_source = require("../img/milk-powder.png");
      items.push(
        <TouchableHighlight
          style={touchablehighlight}
          onPress={() => props.onLearnMore(item)}
          key={items_size++}
        >
          <View
            style={[
              product,
              props.AddCategory &&
              func.myIncludes(props.selectedCategory, {
                name: item.name,
                id: item.id
              })
                ? selected
                : {}
            ]}
          >
            <Image style={image} source={image_source} />
            <View style={title}>
              <Text style={text}>{item.name}</Text>
            </View>
            <View
              style={
                props.AddCategory &&
                func.myIncludes(props.selectedCategory, {
                  name: item.name,
                  id: item.id
                })
                  ? { position: "absolute", right: 0, bottom: 0 }
                  : { display: "none" }
              }
            >
              <Icon name="check" color="red" />
            </View>
          </View>
        </TouchableHighlight>
      );
    }
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
