import React from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'

import { HeaderIcon } from '../components/HeaderIcon'
import { PostList } from '../components/PostList'

export const FavsScreen = ({ navigation }) => {
  const openPostHandler = (post) => {
    navigation.navigate('Post', {
      postId: post.id,
      date: post.date,
      fav: post.fav
    })
  }

  const favs = useSelector((state) => state.post.favs)

  return <PostList data={favs} onOpen={openPostHandler} />
}

FavsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Favs',
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
