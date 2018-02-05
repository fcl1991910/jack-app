import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { Icon } from "react-native-elements";

const Header = props => {
  return (
    <View style={styles.viewStyle}>
      <View style={styles.view}>
      <View style={styles.subview}>
        <Icon name="input" style={styles.icon} color='#666'/>
      </View>
      </View>
      <View style={styles.viewMid}>
        <Image
          style={{ width: 140, height: 44 }}
          source={require("../img/discover.png")}
        />
      </View>
      <View style={styles.view}>
        <View style={styles.subview}>
          <Icon name="search" style={styles.icon} color='#666'/>
        </View>
        <View style={styles.subview}>
          <Icon name="help" style={styles.icon} color='#666'/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width,
    backgroundColor: "#f7f7f7",
    height: 44
  },
  view: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    height: 44
  },
  viewMid: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    height: 44
  },
  subview: {
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: 15, 
  },
  textStyle: {
    fontSize: 20
  },
  icon: {
    color: '#ff7',
  }
});

Header.PropTypes = {
  headerText: PropTypes.string
};

export default Header;
