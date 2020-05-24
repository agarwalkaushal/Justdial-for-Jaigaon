/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, TextInput, View, Text, Image, StyleSheet, ActivityIndicator, StatusBar, ToastAndroid, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { add } from 'react-native-reanimated';

class UserFormScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            submittingForm: false,
            validated: false,
            firstName: null,
            lastName: null,
            address: null,
        };
    }

    postData = () => {
        this.setState({ submittingForm: true });
        ToastAndroid.show('Cool to proceed', ToastAndroid.SHORT);

        if (!this.state.validated) {
            //TODO
        }
    }

    submitForm = () => {
        const { firstName, address } = this.state;

        if (firstName && address) {
            this.setState({ validated: true }, () => this.postData());
        } else {
            let errorMsg = '';

            if (!firstName)
                errorMsg += 'First name, ';

            if (!address)
                errorMsg += 'Address, ';
            ToastAndroid.show(errorMsg + ' cannot be null', ToastAndroid.SHORT);
            return;
        }
    }


    render() {
        return (
            <>
                <StatusBar hidden />
                <View style={style.screen}>
                    <View style={style.iconContainer}>
                        <Image source={require('../../Images/travel.png')} style={style.icon} />
                    </View>
                    <View style={style.form}>
                        <View style={style.formElement}>
                            <Text style={style.heading}>FIRST NAME</Text>
                            <TextInput
                                style={style.input}
                                autoCapitalize="sentences"
                                onChangeText={text => this.setState({ firstName: text })} />
                        </View>
                        <View style={style.formElement}>
                            <Text style={style.heading}>LAST NAME</Text>
                            <TextInput
                                style={style.input}
                                autoCapitalize="sentences"
                                onChangeText={text => this.setState({ lastName: text })} />
                        </View>
                        <View style={style.formElement}>
                            <Text style={style.heading}>ADDRESS</Text>
                            <TextInput
                                style={style.input}
                                autoCapitalize="sentences"
                                onChangeText={text => this.setState({ address: text })} />
                        </View>
                    </View>

                    {!this.state.submittingForm ?
                        <View style={{ flexDirection: 'row' }}>
                            <View style={style.button}>
                                <Button
                                    title="CONTINUE"
                                    color="#735fbe"
                                    onPress={() => this.submitForm()}
                                />
                            </View>
                            <TouchableOpacity style={style.button2} onPress={() => this.postData()}>
                                <Text style={style.skip}>SKIP</Text>
                            </TouchableOpacity>
                        </View> :
                        <ActivityIndicator size="small" color="#D3D3D3" />}
                </View>
            </>
        );
    }
}

export default UserFormScreen;

const style = StyleSheet.create(
    {
        screen: {
            backgroundColor: '#1e121e',
            width: '100%',
            height: '100%',
        },

        iconContainer: {
            height: '30%',
            justifyContent: 'center',
            alignSelf: 'center',
        },

        icon: {
            opacity: 0.2
        },

        form: {
            paddingLeft: 20
        },

        formElement: {
            padding: 10,
            margin: 10,
        },

        heading: {
            color: 'white',
            fontSize: 10,
        },

        input: {
            width: 240,
            borderRadius: 2.5,
            borderBottomWidth: 1,
            borderColor: 'white',
            color: 'white',
            fontSize: 15,
            fontWeight: 'bold',
        },

        button: {
            marginTop: 15,
            paddingLeft: 30,
            marginLeft: 10,
            width: "30%"
        },

        button2: {
            marginTop: 15,
            width: "30%",
        },

        skip: {
            color: '#FFFFFF',
            flex: 1,
            fontSize: 15,
            fontWeight: 'bold',
            textAlign: 'center',
            textAlignVertical: 'center'
        }
    }
);
