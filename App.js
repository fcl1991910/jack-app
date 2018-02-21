import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
//import { createStore, applyMiddleware, combineReducers, compose } from "redux";
//import thunkMiddleware from "redux-thunk";
//import { createLogger } from "redux-logger";
//import reducer from "./src/reducers";
import { Stacks } from "./src/config/router";

// const loggerMiddleware = createLogger({
//   predicate: (getState, action) => __DEV__
// });

// function configureStore(initialState) {
//   const enhancer = compose(applyMiddleware(thunkMiddleware, loggerMiddleware));
//   return createStore(reducer, initialState, enhancer);
// }

// const store = configureStore({});
export default class App extends Component {
  render() {
    style={};
    if (Platform.OS === "android")
    style = {marginTop: 24};
    return (
      /*<Provider store={store}>*/
        <View style={styles.view}>
          <Stacks />
        </View>
      /*</Provider>*/
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
});
