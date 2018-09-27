import { createStackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import ViewFiles from '../screens/ViewFiles';
import { SECONDARY } from '../config/theme';

export const RootStack = createStackNavigator(
  {
    HomeStack: Home,
    DoneStack: ViewFiles
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
