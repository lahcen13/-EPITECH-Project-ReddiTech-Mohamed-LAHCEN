import * as SecureStore from 'expo-secure-store';
import { TokenObjectTypes } from './types';
const store = ( key: string, value: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            await SecureStore.setItemAsync(key, JSON.stringify(value))
            resolve('success')
        } catch (error) {
            reject(error)
        }
    })
}



const get = (k: string): Promise<TokenObjectTypes | undefined> => {
  

    return new Promise(async (resolve, reject) => {
        try {
            const item = await SecureStore.getItemAsync(k)
            resolve(item ? JSON.parse(item): undefined)
        } catch (error) {
            reject(error)
        }
    })
}

type creds = {
    maxDate: string,
    value: string
}

const remove = async (k: string) => {
    try {
        await SecureStore.deleteItemAsync(k)
    } catch (error) {
        console.log(error);
    }
}
export default {
    store,
    get,
    remove
}