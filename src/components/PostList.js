import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'

import { Post } from './Post'

export const PostList = ({ data, onOpen }) => {
  if (!data.length) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.noItems}>There is no items yet</Text>
      </View>
    )
  }
  return (
    <View style={styles.wrap}>
      <FlatList
        data={data}
        keyExtractor={post => post.id.toString()}
        renderItem={({ item }) => <Post post={item} onOpen={onOpen} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    padding: 10
  },
  noItems: {
    marginVertical: 10,

    fontFamily: 'openSans-regular',
    fontSize: 25,
    textAlign: 'center'
  }
})
