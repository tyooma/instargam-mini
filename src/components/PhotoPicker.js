import React, { useState } from 'react'
import { StyleSheet, View, Image, Button, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

async function askForPermissions() {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.CAMERA_ROLL
  )

  if (status !== 'granted') {
    Alert.alert('Camera opening error', 'You need to grant access rights')
    return false
  }

  return true
}

export const PhotoPicker = ({ onPick }) => {
  const [img, setImg] = useState(null)

  const takePhoto = async () => {
    const hasPermissions = await askForPermissions()

    if (!hasPermissions) {
      return
    }

    const imgFromCamera = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: false,
      aspect: [16, 9]
    })

    setImg(imgFromCamera.uri)
    onPick(imgFromCamera.uri)
  }

  return (
    <View style={styles.wrapper}>
      <Button title='Take a photo' onPress={takePhoto} />
      {img && <Image style={styles.image} source={{ uri: img }} />}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10
  },
  image: {
    marginBottom: 10,

    width: '100%',
    height: 200
  }
})
