import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import {  Image,Button } from 'react-native-elements';
import store from '../utils/storeCreds'
import srs from "../../assets/json/subreddits.json"
import Header from './Header';
import { getAllSubscribedType } from '../utils/types';
import { getAllSubscribed } from '../utils/getSubscribedSubreddits';
import { subscribeOne, unSubscribeOne } from '../utils/handleSubredditSubscription';
import { useNavigation } from '@react-navigation/core';

type Props = {}

function SelectSubReddits({ }: Props) {
    const [subReddits, setSubReddits] = useState<any>([])
    const [followers, setFollowers] = useState<any>([])
    const [changeObserver, setChangeObserver] = useState(false)
    const navigation = useNavigation()

    const followersReddit = async () => {
        let data: any = [];
        const tokenObject = await store.get('access_token')
        const token = tokenObject?.value;
        var myHeaders = new Headers();
        var table:any= [];
        myHeaders.append("Authorization", "bearer " + token);
      
        for (let index = 0; index < subReddits.length; index++) {
            var variable = await axios.get("https://www.reddit.com/"+subReddits[index].name+".json")
            table.push(variable.data.data.children[0].data.subreddit_subscribers)
        }
        setFollowers(table)
    }

    useEffect(() => {
        if (subReddits.length < 1) {
            getSubReddit().then(res => setSubReddits(res))
        }
        if (followers.length===0){    
            followersReddit()
        }


    }, [subReddits])

    useEffect(() => {

        getSubReddit().then(res => setSubReddits(res))
    }, [setChangeObserver, changeObserver])

    const getSubReddit = async () => {
        let array: Array<Object> = []
        const token = await store.get("access_token")
        for (let i = 0; i < srs.length; i++) {
            await axios.get(`https://oauth.reddit.com/${srs[i]}/about.json`, {
                headers: {
                    "Authorization": "Bearer " + token?.value
                }
            })
                .then(el => {
                    array.push({
                        name: srs[i],
                        desc: el.data.data.public_description,
                        subscriber: el.data.data.accounts_active,
                        user_is_subscriber: el.data.data.user_is_subscriber,
                        img: el.data.data.banner_img,
                        subs: el.data.data.subreddit_subscribers   
                    });                   
                }
                )
                .catch(err => console.log(err)
                )
        }

        return await array
    }
   

    const handleSubAndUnsub = (isSub: boolean, name: string) => {
        if (!isSub) {
            subscribeOne(name).then(() => setChangeObserver(!changeObserver)
            ).catch(err => console.error("ERRRRR", err)
            )
        } else {
            unSubscribeOne(name).then(() => setChangeObserver(!changeObserver))
        }
    }

    return (
        <View style={styles.container}>
            <Header title='Welcome' description='Select your Best Subreddits' />
            <Button
                title="My Profil"
                onPress={() => navigation.navigate('profil')}
                buttonStyle={{
                    backgroundColor: "#545454",
                  }}
            />
            <ScrollView>

                {subReddits.map((el: { name: string, desc: string, user_is_subscriber: boolean }, i: number) => <View style={styles.touchableElement} key={i}>

                    <View style={styles.touchableHeading}>
                        <Text style={styles.headingText}>{el.name}</Text>

                        <View style={styles.buttonMaxWidth}>
                            <Button title={<Text style={styles.followButtonText}> {el.user_is_subscriber ? "unfollow" : "follow"} </Text>} buttonStyle={el.user_is_subscriber ? styles.unFollowButton : styles.followButton} onPress={() => handleSubAndUnsub(el.user_is_subscriber, el.name.split('/')[1])} />
                        </View>
                    </View>
                    <ScrollView nestedScrollEnabled style={styles.descScrollView}>
                        <Text style={styles.desc}>{el.desc}</Text>
                    </ScrollView>
                    <View style={styles.containerElements}>
                       
                    

                    <Image style={styles.tinyLogo} source={require('../../assets/followers.png')} />
                    <Text style={styles.number}>{followers[i]}</Text>
                    </View>
                    <View style={styles.containerPicture}>
                    {
                        el.img === "" ? <View></View> : <Image style={styles.profilPicture} source={{ uri: el.img, }} />
                    }
                    </View>
                   

                </View>
                )}
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
    containerPicture: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        
    },
    number:{
        marginTop:10,
        marginLeft:15,
    },

    profilPicture: {
        marginTop: 20,
        width: 200,
        height: 100,
        borderRadius: 5,
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
    containerElements: {
        flexDirection: 'row',
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
    tinyLogo: {
        width: 25,
        height: 40,
    }


})

export default SelectSubReddits