import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import { AppContext, AppProvider } from "components/AppContext"
import { LINKS, PAGES_COMPONENT_NAMES } from 'constants/common'
import { ROUTES } from 'constants/routes'
import LoginPage from "pages/LoginPage"
import EditorPage from "pages/EditorPage"
import PochtaBankPage from "pages/PochtaBankPage"
import HomePage from "pages/HomePage"
import NotFoundPage from "pages/NotFoundPage"
import OtpBankPage from "pages/OtpBankPage"
import 'normalize.css'
import './app.module.sass'


const components = {
  [PAGES_COMPONENT_NAMES.HOME_PAGE]: HomePage,
  [PAGES_COMPONENT_NAMES.EDITOR_PAGE]: EditorPage,
  [PAGES_COMPONENT_NAMES.LOGIN_PAGE]: LoginPage,
  [PAGES_COMPONENT_NAMES.POCHTA_BANK_PAGE]: PochtaBankPage,
  [PAGES_COMPONENT_NAMES.OTP_BANK_PAGE]: OtpBankPage
}


function PrivateRoute({ children, ...rest }) {
  const auth = useContext(AppContext)

  return (
     <Route
        {...rest}
        render={({ location }) => {
          console.log(location, auth.isAuthenticated)

          return auth.isAuthenticated ? (
             children
          ) : (
             <Redirect
                to={{
                  pathname: LINKS.LOGIN.link,
                  state: { from: location }
                }}
             />
          )
        }}
     />
  )
}

const auth = {
  isAuthenticated: false,
  authenticate(cb) {
    auth.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    auth.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const App = () => {
  return (
     <AppProvider value={auth}>
       <Router>
         <Switch>
           {ROUTES.map(({
                          path,
                          componentName,
                          exact = true,
                          public: publicPage = false,
                          ...props
                        }, i) => {
             const Component = components[componentName]

             return publicPage ? (
                <Route key={i} path={`${path}`} exact={exact}>
                  <Component/>
                </Route>
             ) : (
                <PrivateRoute key={i} path={`${path}`} exact={exact}>
                  <Component/>
                </PrivateRoute>
             )
           })}
           <Route path={'*'} exact={true} component={NotFoundPage}/>
         </Switch>
       </Router>
     </AppProvider>
  )
}

// {/*<Route path={`/`} exact>*/}
// {/*<Redirect to={`/${CITIES.CHITA.eng}`}/>*/}
// {/*</Route>*/}
//
// {/*<Route path="/404" exact component={Page404}/>*/}

export default App
