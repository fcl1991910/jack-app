import React from "react";
import { TabNavigator,StackNavigator } from "react-navigation";
import { Icon } from "react-native-elements";

import ProductList from "../screens/ProductList";
import Product from "../screens/Product";
import Order from "../screens/Order";
import Customer from "../screens/Customer";

export const ProductStack = StackNavigator({
  ProductList: {
    screen: ProductList,
    navigationOptions: {
      title: '产品列表'
    }
  },
  Product: {
    screen: Product,
    navigationOptions: {
      title: '产品'
    }
  }
});

export const Tabs = TabNavigator({
  Screen1: {
    screen: ProductStack,
    navigationOptions: {
        tabBarLabel: "产品",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="list" size={35} color={tintColor} />
        )
    }
  },
  Screen2: {
    screen: Order,
    navigationOptions: {
      tabBarLabel: "订单",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="receipt" size={35} color={tintColor} />
        )
    }
  },
  Screen3: {
    screen: Customer,
    navigationOptions: {
      tabBarLabel: "用户中心",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="account-circle" size={35} color={tintColor} />
        )
    }
  }
});
