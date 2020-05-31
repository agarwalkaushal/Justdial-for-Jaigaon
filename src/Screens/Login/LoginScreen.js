/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, TextInput, View, Text, Image, StyleSheet, ActivityIndicator, ToastAndroid, TouchableOpacity, AsyncStorage, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import firestore from '@react-native-firebase/firestore';
import * as firebase from 'firebase';

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            confirm: null,
            code: null,
            number: props.navigation.getParam('number', null),
            getOtp: true,
            requestingOtp: false,
            confirmingCode: false,
            userDetails: props.navigation.getParam('userDetails', null)
        };
        this.signInWithPhoneNumber = this.signInWithPhoneNumber.bind(this)
        this.confirmCode = this.confirmCode.bind(this)
    }

    getOtpFlow = () => {
        this.setState({ getOtp: true, requestingOtp: false, confirmingCode: false })
    }

    navigateToFormScreen = () => {
        this.props.navigation.navigate('UserFormScreen', { number: this.state.number });
    }

    navigateToHome = () => {
        this.props.navigation.navigate('TabNavigator')
    }

    getUserDetails = async () => {
        const userDetails = await firestore().collection('Users').doc('+91' + this.state.number).get();
        console.log(userDetails, "userDetails")
        if (userDetails._data && Object.keys(userDetails._data).length !== 0) {
            this.navigateToHome()
        } else
            this.navigateToFormScreen()
    }

    async signInWithPhoneNumber() {
        this.setState({ requestingOtp: true })
        ToastAndroid.show('You\'ll receive an otp shortly', ToastAndroid.SHORT);
        await AsyncStorage.setItem("pNo", '+91' + this.state.number);
        try {
            const confirmation = await auth().signInWithPhoneNumber('+91' + this.state.number)
            if (confirmation) {
                this.setState({ confirm: confirmation, verficationId: confirmation._verificationId, getOtp: false, requestingOtp: false })
            }
        } catch (error) {
            this.setState({ getOtp: true, requestingOtp: false })
            console.log(error, "get otp error")
        }
    }

    async confirmCode() {
        this.setState({ confirmingCode: true })
        var credential = firebase.auth.PhoneAuthProvider.credential(this.state.verficationId, this.state.code);
        auth().signInWithCredential(credential).then(
            this.getUserDetails()
        ).catch(error => {
            if (String(error) === 'Error: [auth/invalid-credential] The supplied auth credential is malformed, has expired or is not currently supported.')
                return;
            console.log(error, "submit otp error")
            this.setState({ confirmingCode: false })
        })
    }

    render() {
        return (
            <>
                <StatusBar hidden />
                <View style={style.screen}>
                    <View style={style.iconContainer}>
                        <Image source={require('../../Images/travel.png')} style={style.icon} />
                    </View>
                    {this.state.getOtp ?
                        (<View>
                            <View style={style.inputContainer}>
                                <Text style={style.info}>Hi, We'll need your mobile number to get started. Please enter below. </Text>
                                <TextInput
                                    style={style.input}
                                    // value={this.state.number.length === 13 ? this.state.number.substring(3) : this.state.number}
                                    keyboardType={'numeric'}
                                    onChangeText={text => this.setState({ number: text })}
                                />
                            </View>
                            <View style={style.button}>
                                {!this.state.requestingOtp ?
                                    <Button
                                        title="GET OTP"
                                        color="#735fbe"
                                        onPress={() => this.signInWithPhoneNumber()}
                                        disabled={this.state.number ? (this.state.number.length !== 10 ? true : false) : true}
                                    /> :
                                    <ActivityIndicator size="small" color="#D3D3D3" />}
                            </View>
                        </View>) :

                        (<View>
                            <View style={style.inputContainer}>

                                <Text style={style.info1}>Please enter OTP sent to {this.state.number} </Text>
                                <TouchableOpacity onPress={() => this.getOtpFlow()}>
                                    <Text style={style.changeNumber}>(CHANGE NUMBER)</Text>
                                </TouchableOpacity>

                                <OTPInputView
                                    style={{ width: '65%', height: 50 }}
                                    pinCount={6}
                                    onCodeChanged={text => this.setState({ code: text })}
                                    autoFocusOnLoad
                                    codeInputFieldStyle={style.underlineStyleBase}
                                    codeInputHighlightStyle={style.underlineStyleHighLighted} />
                            </View>
                            <View style={style.button}>
                                {!this.state.confirmingCode ?
                                    <Button
                                        title="Confirm Code"
                                        color="#735fbe"
                                        onPress={() => this.confirmCode()}
                                        disabled={this.state.code ? (this.state.code.length !== 6 ? true : false) : true}
                                    /> :
                                    <ActivityIndicator size="small" color="#D3D3D3" />}
                            </View>
                            {!this.state.requestingOtp ?
                                <TouchableOpacity onPress={() => this.signInWithPhoneNumber()}>
                                    <Text style={style.resendCode}>RESEND CODE</Text>
                                </TouchableOpacity> : null
                            }

                        </View>)}
                    <Text style={style.tc}>By signing in you agree to our Terms &amp; Conditions</Text>
                </View>
            </>
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
            marginBottom: 30,
        },

        info1: {
            color: 'white',
            width: '75%',
            fontSize: 13,
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            marginBottom: 10,
        },

        input: {
            alignSelf: 'center',
            textAlign: 'center',
            width: 190,
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
            justifyContent: 'center',
            alignItems: 'center'
        },

        button: {
            marginTop: 15,
            justifyContent: 'center',
            alignSelf: 'center'
        },

        tc: {
            color: 'white',
            fontSize: 7.5,
            alignSelf: 'center',
            position: 'absolute',
            bottom: 15
        },

        underlineStyleBase: {
            width: 30,
            height: 45,
            borderWidth: 0,
            borderBottomWidth: 1,
            color: 'white',

        },

        underlineStyleHighLighted: {
            borderColor: "#735fbe",

        },

        resendCode: {
            color: 'white',
            width: '75%',
            fontSize: 13.5,
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            marginTop: 15,
            marginBottom: 30,
        },

        changeNumber: {
            color: '#735fbe',
            fontSize: 12,
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            marginBottom: 30,
        }
    }
)

export default LoginScreen;