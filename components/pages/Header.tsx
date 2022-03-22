import { View, Text, StyleSheet } from "react-native"
import { Button } from "react-native-elements";
import React, { useEffect } from 'react'
import { authorize } from 'react-native-app-auth';
import { AuthSessionResult, makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios'
import { Image } from "react-native-elements/dist/image/Image";


type Props = {
    title: string,
    description?: string,
    titleColor?: string,
    subTitleColor?: string,
    copyrightColor?: string
}



const Header = ({ title, description, titleColor, subTitleColor, copyrightColor }: Props) => {
    const styles = StyleSheet.create({
        title: {
            fontSize: 35,
            marginBottom: 3,
            fontWeight: "bold",
            textAlign: 'center',
            color: titleColor ? titleColor : "#848973"
        },

        subTitle: {
            fontWeight: "bold",
            textAlign: 'center',
            color: subTitleColor ? subTitleColor : "#848973"
        },

        containerLogo: {
            height: 220,
            justifyContent: 'center',
            alignItems: 'center',
        },

        tinyLogo: {
            width: 170,
            height: 80,
        },

        copyright: {
            color: copyrightColor ? copyrightColor : "#FFFFFF",
            fontSize: 15,
            marginLeft: 90,

            marginBottom: -10

        }

    })
    

    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Image style={styles.tinyLogo} source={require('../../assets/1.png')} />
                <Text style={styles.copyright}> © </Text>
                <Text style={styles.title}> {title} </Text>
                {description && <Text style={styles.subTitle}> {description} </Text>}
            </View>
        </View>

    )
}

export default Header




