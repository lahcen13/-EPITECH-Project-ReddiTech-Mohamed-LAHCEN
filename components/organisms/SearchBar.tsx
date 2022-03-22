import { StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'react-native-elements'
import storeCreds from '../utils/storeCreds'
import { searchBarProps } from '../utils/types'


const SearchBar = (props: searchBarProps) => {
    const [value, setValue] = useState<string>("")
    

  const fetchResults = async () => {
      const token = await storeCreds.get("access_token")
    axios.get("https://www.reddit.com/search/.json?q=" + value + "&sort=relevance&limit=20")
    .then(async result => {
        // console.log("VVVVVVVVVV", value);
        
        const data = []
        const {children} = result.data.data
        // console.log("SIIIIIZE", children.length);
        
        for (let $ = 0; $ < children.length; $++) {
            // console.log(children[$]);
            
            data.push({ title: children[$].data.title, self: children[$].data.selftext, subreddit: children[$].data.subreddit, image: children[$].data.thumbnail, url: children[$].data.url, readMore: false })
        }
        props.getSearchResults(await data)
        
    })
    .catch(err => console.log(err))
  }
    return (
        <View style={styles.searchBarContainer}>
            <TextInput onChangeText={setValue} placeholderTextColor='#545454' placeholder='Search a topic...' style={styles.searchInput} />
            <View style={styles.searchIconContainer}>
               <Button onPress={() => fetchResults()} buttonStyle={styles.customSearchIconStyle} icon={<Image style={styles.searchBarIcon} source={require("../../assets/searchIcon.png")} />} />
            </View>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    searchBarContainer: {
        width: "89%",
        borderColor: '#848973',
        borderWidth: 1.5,
        justifyContent: "center"
    },
    searchInput: {
        padding: 10,
        fontSize: 20,
        textAlign: 'center'
    },

    searchIconContainer: {
        justifyContent: "center",
        alignItems: "flex-end",
        position: "absolute",
        width: "100%",
        height: "100%"
    },
    searchBarIcon: {
        width: 25,
        height: 25,
        margin: 20
    },
    customSearchIconStyle: {
        backgroundColor: "rgba(255,255,255,0)"
    }
})