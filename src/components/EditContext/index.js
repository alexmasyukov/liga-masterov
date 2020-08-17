import React from 'react'
const EditContext = React.createContext({})

const { Provider: EditProvider } = EditContext

export {
  EditContext,
  EditProvider
}