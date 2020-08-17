import React from 'react'
const ColumnsContext = React.createContext({})

const { Provider: ColumnsProvider } = ColumnsContext

export {
  ColumnsContext,
  ColumnsProvider
}