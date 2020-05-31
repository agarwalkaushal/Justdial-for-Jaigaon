/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, TextInput, View, Text, Image, StyleSheet, ActivityIndicator, StatusBar, ToastAndroid, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

class UserFormScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            submittingForm: false,
            validated: false,
            name: null,
            pincode: null,
            number: props.navigation.getParam('number', null)
        };
    }

    navigateToHome = () => {
        this.props.navigation.navigate('TabNavigator')
    }

    postData = () => {
        this.setState({ submittingForm: true });

        firestore()
            .collection('Users')
            .doc('+91' + this.state.number)
            .set({
                name: this.state.name ? this.state.name : 'User',
                pincode: this.state.pincode ? this.state.pincode : '000000',
            })
            .then(() => {
                ToastAndroid.show('Details saved successfully', ToastAndroid.SHORT);
                this.navigateToHome();
                console.log('User added!');
            });
    }

    submitForm = () => {
        const { name, pincode } = this.state;

        if (name && pincode.length === 6) {
            this.setState({ validated: true }, () => this.postData());
        } else {
            let errorMsg = '';

            if (!name) {
                errorMsg = 'First name cannot be empty';
                ToastAndroid.show(errorMsg, ToastAndroid.SHORT);
                return;
            }

            if (!pincode) {
                errorMsg = 'Pincode cannot be empty';
                ToastAndroid.show(errorMsg, ToastAndroid.SHORT);
                return;
            }

            if (pincode.length !== 6) {
                errorMsg = 'Please enter valid Pincode';
                ToastAndroid.show(errorMsg, ToastAndroid.SHORT);
                return;
            }
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
                            <Text style={style.heading}>NAME</Text>
                            <TextInput
                                style={style.input}
                                autoCapitalize="sentences"
                                onChangeText={text => this.setState({ name: text })} />
                        </View>
                        <View style={style.formElement}>
                            <Text style={style.heading}>PIN CODE</Text>
                            <TextInput
                                style={style.input}
                                keyboardType={'numeric'}
                                onChangeText={text => this.setState({ pincode: text })} />
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
