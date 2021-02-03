import React, { useEffect, useCallback } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  Alert
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'

import { THEME } from '../theme'
import { HeaderIcon } from '../components/HeaderIcon'
import { removePost, toggleFavs } from '../store/actions/postActions'

export const PostScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const postId = navigation.getParam('postId')

  const post = useSelector((state) =>
    state.post.posts.find((post) => post.id === postId)
  )

  const toggleHandler = useCallback(() => {
    dispatch(toggleFavs(post))
  }, [dispatch, post])

  const fav = useSelector((state) =>
    state.post.favs.some((post) => post.id === postId)
  )

  useEffect(() => {
    navigation.setParams({ fav })
  }, [fav])

  useEffect(() => {
    navigation.setParams({ toggleHandler })
  }, [])

  const removeHandler = () => {
    Alert.alert(
      'Delete post',
      'Are you sure you want delete this post?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress() {
            navigation.navigate('Main')
            dispatch(removePost(postId))
          }
        }
      ],
      { cancelable: false }
    )
  }

  if (!post) {
    return null
  }

  return (
    <ScrollView>
      <Image source={{ uri: post.img }} style={styles.image} />
      <View style={styles.textWrap}>
        <Text style={styles.text}>{post.text}</Text>
      </View>
      <Button title='Delete' color={THEME.COLORS.red} onPress={removeHandler} />
    </ScrollView>
  )
}

PostScreen.navigationOptions = ({ navigation }) => {
  const date = navigation.getParam('date')
  const fav = navigation.getParam('fav')
  const toggleHandler = navigation.getParam('toggleHandler')
  const iconName = fav ? 'ios-heart' : 'ios-heart-empty'

  return {
    headerTitle: `Post ${new Date(date).toLocaleDateString()}`,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderIcon}>
        <Item title='Fav' iconName={iconName} onPress={toggleHandler} />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  textWrap: {
    padding: 10
  },
  text: {
    fontFamily: 'openSans-regular'
  }
})
