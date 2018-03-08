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
import { List, ListItem } from "react-native-elements";
import Icon from "../components/Icon";
import { connect } from "react-redux";
import { LOGIN } from "../constants/actionTypes";

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onGetUserInfo: value =>
    dispatch({
      type: LOGIN,
      payload: { username: "Jack a.k.a CodingBaby", title: "桂林人" }
    }),
});
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

  onLearnMore = item => {
    //this.props.onGetUserInfo("1");
    this.props.navigation.navigate(item);
  };

  renderUserHeader = () => {
    console.log(this.props);
    let username;
    if (this.props.username) {
      username = (
        <View style={styles.coverMetaContainer}>
          <Text style={styles.coverName}>{this.props.username}</Text>
          <Text style={styles.coverBio}>{this.props.title}</Text>
        </View>
      );
    } else {
      username = (
        <TouchableHighlight
          style={styles.coverMetaContainer}
          underlayColor="rgba(0,0,0,0)"
          onPress={() => this.onLearnMore("Login")}
        >
          <Text style={styles.login}>{"登录/注册  >"}</Text>
        </TouchableHighlight>
      );
    }
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
            {username}
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

  renderListItem = (title, navigate, backgroundColor, type, name) => {
    return (
      <ListItem
        title={title}
        onPress={() => this.onLearnMore("SearchResult")}
        containerStyle={styles.ListItemContainer}
        leftIcon={
          <Icon
            containerStyle={{ backgroundColor: backgroundColor }}
            icon={{
              type: type,
              name: name
            }}
          />
        }
      />
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
          <View>
            <Text>更多</Text>
            <List containerStyle={styles.listContainer}>
              {this.renderListItem(
                "提醒",
                "Notification",
                "#FFADF2",
                "material",
                "notifications"
              )}
              {this.renderListItem(
                "定位",
                "Location",
                "#57DCE7",
                "material",
                "place"
              )}
              {this.renderListItem(
                "关于我们",
                "AboutUs",
                "#A4C8F0",
                "ionicon",
                "md-information-circle"
              )}
              {this.renderListItem(
                "条款",
                "TermsAndPolicies",
                "#C6C7C6",
                "entypo",
                "light-bulb"
              )}
              {this.renderListItem(
                "分享App",
                "Share",
                "#C47EFF",
                "entypo",
                "share"
              )}
              {this.renderListItem(
                "给App评分",
                "RateUs",
                "#FECE44",
                "entypo",
                "star"
              )}
              {this.renderListItem(
                "提供反馈",
                "FeedBack",
                "#00C001",
                "materialicon",
                "feedback"
              )}
            </List>
          </View>
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
  login: {
    color: "#FFF",
    fontSize: 25,
    fontWeight: "bold"
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
    flex: 1
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
  },
  listContainer: {
    borderTopColor: "#f4f4f4"
  },
  ListItemContainer: {
    borderBottomColor: "#f4f4f4"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
//export default User;
