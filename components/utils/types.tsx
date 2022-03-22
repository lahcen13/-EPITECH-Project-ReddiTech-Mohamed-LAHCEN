type storeStateTypes = {
    isAuthenticated: boolean
}
type actionTypes = {
    type: string,
    value: any
}


type TokenObjectTypes = {
    maxDate: string,
    value: string
}

type UserProfileTypes = {
    pseudo: string,
    img: string,
    description:string,
    over_18:boolean,
    autoPlay:boolean,
    autoplay_video:boolean
}


type HotTrendsTypes= {
    url_post: string,
    subreddit: string,
    author_fullname:string,
    title:string,
    selftext: string
}

type LoadPostTypes = {
    title: string,
    img: string,
    video: string,
    description: string,
    url: string,
}


type UserProfileIsEnabled = {
    adultContent:boolean,
    autoplay:boolean

}
type getAllSubscribedType = () => Promise<Array<Object>>

interface searchBarProps {
    getSearchResults: (results: Array<Object>) => void
}

export {
    searchBarProps,
    storeStateTypes,
    actionTypes,
    TokenObjectTypes,
    UserProfileTypes,
    getAllSubscribedType,
    UserProfileIsEnabled,
    HotTrendsTypes,
    LoadPostTypes,
}