import { ImageBackground, StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, Image } from 'react-native-elements';
import { TextElement } from "react-native-elements/dist/text/Text";
import Header from '../pages/Header';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import HotTrends from '../pages/HotTrends';
import { useNavigation } from '@react-navigation/native';



const LoginTemplate = ({ handleLogin }: LoginPageProps) => {


    return (
        <ImageBackground style={styles.backgroundImg} source={require('../../assets/background-welcome-screen.jpg')}>
            <Header title='Twire.' titleColor='#FFFF' />
            <View style={styles.container}>
                {/* <Image source={require('../../assets/2.png')} /> */}
                <TextElement style={styles.Heading}>Welcome,</TextElement>
                <TextElement style={styles.subHeading}>Stay focus in Tech Aera.</TextElement>
                {/* <Button title='start to explore' onPress={() => handleLogin()} /> */}

                <Button title={<TextElement style={styles.buttonText} >Start to explore</TextElement>} iconRight={true} icon={<View style={styles.buttonIconContainer}><Image style={styles.icon} source={require('../../assets/flashlight.png')} /></View>} buttonStyle={styles.button} onPress={() => handleLogin()} />

            </View>
        </ImageBackground>
    )
}

export default LoginTemplate

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    Heading: {
        textAlign: 'center',
        fontSize: 50,
        paddingTop: 70,
        color: 'white'
    },
    subHeading: {
        textAlign: 'center',
        color: 'white'
    },
    backgroundImg: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    headerLogo: {
        padding: 0,
        margin: 0,
        height: 250
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 23,
        width: '100%'
    },
    buttonIconContainer: {
        width: '100%',
        alignItems: 'flex-end',
       position: 'absolute',
       paddingRight: 20
    },
    heading: {
        padding: 0,
        margin: 0,
        fontSize: 50
    },
    button: {
        backgroundColor: '#D7C5BB',
        width: '90%',
        alignSelf: 'center',
        marginTop: '70%',
        paddingVertical: 15,
        borderRadius: 8
    },
    icon: {
        width: 30,
        height: 30,
        alignSelf: 'flex-end'
    }
})