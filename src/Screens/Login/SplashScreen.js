/* eslint-disable prettier/prettier */
import React from 'react';
import { View, ActivityIndicator, StyleSheet, AsyncStorage, ToastAndroid, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';

class SplashScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
        };
        //this.getUserDetails = this.getUserDetails.bind();
        this.loadUserDetails();
    }

    loadUserDetails = async () => {

        var userDetails = null;
        const user = auth().currentUser;
        const pNo = await AsyncStorage.getItem('pNo');

        if (pNo) {
            axios.get('http://10.0.2.2:8080/user/' + pNo)
                .then(function (response) {
                    console.log(response.data);
                    userDetails = response.data;
                }).catch(function (error) {
                    console.log(error);
                    ToastAndroid.show('Looks like something is broken. Please try again later :/ ', ToastAndroid.LONG);
                    return;
                });
        }

        if (user) {
            this.props.navigation.navigate('HomeStack', { user: userDetails });
        }

        this.props.navigation.navigate('LoginScreen', { user: userDetails });
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