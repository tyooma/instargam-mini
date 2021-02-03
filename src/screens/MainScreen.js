import React, { useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'

import { HeaderIcon } from '../components/HeaderIcon'
import { PostList } from '../components/PostList'
import { loadPosts } from '../store/actions/postActions'
import { THEME } from '../theme'

export const MainScreen = ({ navigation }) => {
  const openPostHandler = (post) => {
    navigation.navigate('Post', {
      postId: post.id,
      date: post.date,
      fav: post.fav
    })
  }

  const dispatch = useDispatch()
  const posts = useSelector((state) => state.post.posts)
  const loading = useSelector(state => state.post.loading)

  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch])

  if (loading) {
    <View style={styles.center}>
      <ActivityIndicator color={THEME.COLORS.purple} />
    </View>
  }

  return <PostList data={posts} onOpen={openPostHandler} />
}

MainScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'My blog',
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={HeaderIcon}>
      <Item
        title='Camera'
        iconName='ios-camera'
        onPress={() => navigation.push('Create')}
      />
    </HeaderButtons>
  ),
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
