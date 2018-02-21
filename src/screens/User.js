import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  TouchableHighlight
} from "react-native";

class User extends Component {
  constructor() {
    super();
    this.state = {
      item: []
    };
  }

  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  renderUserHeader = () => {
    return (
      <View style={styles.user_header}>
        <View style={styles.coverContainer}>
          <ImageBackground
            source={require("../img/above-adventure-aerial-air.jpg")}
            style={styles.coverImage}
          >
            <View style={styles.coverTitleContainer}>
              <Text style={styles.coverTitle} />
            </View>
            <View style={styles.coverMetaContainer}>
              <Text style={styles.coverName}>{"Jack a.k.a CodingBaby"}</Text>
              <Text style={styles.coverBio}>{"The Coolest"}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.profileImageContainer}>
          <Image
            source={require("../img/image_6483441.jpg")}
            style={styles.profileImage}
          />
        </View>
      </View>
    );
  };

  onLearnMore = item => {
    this.props.navigation.navigate(item);
  };

  renderStatistic = (title, count, navigate) => {
    return (
      <TouchableHighlight
        style={styles.touchableContainer}
        onPress={() => this.onLearnMore(navigate)}
      >
        <View style={styles.statiscticContainer}>
          <Text style={styles.labelNumber}>{count}</Text>
          <Text style={styles.labelText}>{title}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    let platform;
    if (Platform.OS === "android") platform = "This is fucking android!";
    else if (Platform.OS === "ios") platform = "This is fucking ios!";
    else platform = "This is a job!";
    return (
      <ScrollView style={styles.container}>
        {this.renderUserHeader()}
        <View style={styles.user_body}>
          <View style={styles.statiscticsContainer}>
            {this.renderStatistic("订单", 5, "Order")}
            {this.renderStatistic("待操作", 2, "Order")}
            {this.renderStatistic("商品", 17, "ProductList")}
            {this.renderStatistic("客户", 23, "CustomerList")}
          </View>
          <Text>Customer Customer Customer</Text>
          <Text>{platform}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  user_header: {
    alignItems: "center",
    backgroundColor: "#fff"
  },
  user_body: {
    marginTop: -55,
    marginBottom: 12,
    zIndex: 10,
    flex: 1,
    position: "relative"
  },
  coverBio: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600"
  },
  coverContainer: {
    marginBottom: 55,
    position: "relative"
  },
  coverImage: {
    height: Dimensions.get("window").width * (9 / 16),
    width: Dimensions.get("window").width
  },
  coverMetaContainer: {
    backgroundColor: "transparent",
    paddingBottom: 10,
    paddingLeft: 135
  },
  coverName: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 2
  },
  coverTitle: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center"
  },
  coverTitleContainer: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 45
  },
  profileImage: {
    borderColor: "#FFF",
    borderRadius: 55,
    borderWidth: 3,
    height: 110,
    width: 110
  },
  profileImageContainer: {
    bottom: 0,
    left: 10,
    position: "absolute"
  },
  statiscticsContainer: {
    //backgroundColor: "#ff9",
    height: 55,
    marginLeft: 130,
    marginBottom: 20,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  touchableContainer: {
    flex:1
  },
  statiscticContainer: {
    flexWrap: "wrap",
    flexDirection: "column"
  },
  labelNumber: {
    color: "#448",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 2
  },
  labelText: {
    color: "#225",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600"
  }
});

export default User;
