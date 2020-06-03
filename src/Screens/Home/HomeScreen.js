/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
// import { TextInput } from 'react-native-paper';

const locationIcon = require('../../Images/pin.png');
const starIcon = require('../../Images/star.png');

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            leads: null,
            loading: true,
            dataSource: null,
            active: false,
        };
    }

    componentWillMount() {
        this.fetchLeads();
    }

    fetchLeads = async () => {
        const leads = await firestore().collection('Leads').get();
        const data = leads.docs.map(doc => doc.data());
        this.setState({
            leads: data,
            dataSource: data,
            loading: false,
        });
    }

    navigateToDetailScreen = (item) => {
        console.log('item is', item);
        this.props.navigation.navigate('Details', { details: item });
    }

    searchFilterFunction = (text) => {
        const newData = this.state.leads.filter(function (item) {
            const itemData = item.business_name.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            dataSource: newData,
            text: text,
        });
    }

    render() {
        return (
            <View style={style.screen}>
                {this.state.loading ?
                    <ActivityIndicator style={style.indicator} color="#000000" /> :
                    <View>
                        <TextInput
                            pointerEvents="none"
                            style={style.search}
                            placeholder="Search for business..."
                            underlineColorAndroid="transparent"
                            onChangeText={text => this.searchFilterFunction(text)}
                            autoCorrect={false}
                            selectionColor={'black'}
                            autoCapitalize="characters"
                        />
                        <FlatList
                            contentContainerStyle={{ paddingBottom: 100 }}
                            data={this.state.dataSource}
                            renderItem={({ item }) => <Item item={item} navigateToDetailScreen={this.navigateToDetailScreen} />}
                        />
                    </View>
                }
            </View>
        );
    }
}

export default HomeScreen;

function Item(props) {
    return (
        <TouchableOpacity style={style.cardStyle} onPress={() => props.navigateToDetailScreen(props.item)}>
            <View style={{ flexDirection: 'row' }}>
                <View style={style.view}>
                    <Text style={style.title}>{props.item.business_name}</Text>
                </View>
                {props.item.rating !== 0 ?
                    <View style={style.view}>
                        <Image source={starIcon} style={style.iconStyle} />
                        <Text style={style.rating}>{props.item.rating}</Text>
                    </View> : null}
            </View>
            <View style={{ flexDirection: 'column', marginTop: 5 }}>
                <View style={style.view}>
                    <Image source={locationIcon} style={style.iconStyle} />
                    <Text style={style.address}>{props.item.address}</Text>
                </View>
                <View style={style.view}>
                    {/* <Image source={bedIcon} style={Styles.bedStyle} /> */}
                    <Text style={style.category}>{props.item.category.toUpperCase()}</Text>
                </View>
                <View style={style.view}>
                    {/* <Text style={Styles.cityTextStyleBold}> Lead Type: </Text> */}
                    <Text style={style.about}>{props.item.about}</Text>
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

        search: {
            margin: 20,
            height: 50,
            textAlign: 'center',
            borderRadius: 25,
            borderWidth: 1,
            backgroundColor: '#f6f6f6',
            borderColor: '#4d2e4d',
        },

        cardStyle: {
            height: 'auto',
            borderRadius: 5,
            paddingTop: 10,
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 5,
            margin: 20,
            width: 'auto',
            backgroundColor: '#f6f6f6',
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
            fontSize: 26,
            marginRight: 20,
        },

        rating: {
            fontSize: 13,
            fontWeight: 'bold',
            marginLeft: 5,
            marginRight: 5,
            alignSelf: 'center',
        },

        address: {
            fontSize: 13,
            fontWeight: 'bold',
        },

        category: {
            fontSize: 15,
            fontWeight: 'bold',
        },

        about: {
            fontSize: 15,
            fontStyle: 'italic',
        },
    }
);
