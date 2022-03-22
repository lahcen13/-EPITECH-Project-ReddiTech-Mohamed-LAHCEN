import { View, StyleSheet, Text, TextInput, Switch } from "react-native"
import { Button, Header, HeaderProps, Icon } from "react-native-elements";
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
import store from '../utils/storeCreds'
import { HotTrendsTypes } from "../utils/types";
import {  ScrollView } from 'react-native';


type Props = {}

const HotTrends = (props: Props) => {
   
    const [data, setData] = useState <Array<HotTrendsTypes>>([])

    const context = useContext(globalContext)

    const getDataHotTrends = async () => {
        const tokenObject = await store.get('access_token')
        const token = tokenObject?.value;
        console.log("token:"+token)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + token);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        console.log(token)


        fetch("https://www.reddit.com/r/tech+technology+techsupport/hot/.json")
        .then(response => response.json())
        .then(result => {
            var myloop : Array<HotTrendsTypes> = [];
            for (let i = 0; i < result.data.children.length; i++) {
                myloop.push(
                  { url_post: result.data.children[i].data.url, subreddit:result.data.children[i].data.subreddit_name_prefixed, author_fullname:result.data.children[i].data.author_full_name, title:result.data.children[i].data.title, selftext:result.data.children[i].data.selftext}
                );
              }
              
            setData(myloop);
        }).catch(error => console.log(error));
        }

    useEffect(() => {getDataHotTrends()}, [])

    return (
        
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/1.png')}
                />
                <Text style={styles.title}> Welcome John, </Text>
                <Text style={styles.subTitle}> Here is the Hot Trends on Tech. </Text>
                
            </View>
        
        
            <ScrollView style={styles.containerTopic}>
                {data.map((el,i) => <View key={i} style={styles.topicContent}>
                <Text style={styles.topicTitle}>
                {el.title}
                {el.author_fullname}
                {el.subreddit}
                </Text>
                <Text style={styles.topicText}>
               
                </Text>
                </View>)}
                </ScrollView>
            <View style={styles.containerFooter}>
                <Text onPress={() => {
                    store.remove('access_token').then(() => context.dispatch(setFalseAction))
                }} style={styles.footer}> App built with love.</Text>
            </View>
        </View>
    )
}

export default HotTrends

const styles = StyleSheet.create({
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

    containerLogo: {
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerInputs: {
        justifyContent: 'center',
        flex: 4,
        paddingLeft: 40,
        paddingRight: 40,
    },

    containerContent: {
        justifyContent: 'center', //Centered horizontally
        flex: 3,
    },

    containerFooter: {
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
        flex: 1,
    },

    topicTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#848973',
    },

    topicText:{
        fontSize: 12,
        color: '#848973',
    },

    topicContent: {
        padding: 10, 
    },

    containerTopic: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        borderColor: "#848973",
        borderWidth: 1,
    },

})