import * as Font from 'expo-font'
import { DB } from './db'

export async function bootstrap() {
  try {
    await Font.loadAsync({
      'openSans-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
      'openSans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
    })
    await DB.init()
  } catch (e) {
    console.log('Error', e)
  }
}
