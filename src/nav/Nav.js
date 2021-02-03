import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Platform } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Ionicons } from '@expo/vector-icons'

import { MainScreen } from '../screens/MainScreen'
import { PostScreen } from '../screens/PostScreen'
import { FavsScreen } from '../screens/FavsScreen'
import { AboutScreen } from '../screens/AboutScreen'
import { CreateScreen } from '../screens/CreateScreen'
import { THEME } from '../theme'

const navOptionsConfig = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor:
        Platform.OS === 'android' ? THEME.COLORS.light : THEME.COLORS.light
    },
    headerTintColor:
      Platform.OS === 'android' ? THEME.COLORS.pink : THEME.COLORS.pink
  }
}

const PostNav = createStackNavigator(
  {
    Main: MainScreen,
    Post: PostScreen
  },
  navOptionsConfig
)

const FavsNav = createStackNavigator(
  {
    Favs: FavsScreen,
    Post: PostScreen
  },
  navOptionsConfig
)

const bottomTabsConfig = {
  Post: {
    screen: PostNav,
    navigationOptions: {
      tabBarIcon: (info) => (
        <Ionicons name='ios-home' size={25} color={info.tintColor} />
      ),
      tabBarLabel: () => null
    }
  },
  Favs: {
    screen: FavsNav,
    navigationOptions: {
      tabBarIcon: (info) => (
        <Ionicons name='ios-heart-empty' size={25} color={info.tintColor} />
      ),
      tabBarLabel: () => null
    }
  }
}

const BottomNav =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(bottomTabsConfig, {
        activeTintColor: THEME.COLORS.white,
        barStyle: {
          backgroundColor: THEME.COLORS.pink
        }
        // shifting: true
      })
    : createBottomTabNavigator(bottomTabsConfig, {
        tabBarOptions: {
          activeTintColor: THEME.COLORS.pink
        }
      })

const AboutNav = createStackNavigator(
  {
    About: AboutScreen
  },
  navOptionsConfig
)

const CreateNav = createStackNavigator(
  {
    Create: CreateScreen
  },
  navOptionsConfig
)

const MainNav = createDrawerNavigator(
  {
    PostTabs: {
      screen: BottomNav,
      navigationOptions: {
        drawerLabel: 'Home',
        drawerIcon: <Ionicons name='ios-home' size={25} />
      }
    },
    Create: {
      screen: CreateNav,
      navigationOptions: {
        drawerLabel: 'Create new post',
        drawerIcon: <Ionicons name='ios-add-circle-outline' size={25} />
      }
    },
    About: {
      screen: AboutNav,
      navigationOptions: {
        drawerLabel: 'About app',
        drawerIcon: <Ionicons name='ios-information-circle-outline' size={25} />
      }
    }
  },
  {
    contentOptions: {
      activeTintColor: THEME.COLORS.pink,
      labelStyle: {
        fontFamily: 'openSans-bold',
        fontSize: 20
      }
    }
  }
)

export const Nav = createAppContainer(MainNav)
