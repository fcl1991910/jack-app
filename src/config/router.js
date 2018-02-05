import React from "react";
import { TabNavigator,StackNavigator } from "react-navigation";
import { Icon } from "react-native-elements";

import Comp from "../screens/Comp";
import ProductList from "../screens/ProductList";
import Product from "../screens/Product";
import CustomerList from "../screens/CustomerList";
import Customer from "../screens/Customer";
import Order from "../screens/Order";
import User from "../screens/User";

export const CompStack = StackNavigator({
  Comp: {
    screen: Comp
  }
});

export const ProductStack = StackNavigator({
  ProductList: {
    screen: ProductList,
    navigationOptions: {
      title: '产品列表'
    }
  },
  Product: {
    screen: Product,
  }
});

export const CustomerStack = StackNavigator({
  CustomerList: {
    screen: CustomerList,
    navigationOptions: {
      title: '客户列表'
    }
  },
  Customer: {
    screen: Customer,
  }
});

export const OrderStack = StackNavigator({
  Order: {
    screen: Order,
    navigationOptions: {
      title: '订单'
    }
  }
});

export const UserStack = StackNavigator({
  User: {
    screen: User,
    navigationOptions: {
      title: '用户'
    }
  }
});

export const Tabs = TabNavigator({
  Screen5: {
    screen: CompStack,
    navigationOptions: {
      tabBarLabel: "组件",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="extension" size={35} color={tintColor} />
        )
    }
  },
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
    screen: CustomerStack,
    navigationOptions: {
        tabBarLabel: "客户",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="face" size={35} color={tintColor} />
        )
    }
  },
  Screen3: {
    screen: OrderStack,
    navigationOptions: {
      tabBarLabel: "订单",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="receipt" size={35} color={tintColor} />
        )
    }
  },
  Screen4: {
    screen: UserStack,
    navigationOptions: {
      tabBarLabel: "用户中心",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="account-circle" size={35} color={tintColor} />
        )
    }
  }
}, {
  tabBarPosition: 'bottom',
});
