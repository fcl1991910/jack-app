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
import Login from "../screens/Login";

export const Tabs = TabNavigator(
  {
    User: {
      screen: User,
      navigationOptions: {
        tabBarLabel: "用户中心",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="account-circle" size={35} color={tintColor} />
        )
      }
    },
    Comp: {
      screen: Comp,
      navigationOptions: {
        tabBarLabel: "组件",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="extension" size={35} color={tintColor} />
        )
      }
    },
    ProductList: {
      screen: ProductList,
      navigationOptions: {
        tabBarLabel: "产品",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="list" size={35} color={tintColor} />
        )
      }
    },
    CustomerList: {
      screen: CustomerList,
      navigationOptions: {
        tabBarLabel: "客户",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="face" size={35} color={tintColor} />
        )
      }
    },
    Order: {
      screen: Order,
      navigationOptions: {
        tabBarLabel: "订单",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="receipt" size={35} color={tintColor} />
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
  },
  Login: {
    screen: Login
  }
});
