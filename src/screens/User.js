import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

class User extends Component {
  constructor() {
    super();
    this.state = {
      item: []
    };
  }

  render() {
    let platform;
    if (Platform.OS === "android") platform = "This is fucking android!";
    else if (Platform.OS === "ios") platform = "This is fucking ios!";
    else platform = "This is a job!";
    return (
      <View style={styles.container}>
        <Text>CustomerCustomerCustomerCustomerCustomerCustomer</Text>
        <Text>{platform}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default User;
