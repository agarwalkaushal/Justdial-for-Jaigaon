/* eslint-disable prettier/prettier */
import SplashScreen from './Screens/Login/SplashScreen';
import LoginScreen from './Screens/Login/LoginScreen';
import UserFormScreen from './Screens/Login/UserFormScreen';
import HomeScreen from './Screens/Home/HomeScreen';
import {
    createSwitchNavigator,
    createAppContainer,
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';

const HomeStack = createStackNavigator(
    {
        HomeScreen: HomeScreen,
    },
    {
        initialRouteName: 'HomeScreen',
    }
);

const RootStack = createSwitchNavigator(
    {
        SplashScreen: SplashScreen,
        LoginScreen: LoginScreen,
        UserFormScreen: UserFormScreen,
        HomeStack: HomeStack,
    },
    {
        initialRouteName: 'SplashScreen',
    }
);

export default createAppContainer(RootStack);
