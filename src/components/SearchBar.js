import React, { Component } from "react";
import {
  Image,
  TouchableHighlight,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput
} from "react-native";
import { Icon } from "react-native-elements";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onFocus: true,
      searchKey: ""
    };
  }

  render() {
    let displaySearchPage = {};
    if(!this.state.onFocus)
      displaySearchPage = {display:"none"};
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.iconContainer}>
            <Icon name="search" color="grey" />
          </View>
          <View style={styles.textContainer}>
            <TextInput
              placeholder="请输入关键词"
              onChangeText={text => {
                this.setState({
                  searchKey: text
                });
              }}
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../img/freepik.png")}
            />
          </View>
        </View>
        <View style={[styles.searchPageContainer,displaySearchPage]}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 30,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 35,
    borderWidth: 3,
    backgroundColor: "#f0f0f4",
    borderColor: "#f0f0f4",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    flex: 7,
    justifyContent: "center"
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  searchPageContainer:{
    backgroundColor:"#f7f7f7",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position:"absolute",
    right: -Dimensions.get("window").width/8,
    top: 30,
  }
});

export default SearchBar;
