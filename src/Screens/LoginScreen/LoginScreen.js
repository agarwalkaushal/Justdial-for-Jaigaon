/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, TextInput, View, Text, Image, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            confirm: null,
            code: null,
            number: null,
            getOtp: true
        };
        this.signInWithPhoneNumber = this.signInWithPhoneNumber.bind(this)
        this.confirmCode = this.confirmCode.bind(this)
    }

    async signInWithPhoneNumber() {
        const confirmation = await auth().signInWithPhoneNumber("+91"+this.state.number);
        this.setState({ confirm: confirmation })
    }

    async confirmCode() {
        try {
            await this.state.confirm.confirm(this.state.code);
        } catch (error) {
            console.log('Invalid code.');
        }
    }

    render() {
        return (
            <View style={style.screen}>
                <View style={style.iconContainer}>
                    <Image source={require('../../Images/travel.png')} style={style.icon} />
                </View>
                {this.state.getOtp ?
                    <View style={style.getOtpUI}>
                        <View style={style.inputContainer}>
                            <Text style={style.info}>Hi, We'll need your mobile number to get started. Please enter below. </Text>
                            <TextInput
                                style={style.input}
                                value={this.state.number}
                                keyboardType={'numeric'}
                                onChangeText={text => this.setState({ number: text })} />
                        </View>
                        <View style={style.getOtp}>
                            <Button
                                title="GET OTP"
                                color="#735fbe"
                                onPress={() => this.signInWithPhoneNumber()}
                                disabled={this.state.number ? (this.state.number.length !== 10 ? true : false) : true}
                            />
                        </View>
                    </View> :

                    <View style={style.submitOtpUI}>
                        <Button title="Confirm Code" onPress={() => this.confirmCode()} />
                    </View>}

                <Text style={style.tc}>By signing in you agree to our Terms &amp; Conditions</Text>
            </View>
        );
    }
}

const style = StyleSheet.create(
    {
        screen: {
            backgroundColor: '#1e121e',
            width: '100%',
            height: '100%'
        },

        iconContainer: {
            height: '50%',
            justifyContent: 'center',
            alignSelf: 'center',
        },

        getOtpUI: {

        },

        submitOtpUI: {

        },

        icon: {
            height: 100,
            width: 100,
        },

        info: {
            color: 'white',
            width: '75%',
            fontSize: 13,
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            marginBottom: 30
        },

        input: {
            alignSelf: 'center',
            textAlign: 'center',
            width: 180,
            borderRadius: 2.5,
            borderWidth: 1,
            borderColor: 'white',
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold'
        },

        inputContainer: {
            padding: 5,
            margin: 5,
            width: '100%',
            justifyContent: 'center'
        },

        getOtp: {
            marginTop: 15,
            width: '30%',
            justifyContent: 'center',
            alignSelf: 'center'
        },

        
        tc: {
            color: 'white',
            fontSize: 7.5,
            alignSelf: 'center',
            position: 'absolute',
            bottom: 15
        }
    }
)

export default LoginScreen;