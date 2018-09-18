import { createStackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import { SECONDARY } from '../config/theme';

export const RootStack = createStackNavigator(
  {
    HomeStack: Home
  },
  {
    initialRouteName: 'HomeStack',
    navigationOptions: {
      headerStyle: {
        backgroundColor: SECONDARY,
        height: 60,
        elevation: 8
      },
      headerTintColor: '#FFF',
      headerTitleContainerStyle: {
        padding: 8
      },
      headerTitleStyle: {
        fontWeight: '300'
      }
    }
  }
);
