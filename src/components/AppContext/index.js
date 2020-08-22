import React from 'react'
const AppContext = React.createContext({})

const { Provider: AppProvider } = AppContext

export {
  AppContext,
  AppProvider
}