/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableHighlight, Linking, Image } from 'react-native';
import Modal from 'react-native-modal';

class BusinessDetailsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            details: props.navigation.getParam('details', null),
            viewOptions: false,
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

    onPressContact = (pNo) => {
        const phoneNumber = 'tel:${' + pNo + '}'
        Linking.openURL(phoneNumber);
    }

    closeModalView = () => {
        this.setState({
            viewOptions: false,
        })
    }

    callBusiness = () => {
        this.setState({
            viewOptions: true,
        })
    }

    renderContactOptions = () => {
        let html = []

        this.state.details.contacts.forEach(element => {
            let icon;
            if (element.length === 12) {
                icon = require('../../Images/bhutan.png');
            }
            else {
                icon = require('../../Images/india.png');
            }

            html.push(
                <TouchableHighlight onPress={() => this.onPressContact(element)}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Image source={icon} style={{ width: 40, height: 25, margin: 10 }}></Image>
                        <Text style={{ color: '#FFFFFF', margin: 10, fontSize: 20 }}>{element}</Text>
                    </View>
                </TouchableHighlight>
            );
        });

        return html;
    }

    render() {
        return (
            <ScrollView style={style.screen}>
                <Modal isVisible={this.state.viewOptions}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        {this.renderContactOptions()}
                        <TouchableHighlight onPress={() => this.closeModalView()}>

                            <Text style={{ color: '#FFFFFF', margin: 10, alignSelf: 'center', fontWeight: 'bold' }}>CLOSE</Text>

                        </TouchableHighlight>
                    </View>
                </Modal>
                <Text style={style.heading}>ABOUT</Text>
                <Text style={style.subHeading}>{this.state.details.about ? this.state.details.about : "NA"}</Text>
                <Text style={style.heading}>ADDRESS</Text>
                <Text style={style.subHeading}>{this.state.details.address ? this.state.details.address : "NA"}</Text>
                <Text style={style.heading}>CATEGORY</Text>
                <Text style={style.subHeading}>{this.state.details.category ? this.state.details.category : "NA"}</Text>
                <Text style={style.heading}>LANDMARK</Text>
                <Text style={style.subHeading}>{this.state.details.landmark ? this.state.details.landmark : "NA"}</Text>
                <View style={style.row}>
                    <View style={{ flex: .5 }}>
                        <Text style={style.heading}>OPEN</Text>
                        <Text style={style.subHeading}>{this.state.details.open_time ? this.state.details.open_time : "NA"}</Text>
                    </View>
                    <View style={{ flex: .5 }}>
                        <Text style={style.heading}>CLOSE</Text>
                        <Text style={style.subHeading}>{this.state.details.close_time ? this.state.details.close_time : "NA"}</Text>
                    </View>
                </View>
                <Text style={style.heading}>PINCODE</Text>
                <Text style={style.subHeading}>{this.state.details.pincode ? this.state.details.pincode : "NA"}</Text>

                <View style={style.button}>

                    <TouchableHighlight
                        style={style.contact}
                        onPress={() => this.callBusiness()}
                        underlayColor='#fff'>
                        <Text style={style.contactText}>CONTACT BUSINESS</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
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
            flex: 1,
        },

        heading: {
            marginTop: 15,
            marginLeft: 15,
            marginBottom: 5,
            fontSize: 14,
            color: '#808080',
            fontWeight: 'bold',
        },

        subHeading: {
            fontSize: 16,
            marginLeft: 15,
            marginRight: 15,
            marginTop: 5,
            fontWeight: 'bold',
        },

        row: {
            flexDirection: 'row',
            width: '100%',
        },

        button: {
            marginTop: 30,
            width: '65%',
            justifyContent: 'center',
            alignSelf: 'center'
        },

        contact: {
            marginRight: 40,
            marginLeft: 40,
            marginTop: 10,
            paddingTop: 15,
            paddingBottom: 15,
            backgroundColor: '#87CEEB',
            borderRadius: 7.5,
        },

        contactText: {
            color: '#332033',
            textAlign: 'center',
            fontWeight: 'bold',
        }
    }
);