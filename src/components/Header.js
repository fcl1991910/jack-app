import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableHighlight
} from "react-native";
import { Icon } from "react-native-elements";

const Header = props => {
  let viewMid;
  if (props.title)
    viewMid = <Text style={styles.viewMidText}>{props.title}</Text>;
  else
    viewMid = (
      <Image
        style={styles.viewMidImage}
        source={require("../img/discover.png")}
      />
    );
  let leftIcons = [];
  let rightIcons = [];
  if (props.icons.length > 0) {
    for (let i = 0; i < props.icons.length; i++) {
      let value = props.icons[i];
      let tempIcons;
      if (i <= props.icons.length / 2 - 1) tempIcons = leftIcons;
      else tempIcons = rightIcons;
      tempIcons.push(
        <TouchableHighlight
          key={i}
          style={styles.touchable}
          onPress={() => value.onClick()}
        >
          <View style={styles.subview}>
            <Icon name={value.icon} style={styles.icon} color="#666" />
          </View>
        </TouchableHighlight>
      );
    }
  }
  return (
    <View style={styles.viewStyle}>
      <View style={styles.view}>{leftIcons}</View>
      <View style={styles.viewMid}>{viewMid}</View>
      <View style={styles.view}>{rightIcons}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    paddingTop: 30,
    backgroundColor: "#f7f7f7",
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width,
    height: 76
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
    alignItems: "center",
    height: 44
  },
  viewMidImage: { width: 140, height: 44 },
  viewMidText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  touchable: {
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: 15
  },
  subview: {
    flexDirection: "row",
    justifyContent: "center"
  },
  icon: {
    color: "#ff7"
  }
});

Header.PropTypes = {
  headerText: PropTypes.string
};

export default Header;
