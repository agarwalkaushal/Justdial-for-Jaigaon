/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class BusinessDetailsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            details: props.navigation.getParam('details', null),
        };
    }

    static navigationOptions = ({ navigation }) => {
        console.log(navigation, 'nav');
        return {
            title: navigation.getParam('details').business_name,
        };
    }

    componentWillMount() {
        console.log('details are: ', this.state.details);
    }

    render() {
        return (
            <View style={style.screen}>
                <Text>TODO</Text>
            </View>
        );
    }
}

export default BusinessDetailsScreen;

const style = StyleSheet.create(
    {
        screen: {
            backgroundColor: 'white',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
    }
);