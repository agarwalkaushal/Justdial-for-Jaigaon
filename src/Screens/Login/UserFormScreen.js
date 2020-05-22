/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, TextInput, View, Text, Image, StyleSheet, ActivityIndicator, Col, Item, Input } from 'react-native';
import auth from '@react-native-firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';

// TODO
class UserFormScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }; 
    }

    render() {
        return (
            <View style={style.screen}>
                <TextInput 
                    placeholder="First Name"
                />
                 <TextInput 
                    placeholder="Last Name"
                />
                 <TextInput 
                    placeholder="Address"
                />
            </View>
        );
    }
}

export default UserFormScreen;

const style = StyleSheet.create(
    {
        screen: {
            backgroundColor: '#1e121e',
            width: '100%',
            height: '100%'
        }
    }
);