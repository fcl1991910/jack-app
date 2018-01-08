import React from 'react';
import { TabNavigator } from 'react-navigation';
import {Icon} from 'react-native-elements';

import Screen1 from '../screens/Screen1';
import Screen2 from '../screens/Screen2';

export const Tabs = TabNavigator({
  Screen1: {
    screen: Screen1,
  },
  Screen2: {
    screen: Screen2,
  },
});
