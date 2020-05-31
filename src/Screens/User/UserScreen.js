/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, View, Text, StyleSheet, ToastAndroid, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import RNFetchBlob from 'rn-fetch-blob';
import rnfs from 'react-native-fs';

class UserScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profilePicture: require('../../Images/person.png'),
            userDetails: null,
            pNo: null,
            url: null,
            loading: true,
        };
        this.signOutUser = this.signOutUser.bind(this);
    }

    downloadDP = async () => {
        if (this.state.url) {
            const path = RNFetchBlob.fs.dirs.DownloadDir + '/' + this.state.pNo + '.png';
            // if (await rnfs.exists(path)) {
            //     this.setState({ profilePicture: { uri: 'file://' + path } });
            //     return;
            // }
            RNFetchBlob
                .config({
                    fileCache: true,
                })
                .fetch(
                    'GET',
                    this.state.url,
                )
                .progress((received, total) => {
                    console.log('progress', received / total);
                })
                .then(res => {
                    this.setState({ profilePicture: { uri: 'file://' + res.path() } })

                }).catch((err) => {
                    console.log(err);
                });
        }
    }

    getUserDetails = async () => {
        let pNo = null, userDetails = null, url = null;
        try {
            pNo = await auth().currentUser.phoneNumber;
            try {
                userDetails = await firestore().collection('Users').doc(pNo).get();
                try {
                    url = await storage().ref('Users/DPs/' + pNo).getDownloadURL();
                } catch (error) {
                    console.log(error, 'error');
                }
            } catch (error) {
                console.log(error, 'error');
            }
        } catch (error) {
            console.log(error, 'error');
        }
        this.setState({ loading: false, pNo: pNo, userDetails: (userDetails._data ? userDetails._data : null), url: url }, () => this.downloadDP());
    }

    componentWillMount() {
        this.getUserDetails();
    }

    uploadToDatabase = async (pathToFile) => {
        const reference = storage().ref('Users/DPs/' + this.state.pNo);
        const task = reference.putFile(pathToFile);
        task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${task.totalBytes}`);
        });
        task.then(() => {
            ToastAndroid.show('Profile picture uploaded successfully', ToastAndroid.SHORT);
        });
    }

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ profilePicture: response }, () => this.uploadToDatabase(response.path));
            }
        });
    }

    navigateToSplashScreen = () => {
        this.props.navigation.navigate('SplashScreen');
        ToastAndroid.show('Logged off successfully', ToastAndroid.SHORT);
        console.log('User signed out!');
    }

    async signOutUser() {
        auth().signOut().then(() => this.navigateToSplashScreen());
    }

    render() {
        return (
            <View style={style.screen}>
                {this.state.loading ?
                    <ActivityIndicator style={style.indicator} color="#000000" /> :
                    <View style={style.indicator}>
                        <TouchableOpacity style={style.dpContainer} onPress={() => this.handleChoosePhoto()}>
                            <ImageBackground
                                imageStyle={{ borderRadius: 60 }}
                                style={style.dp}
                                source={this.state.profilePicture} />
                        </TouchableOpacity>

                        <View style={style.details}>
                            <Text style={style.detailsText}>
                                {this.state.userDetails.name}
                            </Text>
                            <Text style={style.detailsText}>
                                {this.state.pNo}
                            </Text>
                            <Text style={style.detailsText}>
                                {this.state.userDetails.pincode}
                            </Text>
                        </View>
                        <View style={style.button}>
                            <Button
                                title="SIGN OUT"
                                color="#332033"
                                onPress={() => this.signOutUser()}
                            />
                        </View>
                    </View>}
            </View>
        );
    }
}

export default UserScreen;

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

        dpContainer: {
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignSelf: 'center',
            width: 125,
            height: 125,
            backgroundColor: '#fff',
            borderRadius: 62.5,
        },

        dp: {
            height: 125,
            width: 125,
            justifyContent: 'center',
            alignSelf: 'center'
        },

        detailsText: {
            textAlign: 'center',
            textAlignVertical: 'center',
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
            margin: 10,
        },

        details: {
            marginTop: 30,
            borderWidth: .5,
            borderColor: 'rgba(0,0,0,0.2)',
            alignSelf: 'center',
            width: '65%',
            backgroundColor: '#f6f6f6',
            borderRadius: 2.5,
            elevation: 2.5,
            padding: 10,
        },

        button: {
            marginTop: 30,
            width: '30%',
            justifyContent: 'center',
            alignSelf: 'center'
        },
    }
);