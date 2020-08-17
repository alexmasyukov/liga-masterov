import React from 'react'
const CategoriesContext = React.createContext({})

const { Provider: CategoriesProvider } = CategoriesContext

export {
  CategoriesContext,
  CategoriesProvider
}