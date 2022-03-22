import { View, Text, StyleSheet, Pressable, ScrollView, TouchableOpacity } from "react-native"
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core';
import Header from "./Header";
import SearchBar from "../organisms/SearchBar";
import store from '../utils/storeCreds';
import { globalContext } from "../utils/globalContext";
import { Image } from "react-native-elements/dist/image/Image";

const Topic = () => {
    const [typeDataTopic, setTypeData] = useState<String>("hot");
    const navigation = useNavigation()
    const context = useContext(globalContext)
    const [topics, setTopics] = useState<any>([])
    const [topicDetail, setTopicDetail] = useState<any>();
    const topicsData = async () => {
        let data: any = [];
        const tokenObject = await store.get('access_token')
        const token = tokenObject?.value;
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + token);
        fetch("https://www.reddit.com/r/tech+technology+techsupport/" + typeDataTopic + ".json")
            .then(response => response.json())
            .then(result => {
                for (let $ = 0; $ < result.data.children.length; $++) {
                    data.push({ title: result.data.children[$].data.title, self: result.data.children[$].data.selftext, subreddit: result.data.children[$].data.subreddit, image: result.data.children[$].data.thumbnail, url: result.data.children[$].data.url, readMore: false })
                }
                setTopics(data)
            }).catch(error => console.error(error));
    }

    useEffect(() => {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.log(topicDetail)

    }, [topics, topicDetail])

    useEffect(() => {
        topicsData();
    }, [typeDataTopic])



    return (
        <View style={styles.container}>
            <Header title="Welcome Back." description="You can edit your \n informations."></Header>
            <View style={styles.containerType} >
                <SearchBar></SearchBar>
            </View>



            <View style={styles.containerType}>
                <View style={styles.containerElements}>
                    <View style={styles.containerContent}>
                        <Pressable style={styles.button} onPress={() => setTypeData("hot")}>
                            <Text style={styles.text}>Hot</Text>
                        </Pressable>
                    </View>
                    <View style={styles.containerContent}>
                        <Pressable style={styles.button} onPress={() => setTypeData("top")}>
                            <Text style={styles.text}>Top</Text>
                        </Pressable>
                    </View>
                    <View style={styles.containerContent}>
                        <Pressable style={styles.button} onPress={() => setTypeData("new")}>
                            <Text style={styles.text}>New</Text>
                        </Pressable>
                    </View>
                </View>
            </View>


            <ScrollView style={styles.containerTopic}>
                {topics.length !== 0 && topics.map((n: any, number: any) => {
                    return <TouchableOpacity key={number} onPress={() => { 
                        navigation.navigate("LoadPost",{title: n.title, description: n.self, video: 'video_url', url: n.url, image: n.image})
                         }} style={styles.topicContent}>
                        <Text style={styles.topicTitle}>
                            n/{n.subreddit}
                        </Text>
                        <Text style={styles.topicText}>
                            {n.title}
                        </Text>
                        <View style={styles.center}>
                            {n.image !== 'self' && <Image style={styles.profilPicture} source={{ uri: n.image, }} />}
                        </View>

                    </TouchableOpacity>
                })
                }
            </ScrollView>

            <View style={styles.containerContent}>
                <Pressable style={styles.buttonB} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.textB}>Follow new topics =></Text>
                </Pressable>
            </View>

            <View style={styles.containerFooter}>
                <Text onPress={() => {
                    store.remove('access_token').then(() => context.dispatch(setFalseAction))
                }} style={styles.footer}> App built with love.
                </Text>
            </View>
        </View >
    )
}

export default Topic

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
    }
})





