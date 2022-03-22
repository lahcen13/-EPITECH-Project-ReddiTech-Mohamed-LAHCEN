import axios from "axios"
import storeCreds from "./storeCreds"


const subscribeOne = (sr: string) => new Promise( async (resolve, reject) => {
    const encoded = `action=sub&sr_name=${sr}`
 
    const token = await storeCreds.get("access_token")
    axios.post("https://oauth.reddit.com/api/subscribe",encoded , {
        headers: {
            "Authorization": "Bearer " + token?.value
            // "content-type": "application/x-www-form-urlencoded"
        }
    }).then(res => resolve(res))
    .catch(err => reject(err))
})

const unSubscribeOne = (sr: string) => new Promise( async (resolve, reject) => {
    const encoded = `action=unsub&sr_name=${sr}`
 
    const token = await storeCreds.get("access_token")
    axios.post("https://oauth.reddit.com/api/subscribe",encoded , {
        headers: {
            "Authorization": "Bearer " + token?.value
            // "content-type": "application/x-www-form-urlencoded"
        }
    }).then(res => resolve(res))
    .catch(err => reject(err))
})

export {
    subscribeOne,
    unSubscribeOne
}