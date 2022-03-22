import axios from "axios"
import storeCreds from "./storeCreds";
import srs from "../../assets/json/subreddits.json"
import { getAllSubscribedType } from "./types";

const getAllSubscribed: getAllSubscribedType = async () =>  {
    const token = await storeCreds.get("access_token")
    console.log("TOKEN",token);
    const subscribed: Array<Object> = []
   for (let i = 0; i < srs.length; i++) {
    const subs = await axios.get("https://oauth.reddit.com/" + srs[i] + "/about.json", {
        headers: {
            "Authorization": "Bearer " + token?.value
        }
    })
    // console.log("SUUUBS", subs);
    if (await subs.data.data.user_is_subscriber === true) {
        subscribed.push(subs.data.data.display_name)
    }
       
   }

   return subscribed
}

export  {
    getAllSubscribed
}