import React from "react";
import PropTypes from "prop-types";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableHighlight
} from "react-native";
import { Icon } from "react-native-elements";
import SearchBar from "./SearchBar";

const Header = props => {
  let viewMid;
  let viewMidStyle = {};
  if (props.title)
    viewMid = <Text style={styles.viewMidText}>{props.title}</Text>;
  else if (props.search) {
    viewMidStyle = { flex: 6,zIndex: 5};
    viewMid = <SearchBar search={(value) => props.search(value)} searchedKey={props.searchedKey}/>;
  } else
    viewMid = (
      <Image
        style={styles.viewMidImage}
        source={require("../img/discover.png")}
      />
    );
  let leftIcons = [];
  let rightIcons = [];
  if (props.onBack)
    leftIcons.push(
      <TouchableHighlight
        key={-1}
        style={styles.touchable}
        onPress={() => props.onBack()}
      >
        <View style={styles.subview}>
          <Icon
            name="navigate-before"
            style={styles.icon}
            color="blue"
            size={35}
          />
        </View>
      </TouchableHighlight>
    );
  if (props.icons.length > 0) {
    for (let i = 0; i < props.icons.length; i++) {
      let value = props.icons[i];
      let tempIcons;
      if (i <= props.icons.length / 2 - 1) tempIcons = leftIcons;
      else tempIcons = rightIcons;
      let content = <View/>;
      if(value.icon)
        content = <View style={styles.subview}>
        <Icon name={value.icon} style={styles.icon} color="#666" />
      </View>;
      else
        content = <View style={styles.button}>
        <Text style={styles.buttonText}>{value.text}</Text>
      </View>
      tempIcons.push(
        <TouchableHighlight
          key={i}
          style={styles.touchable}
          onPress={() => value.onClick()}
        >
        {content}
        </TouchableHighlight>
      );
    }
  }
  return (
    <View style={styles.viewStyle}>
      <View style={styles.view}>{leftIcons}</View>
      <View style={[styles.viewMid, viewMidStyle]}>{viewMid}</View>
      <View style={styles.view}>{rightIcons}</View>
    </View>
  );
};

padding =
  Platform.OS === "ios" && Dimensions.get("window").height === 812 ? 41 : 17;

const styles = StyleSheet.create({
  viewStyle: {
    paddingTop: padding,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width,
    height: padding + 46,
    zIndex: 3,
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
    alignItems: "center",
    paddingLeft: 7,
    paddingRight: 7
  },
  subview: {
    flexDirection: "row",
    justifyContent: "center"
  },
  icon: {
    color: "#ff7"
  },
  button: {
    height:30,
    paddingVertical: 4,
    paddingHorizontal: 5,
    flexDirection: "row",
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    borderRadius: 3,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText:{
    color: "white",
    fontSize: 15,
    fontWeight: "400",
    marginRight: 4
  },
});

Header.PropTypes = {
  headerText: PropTypes.string
};

export default Header;
