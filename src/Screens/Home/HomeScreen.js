/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={style.screen}>
                <Text>TODO</Text>
            </View>
        );
    }
}

export default HomeScreen;

const style = StyleSheet.create(
    {
        screen: {
            backgroundColor: 'white',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
);