import handleExpiration from "./handleExpiration"
import storeCreds from "./storeCreds"



const  isAuthenticated  = async (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const creds = await storeCreds.get('access_token')
            if (!creds) resolve(false)
            if (creds && handleExpiration.isExpired(creds.maxDate)) resolve(false)
            resolve(true)
        } catch (error) {
            reject(error)
            
        }
     })
   
  
   
}

export default isAuthenticated
