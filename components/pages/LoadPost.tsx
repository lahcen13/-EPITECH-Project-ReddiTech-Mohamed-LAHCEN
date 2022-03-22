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
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { Video, AVPlaybackStatus } from 'expo-av';


type Props = {}

const LoadPost = (props: Props) => {
    const {title, self,subreddit,image, url } = props.route.params
    const navigation = useNavigation()
    const [data, setData] = useState<Array<HotTrendsTypes>>([])
    const context = useContext(globalContext)
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const getDataHotTrends = async () => {
    const url = props.route.params.url;
    }
    const [imgURL, setImgURL] = useState(props.route.params.url)

    if(imgURL.includes('reddit.com')){
        setImgURL (props.route.params.image)
    }

    useEffect(() => {
        console.log(props.route.params)    
    })

    return (
        <View style={styles.container}>
            <Header title='Detail of the Post' description='Enjoy your Post.' subTitleColor='#A2967E' />

            <ScrollView style={styles.container}>
                <View style={styles.center}>
                    {props.route.params.image !== 'self' && <Image style={styles.profilPicture} source={{ uri: props.route.params.image, }} />}
                </View>
                <Text style={styles.postTitle}>
                    Title :{props.route.params.title}
                </Text>
            
                <Text style={styles.postTitle}>
                    Description :{props.route.params.self}
                </Text>
                <Text style={styles.postTitle}>
                    How to read a post on Twire :{props.route.params.self}
                </Text>
                <Video
                        ref={video}
                        style={styles.video}
                        source={{
                        uri: "https://benjaminobadia.fr/wp-content/gallery/tutorial.mp4",
                        }}
                        useNativeControls
                        resizeMode="contain"
                        isLooping
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
                </View>
                
                <WebView
                    source={{
                    uri: imgURL,
                    }}
                    startInLoadingState
                    scalesPageToFit
                    javaScriptEnabled
                    
                    style={{ 
                        flex: 1,
                        width:500,
                        height:500
                    }}
                    
            />
            </ScrollView>
            <View>
                <Button onPress={() => navigation.navigate("topics")} buttonStyle={styles.searchTopicButton} title={<Text style={styles.customSearchText}>Search Topic..</Text>} icon={<View style={styles.buttonIconContainer}>
                    <Image style={styles.searchIcon} source={require("../../assets/searchIcon.png")} />
                </View>} />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F8F4EF",
        flex: 1,
    },
    input: {
        height: 40,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: "#848973",
        padding: 10,
    },
    containerInputs: {
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    containerContent: {
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center',
    },
    containerType: {
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center',
    },
    containerElements: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#545454',
        width: 100,
        padding: 2,
        marginBottom: 10,
        marginTop: 10,
    },
    text: {
        fontSize: 12,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    containerTopic: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        borderColor: "#848973",
        borderWidth: 1,
    },

    topicContent: {
        padding: 10,

    },
    containerFooter: {
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically

    },
    footer: {
        alignItems: 'center',
        fontSize: 12,
        textAlign: 'center',
        color: "#848973",
    },
    buttonB: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#D7C5BB',
        width: 320,
        marginBottom: 10,
        marginTop: 10,
    },

    textB: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    topicTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#848973',
    },
    postTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#848973',
        margin:15
    },
    topicText: {
        fontSize: 12,
        color: '#848973',
    },
    profilPicture: {
        width: 200,
        height: 100,
    },
    center:{
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
    },

    touchableElement: {
        margin: "5%"
    },
    touchableHeading: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    descScrollView: {
        height: "8%"
    },
    headingText: {
        color: "#848973",
        fontSize: 18,
        fontWeight: "bold"
    },
    followButton: {
        backgroundColor: "#545454",
    },
    buttonMaxWidth: {
        width: "30%",
        maxWidth: "30%",
        minWidth: "30%"
    },
    unFollowButton: {
        backgroundColor: "#D4B6A5",
    },
    followButtonText: {
        color: "white"
    },
    desc: {
        width: "80%",
        color: "#abb194",
        fontSize: 15,

    },
    searchTopicButton: {
        paddingVertical: "5%",
        margin: "5%",
        backgroundColor: "#D4B6A5",
        borderRadius: 8
    },
    customSearchText: {
        color: "white",
        fontSize: 20
    },
    searchIcon: {
        width: 25,
        height: 25,
        margin: 20
    },
    buttonIconContainer: {
        width: '100%',
        alignItems: 'flex-end',
        position: 'absolute',
        paddingRight: 20
    },

    video: {
        alignSelf: 'center',
        width: 320,
        height: 200,
      },
      buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },

})









export default LoadPost