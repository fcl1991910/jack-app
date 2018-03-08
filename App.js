import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { Stacks } from "./src/config/router";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import reducer from "./src/reducers";

const logger = createLogger();
const store = createStore(reducer, applyMiddleware(logger));
export default class App extends Component {
  render() {
    style = {};
    if (Platform.OS === "android") style = { marginTop: 24 };
    return (
      <Provider store={store}>
        <View style={styles.view}>
          <Stacks />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
});
