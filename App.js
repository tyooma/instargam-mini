import React, { useState } from 'react'
import { AppLoading } from 'expo'
import { Provider } from 'react-redux'

import { bootstrap } from './src/bootstrap'
import { Nav } from './src/nav/Nav'
import store from './src/store'

export default function App() {
  const [ready, setReady] = useState(false)

  if (!ready) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setReady(true)}
        onError={(e) => console.log(e)}
      />
    )
  }

  return (
    <Provider store={store}>
      <Nav />
    </Provider>
  )
}
