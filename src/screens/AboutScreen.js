import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { HeaderIcon } from '../components/HeaderIcon'

export const AboutScreen = () => (
  <View style={styles.center}>
    <Text>About</Text>
  </View>
)

AboutScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'About app',
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
