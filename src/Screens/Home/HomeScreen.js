/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

const locationIcon = require('../../Images/pin.png');
const starIcon = require('../../Images/star.png');

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            leads: null,
            loading: true,
        };
    }

    componentWillMount() {
        this.fetchLeads();
    }

    fetchLeads = async () => {
        const leads = await firestore().collection('Leads').get();
        this.setState({
            leads: leads.docs.map(doc => doc.data()),
            loading: false,
        });
    }

    navigateToDetailScreen = (item) => {
        console.log('item is', item);
        this.props.navigation.navigate('Details', { details: item});
    }

    render() {
        return (
            <ScrollView style={style.screen}>
                {this.state.loading ?
                    <ActivityIndicator style={style.indicator} color="#000000" /> :
                    <FlatList
                        data={this.state.leads}
                        renderItem={({ item }) => <Item item={item} navigateToDetailScreen={this.navigateToDetailScreen} />}
                    />
                }
            </ScrollView>
        );
    }
}

export default HomeScreen;

function Item({ item }) {
    return (
        <TouchableOpacity style={style.cardStyle} onPress={() => this.props.navigateToDetailScreen(item)}>
            <View style={{ flexDirection: 'row' }}>
                <View style={style.view}>
                    <Text style={style.title}>{item.business_name}</Text>
                </View>
                {item.rating !== 0 ?
                    <View style={style.view}>
                        <Image source={starIcon} style={style.iconStyle} />
                        <Text style={style.rating}>{item.rating}</Text>
                    </View> : null}
            </View>
            <View style={{ flexDirection: 'column', marginTop: 5 }}>
                <View style={style.view}>
                    <Image source={locationIcon} style={style.iconStyle} />
                    <Text style={style.address}>{item.address}</Text>
                </View>
                <View style={style.view}>
                    {/* <Image source={bedIcon} style={Styles.bedStyle} /> */}
                    <Text style={style.category}>{item.category.toUpperCase()}</Text>
                </View>
                <View style={style.view}>
                    {/* <Text style={Styles.cityTextStyleBold}> Lead Type: </Text> */}
                    <Text style={style.about}>{item.about}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create(
    {
        screen: {
            backgroundColor: 'white',
            width: '100%',
            height: '100%',
        },

        indicator: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
        },

        cardStyle: {
            height: 'auto',
            borderRadius: 5,
            padding: 20,
            margin: 10,
            width: 'auto',
            backgroundColor: 'white',
            elevation: 2,
        },

        view: {
            flexDirection: 'row',
            margin: 5,
        },

        iconStyle: {
            height: 20,
            width: 20,
            marginRight: 8,
            alignSelf: 'center',
        },

        title: {
            fontSize: 28,
            marginRight: 20,
        },

        rating: {
            fontSize: 14,
            fontWeight: 'bold',
            marginLeft: 5,
            marginRight: 5,
            alignSelf: 'center',
        },

        address: {
            fontSize: 16,
            fontWeight: 'bold',
        },

        category: {
            fontSize: 17,
            fontWeight: 'bold',
        },

        about: {
            fontSize: 16,
            fontStyle: 'italic',
        },
    }
);
