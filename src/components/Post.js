import React from 'react'
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

import { THEME } from '../theme'

export const Post = ({ post, onOpen }) => (
  <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(post)}>
    <View style={styles.post}>
      <ImageBackground style={styles.image} source={{ uri: post.img }}>
        <View style={styles.textWrap}>
          <Text style={styles.text}>
            {new Date(post.date).toLocaleDateString()}
          </Text>
        </View>
      </ImageBackground>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  post: {
    marginBottom: 15,

    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 200
  },
  textWrap: {
    paddingVertical: 5,

    width: '100%',

    alignItems: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  text: {
    fontFamily: 'openSans-regular',
    color: THEME.COLORS.white
  }
})
