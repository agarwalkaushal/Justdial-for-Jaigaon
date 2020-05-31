/* eslint-disable prettier/prettier */
import React from 'react';
import { Image } from 'react-native';
import SplashScreen from './Screens/Login/SplashScreen';
import LoginScreen from './Screens/Login/LoginScreen';
import UserFormScreen from './Screens/Login/UserFormScreen';
import HomeScreen from './Screens/Home/HomeScreen';
import UserScreen from './Screens/User/UserScreen'
import {
    createSwitchNavigator,
    createAppContainer,
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const HomeStack = createStackNavigator(
    {
        Find: {
            screen: HomeScreen,
            navigationOptions: {
                headerShown: false,
            }
        }
    },
    {
        initialRouteName: 'Find',
    }
);

const UserStack = createStackNavigator(
    {
        Profile: {
            screen: UserScreen,
            navigationOptions: {
                headerShown: false,
            }
        }
    },
    {
        initialRouteName: 'Profile',
    }
);

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: {
                tabBarLabel: 'Find',
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={require('./Images/lead.png')}
                        style={{ width: 25, height: 25, tintColor: tintColor }}
                    />
                )
            },
        },
        User: {
            screen: UserStack,
            navigationOptions: {
                tabBarLabel: 'Profile',
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={require('./Images/user.png')}
                        style={{ width: 25, height: 25, tintColor: tintColor }}
                    />
                )
            },
        },
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            // TODO: Set icons
        },
        tabBarOptions: {
            activeTintColor: '#332033',
            inactiveTintColor: 'gray',
        },
        animationEnabled: true,
    },
);

const RootStack = createSwitchNavigator(
    {
        SplashScreen: SplashScreen,
        LoginScreen: LoginScreen,
        UserFormScreen: UserFormScreen,
        TabNavigator: TabNavigator,
    },
    {
        initialRouteName: 'SplashScreen',
    }
);

export default createAppContainer(RootStack);
