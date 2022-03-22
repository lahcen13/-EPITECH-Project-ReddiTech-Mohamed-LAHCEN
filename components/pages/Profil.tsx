import { View, StyleSheet, Text, TextInput, Switch, ScrollView, Pressable } from "react-native"
import { Button, HeaderProps, Icon } from "react-native-elements";
import React, { useContext, useEffect, useState } from 'react'
import { authorize } from 'react-native-app-auth';
import { AuthSessionResult, makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import config from "../../config";
import axios from 'axios'
import { Image } from "react-native-elements/dist/image/Image";
import { Tile } from "react-native-elements/dist/tile/Tile";
import { globalContext } from "../utils/globalContext";
import { setFalseAction } from "../utils/actions";
import store from '../utils/storeCreds';
import { UserProfileTypes, UserProfileIsEnabled } from "../utils/types";
import Header from "./Header";
import { useNavigation } from '@react-navigation/core';


type Props = {}
    
const Profil = (props: Props) => {
    const [isEnabled, setIsEnabled] = useState<UserProfileIsEnabled>({
        adultContent: false,
        autoplay: false,
    });
    const [userData, setUserData] = useState<any>(undefined);
    const [booleanData, setBooleanData] = useState<any>();
    const navigation = useNavigation()


    const toggleSwitch = (inputName: string, value: boolean) => setIsEnabled({ ...isEnabled, [inputName]: !value });


    const context = useContext(globalContext)

    const getDataProfil = async () => {
        const tokenObject = await store.get('access_token')
        const token = tokenObject?.value;
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + token);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch("https://oauth.reddit.com/api/v1/me?access_token= " + token, requestOptions)
            .then(response => response.json())
            .then(result => {
                setUserData({ pseudo: result.name, img: result.subreddit.icon_img, description: result.subreddit.public_description })
            }).catch(error => console.log(error));
    }
    const getBooleanData = async () => {
        const tokenObject = await store.get('access_token')
        const token = tokenObject?.value;
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + token);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        fetch("https://oauth.reddit.com/api/v1/me/prefs", requestOptions)
            .then(response => response.json())
            .then(result => {
                setBooleanData({
                    video_autoplay: result.video_autoplay,
                    over_18: result.over_18,
                    enable_followers: result.enable_followers,
                    show_twitter: result.show_twitter,
                    show_presence: result.show_presence,
                    show_trending: result.show_trending
                })
            }).catch(error => console.error(error));
    }

    useEffect(() => {
        getDataProfil()
        getBooleanData()
    }, [])

    const submitData = async () => {
        const tokenObject = await store.get('access_token')
        const token = tokenObject?.value;
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + token);
        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: JSON.stringify(booleanData),
        };
        fetch("https://oauth.reddit.com/api/v1/me/prefs", requestOptions)
            .then(response => response.json())
            .catch(error => console.error(error));
    }


    useEffect(() => {
        submitData();
    }, [booleanData])


    return (
        <ScrollView>
            <View style={styles.container}>
                
                <Header title="Welcome Back." description="You can edit your informations."></Header>
                {!userData || booleanData===undefined ? console.log("no data yet") : <>
                    <View style={styles.containerProfilPicture}>
                        <Image
                            style={styles.profilPicture}
                            source={{
                                uri: userData.img,
                            }}
                        /> 
                    </View>
                    <View style={styles.containerInputs}>
                        <TextInput
                            style={styles.input}
                            value={userData?.pseudo}
                            editable={false}
                        />
                        <TextInput
                            style={styles.input}
                            value={userData?.description !== "" ? userData.description : "No description"}
                            editable={false}
                        />
                    </View>
                    <Text style={styles.subTitle}>Here is the App Settings.</Text>
                    <View style={styles.containerContent}>
                        <View style={styles.containerElements}>
                            <Text style={styles.subTitleWidth}>Enable followers</Text>
                            <Switch
                                trackColor={{ false: "#D7C5BB", true: "#848973" }}
                                thumbColor={booleanData.enable_followers ? "white" : "white"}
                                ios_backgroundColor="#848973"
                                onValueChange={() => setBooleanData({ ...booleanData, enable_followers: !booleanData.enable_followers })}
                                value={booleanData.enable_followers}
                            />
                        </View>
                        <View style={styles.containerElements}>
                            <Text style={styles.subTitleWidth}>Adult content</Text>
                            <Switch
                                trackColor={{ false: "#D7C5BB", true: "#848973" }}
                                thumbColor={booleanData.over_18 ? "white" : "white"}
                                ios_backgroundColor="#848973"
                                onValueChange={() => setBooleanData({ ...booleanData, over_18: !booleanData.over_18 })}
                                value={booleanData.over_18}
                            />
                        </View>

                        <View style={styles.containerElements}>
                            <Text style={styles.subTitleWidth}>Show presence</Text>
                            <Switch
                                trackColor={{ false: "#D7C5BB", true: "#848973" }}
                                thumbColor={booleanData.show_presence ? "white" : "white"}
                                ios_backgroundColor="#848973"
                                onValueChange={() => setBooleanData({ ...booleanData, show_presence: !booleanData.show_presence })}
                                value={booleanData.show_presence}
                            />
                        </View>

                        <View style={styles.containerElements}>
                            <Text style={styles.subTitleWidth}>Show trending</Text>
                            <Switch
                                trackColor={{ false: "#D7C5BB", true: "#848973" }}
                                thumbColor={booleanData.show_trending ? "white" : "white"}
                                ios_backgroundColor="#848973"
                                onValueChange={() => setBooleanData({ ...booleanData, show_trending: !booleanData.show_trending })}
                                value={booleanData.show_trending}
                            />
                        </View>

                        <View style={styles.containerElements}>
                            <Text style={styles.subTitleWidth}>Show twitter</Text>
                            <Switch
                                trackColor={{ false: "#D7C5BB", true: "#848973" }}
                                thumbColor={booleanData.show_twitter ? "white" : "white"}
                                ios_backgroundColor="#848973"
                                onValueChange={() => setBooleanData({ ...booleanData, show_twitter: !booleanData.show_twitter })}
                                value={booleanData.show_twitter}
                            />
                        </View>

                        <View style={styles.containerElements}>
                            <Text style={styles.subTitleWidth}>Video autoplay</Text>
                            <Switch
                                trackColor={{ false: "#D7C5BB", true: "#848973" }}
                                thumbColor={booleanData.video_autoplay ? "white" : "white"}
                                ios_backgroundColor="#848973"
                                onValueChange={() => setBooleanData({ ...booleanData, video_autoplay: !booleanData.video_autoplay })}
                                value={booleanData.video_autoplay}
                            />
                        </View>

                        <View style={styles.containerContent}>
                            <Pressable style={styles.button} onPress={() => navigation.navigate('home')}>
                                <Text style={styles.text}>Follow new content</Text>
                            </Pressable>
                        </View>
                    </View>
                </>}
                <View style={styles.containerFooter}>
                    <Text onPress={() => {
                        store.remove('access_token').then(() => context.dispatch(setFalseAction))
                    }} style={styles.footer}> LOGOUT</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default Profil

const styles = StyleSheet.create({
    profilPicture: {
        width: 100,
        height: 100,
        borderRadius: 1000,
    },
    title: {
        fontSize: 35,
        fontWeight: "bold",
        textAlign: 'center',
        color: "#848973",
    },

    subTitle: {
        fontWeight: "bold",
        textAlign: 'center',
        color: "#A2967E",
    },

    tinyLogo: {
        width: 170,
        height: 100,
    },

    input: {
        height: 40,
        margin: 10,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: "#848973",
        padding: 10,
    },

    marginSubTitle: {
        marginHorizontal: 10,
        marginBottom: 40,
    },

    button: {
        width: 100,
    },

    containerElements: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },

    subTitleWidth: {
        width: 200,
        fontWeight: "bold",
        color: "#A2967E",
    },

    footer: {
        alignItems: 'center',
        fontSize: 12,
        textAlign: 'center',
        color: "#848973",
    },

    container: {
        backgroundColor: "#F8F4EF",
        flex: 1,
    },
    
    containerProfilPicture: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerLogo: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerInputs: {
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40,
    },

    containerContent: {
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center',
    },

    containerFooter: {
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically

    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#D7C5BB',
        width: 300,
        marginBottom: 30,
        marginTop: 30,
    },

    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

})