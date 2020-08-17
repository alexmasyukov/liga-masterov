import React from 'react'
const CommonContext = React.createContext({})

const { Provider: CommonProvider } = CommonContext

export {
  CommonContext,
  CommonProvider
}