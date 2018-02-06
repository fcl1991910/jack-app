import React from "react";
import { TabNavigator, StackNavigator } from "react-navigation";
import { Icon } from "react-native-elements";

import Comp from "../screens/Comp";
import ProductList from "../screens/ProductList";
import Product from "../screens/Product";
import CustomerList from "../screens/CustomerList";
import Customer from "../screens/Customer";
import Order from "../screens/Order";
import User from "../screens/User";
import SearchResult from "../screens/SearchResult";

export const Tabs = TabNavigator(
  {
    Screen5: {
      screen: Comp,
      navigationOptions: {
        tabBarLabel: "组件",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="extension" size={35} color={tintColor} />
        )
      }
    },
    Screen1: {
      screen: ProductList,
      navigationOptions: {
        tabBarLabel: "产品",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="list" size={35} color={tintColor} />
        )
      }
    },
    Screen2: {
      screen: CustomerList,
      navigationOptions: {
        tabBarLabel: "客户",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="face" size={35} color={tintColor} />
        )
      }
    },
    Screen3: {
      screen: Order,
      navigationOptions: {
        tabBarLabel: "订单",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="receipt" size={35} color={tintColor} />
        )
      }
    },
    Screen4: {
      screen: User,
      navigationOptions: {
        tabBarLabel: "用户中心",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="account-circle" size={35} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarPosition: "bottom"
  }
);

export const Stacks = StackNavigator({
  Stacks: {
    screen: Tabs
  },
  Product: {
    screen: Product
  },
  Customer: {
    screen: Customer
  },
  SearchResult: {
    screen: SearchResult
  }
});
