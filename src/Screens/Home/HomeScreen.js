/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, TextInput, View, Text, Image, StyleSheet, ActivityIndicator, Col, Item, Input } from 'react-native';
import auth from '@react-native-firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.signOut = this.signOut.bind(this)
    }

    async signOut() {
        auth().signOut().then(() => console.log('User signed out!'));
        //TODO: Navigate to Login screen
    }

    render() {
        return (
            <View style={style.screen}>
                <Text>Welcome {auth().currentUser.phoneNumber}</Text>
            </View>
        );
    }
}

export default HomeScreen;

const style = StyleSheet.create(
    {
        screen: {
            width: '100%',
            height: '100%'
        }
    }
);