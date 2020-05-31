/* eslint-disable prettier/prettier */
import React from 'react';
import { View, ActivityIndicator, StyleSheet, AsyncStorage, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class SplashScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
        };
        this.loadUserDetails();
    }

    loadUserDetails = async () => {

        const user = auth().currentUser;
        const pNo = await AsyncStorage.getItem('pNo');
        console.log(user, "user")
        if (user) {
            const userDetails = await firestore().collection('Users').doc(pNo).get();
            console.log(userDetails, "userDetails")
            if (userDetails._data && Object.keys(userDetails._data).length !== 0) {
                this.props.navigation.navigate('TabNavigator');
            } else
                this.props.navigation.navigate('UserFormScreen', { number: pNo });
        } else {
            this.props.navigation.navigate('LoginScreen', { number: pNo });
        }
    }

    render() {
        return (
            <>
                <StatusBar hidden />
                <View style={style.screen}>
                    <ActivityIndicator style={style.indicator} />
                </View>
            </>
        );
    }
}

export default SplashScreen;

const style = StyleSheet.create(
    {
        screen: {
            backgroundColor: '#1e121e',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignSelf: 'center'
        }
    }
);