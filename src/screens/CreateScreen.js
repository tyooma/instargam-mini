import React, { useState, useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch } from 'react-redux'

import { HeaderIcon } from '../components/HeaderIcon'
import { PhotoPicker } from '../components/PhotoPicker'
import { addPost } from '../store/actions/postActions'
import { THEME } from '../theme'

export const CreateScreen = ({ navigation }) => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const [imgUri, setImgUri] = useState()

  const saveHandler = () => {
    const post = {
      date: new Date().toJSON(),
      text: text,
      img: imgUri,
      fav: false
    }
    dispatch(addPost(post))
    navigation.navigate('Main')
  }

  const photoPickHandler = (uri) => {
    setImgUri(uri)
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Create new post</Text>
          <TextInput
            style={styles.input}
            placeholder='Add description'
            value={text}
            onChangeText={setText}
            multiline
          />
          <PhotoPicker onPick={photoPickHandler} />
          <Button
            title='Create'
            color={THEME.COLORS.purple}
            onPress={saveHandler}
            disabled={!imgUri}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

CreateScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Create post',
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderIcon}>
      <Item
        title='Drawer'
        iconName='ios-menu'
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  )
})

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  },
  title: {
    marginVertical: 10,

    fontFamily: 'openSans-regular',
    fontSize: 20,
    textAlign: 'center'
  },
  input: {
    padding: 10,
    marginBottom: 10
  }
})
