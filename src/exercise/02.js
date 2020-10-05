// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js
import React from 'react'

import {useLocalStorageState} from './use-local-storage-state'

const LOCAL_STORAGE_KEY = 'name'

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState(LOCAL_STORAGE_KEY, initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
