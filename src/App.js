import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { PAGES_COMPONENT_NAMES } from 'constants/common'
import { ROUTES } from 'constants/routes'
import LoginPage from "pages/LoginPage"
import EditorPage from "pages/EditorPage"
import PochtaBankPage from "pages/PochtaBankPage"
import HomePage from "pages/HomePage"
import './app.module.sass'


const components = {
  [PAGES_COMPONENT_NAMES.HOME_PAGE]: HomePage,
  [PAGES_COMPONENT_NAMES.EDITOR_PAGE]: EditorPage,
  [PAGES_COMPONENT_NAMES.LOGIN_PAGE]: LoginPage,
  [PAGES_COMPONENT_NAMES.POCHTA_BANK_PAGE]: PochtaBankPage
}


const App = () => {
  return (
     <Router>
       <Switch>
         {ROUTES.map(({ path, componentName, exact, ...props }, i) => (
            <Route
               key={i}
               path={`${path}`}
               exact={exact}
               component={components[componentName]}
            />
         ))}
       </Switch>
     </Router>
  )
}

// {/*<Route path={`/`} exact>*/}
// {/*<Redirect to={`/${CITIES.CHITA.eng}`}/>*/}
// {/*</Route>*/}
//
// {/*<Route path="/404" exact component={Page404}/>*/}

export default App
