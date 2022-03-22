import React, { useContext } from 'react'
import { Text, View, StyleSheet, Button, TextInput } from 'react-native'
import { Input } from 'react-native-elements'
import { Image } from 'react-native-elements/dist/image/Image'
import LoadTrends from '../organisms/LoadTrends'
import SearchBar from '../organisms/SearchBar'
import { setFalseAction } from '../utils/actions'
import { globalContext } from '../utils/globalContext'
import storeCreds from '../utils/storeCreds'

import Header from './Header'

// import { Button } from 'react-native-elements/dist/buttons/Button'

type Props = {}

function Home({ }: Props) {
  const context = useContext(globalContext)
  return (

    <View style={styles.container}>
      <Header title='Welcome john,' description='Here is your Dashboard. Enjoy.' subTitleColor='#A2967E' />
      <View style={styles.body}>
        <SearchBar />
        <LoadTrends />
      </View>
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F4EF",

  },
  body: {
    alignItems: "center"
  }
})
export default Home