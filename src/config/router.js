import React from "react";
import { TabNavigator,StackNavigator } from "react-navigation";
import { Icon } from "react-native-elements";

import Screen1 from "../screens/Screen1";
import Screen2 from "../screens/Screen2";
import Screen3 from "../screens/Screen3";

export const Tabs = TabNavigator({
  Screen1: {
    screen: Screen1,
    navigationOptions: {
        tabBarLabel: "Products",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="list" size={35} color={tintColor} />
        )
    }
  },
  Screen2: {
    screen: Screen2,
    navigationOptions: {
      tabBarLabel: "Jack",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="account-circle" size={35} color={tintColor} />
        )
    }
  }
});
