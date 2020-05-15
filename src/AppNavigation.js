import LoginScreen from './Screens/LoginScreen/LoginScreen';
import {
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation';

const RootStack = createSwitchNavigator(
    {
        LoginScreen: LoginScreen,
    },
    {
        initialRouteName: 'LoginScreen'
    }
)

export default createAppContainer(RootStack);