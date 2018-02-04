import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

const Header = props => {
  return (
    <View style={style.viewStyle}>
      <View style={style.view1} />
      <View style={style.view2}>
        <Image style={{width: 40, height: 40}} source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}} />
      </View>
      <View style={style.view3} />
    </View>
  );
};

const style = StyleSheet.create({
  viewStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: Dimensions.get("window").width,
    backgroundColor: "#f7f7f7",
    height: 44
  },
  textStyle: {
    fontSize: 20
  }
});

Header.PropTypes = {
  headerText: PropTypes.string
};

export default Header;
