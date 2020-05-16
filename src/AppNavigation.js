import LoginScreen from './Screens/Login/LoginScreen';
import HomeScreen from './Screens/Home/HomeScreen';
import {
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';

const HomeStack = createStackNavigator(
    {
        HomeScreen: HomeScreen,
    },
    {
        initialRouteName: 'HomeScreen'
    }
);

const RootStack = createSwitchNavigator(
    {
        LoginScreen: LoginScreen,
        HomeStack: HomeStack
    },
    {
        initialRouteName: 'LoginScreen'
    }
);

export default createAppContainer(RootStack);