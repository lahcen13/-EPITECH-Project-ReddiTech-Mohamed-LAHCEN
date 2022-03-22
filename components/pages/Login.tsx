import React, { useContext, useEffect } from 'react'

import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import config from "../../config";
import axios from 'axios'
import buffer from 'buffer'

import storeCreds from "../utils/storeCreds";
import addToCurrentDate from '../utils/convertTodate'
import { globalContext } from "../utils/globalContext";
import { setTrueAction } from "../utils/actions";
import LoginTemplate from "../templates/LoginTemplate";
import isAuthenticated from "../utils/isAuthenticated";
import { useNavigation } from '@react-navigation/core';
const Buffer = buffer.Buffer

WebBrowser.maybeCompleteAuthSession();
const discovery = {
    authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize',
    tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
};

const Login = (props: any) => {
    const navigation = useNavigation()

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: config.app_id,
            scopes: ['*'],
            redirectUri: makeRedirectUri({
                native: 'exp://localhost:19000'
            })
        },
        discovery
    )
    const context = useContext(globalContext)
    const proceed = () => {

        isAuthenticated().then(async isAuth => {
            if (isAuth) {
                console.log("is authed");
                context.dispatch(setTrueAction)
                navigation.navigate('home')
            } else {
                console.log("not authed");

                promptAsync()
            }
        })
    }



    useEffect(() => {
        const encodedAppID = Buffer.from(config.app_id + ':').toString('base64')
        if (response?.type === 'success') {
            response.type = "error"
            const { code } = response.params;
            const params = `grant_type=authorization_code&code=${code}&redirect_uri=${makeRedirectUri({
                native: 'exp://localhost:19000'
            })}`
            axios.post(discovery.tokenEndpoint, params, {
                headers: {
                    'Authorization': `Basic ${encodedAppID}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            ).then(res => {

                storeCreds.store('access_token', { value: res.data.access_token, maxDate: addToCurrentDate(res.data.expires_in) })

                    .then(() => {
                        context.dispatch(setTrueAction)
                        navigation.navigate('home')
                    })
                    .catch(err => { throw err })
            })
                .catch(err => { throw err })

        }
    }, [response])

    return (
        <LoginTemplate handleLogin={() => proceed()} />
    )
}



export default Login

