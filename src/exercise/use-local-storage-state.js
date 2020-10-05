import React from 'react'

const stringifyValue = value => {
  switch (typeof value) {
    case 'object':
      return JSON.stringify(value)
    default:
      return value
  }
}

export const useLocalStorageState = (key, initialValue) => {
  const [value, setValue] = React.useState(() => {
    const storedValue = window.localStorage.getItem(key)

    if (storedValue) {
      switch (typeof initialValue) {
        case 'number':
          return +storedValue
        case 'object':
          return JSON.parse(storedValue)
        default:
          return storedValue
      }
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue
  })

  React.useEffect(() => {
    const valueToBeStored = stringifyValue(value)
    window.localStorage.setItem(key, valueToBeStored)
  }, [key, value])

  return [value, setValue]
}
