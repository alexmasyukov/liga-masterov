import React, { useContext, useReducer } from 'react'
import { AppContext } from "components/AppContext"
import {
  useHistory,
  useLocation
} from "react-router-dom"
import CommonLayout from "layouts/CommonLayout"
import Input from "components/Input"
import styles from 'app.module.sass'

// function AuthButton() {
//   let history = useHistory();
//
//   return fakeAuth.isAuthenticated ? (
//      <p>
//        Welcome!{" "}
//        <button
//           onClick={() => {
//             fakeAuth.signout(() => history.push("/"));
//           }}
//        >
//          Sign out
//        </button>
//      </p>
//   ) : (
//      <p>You are not logged in.</p>
//   );
// }

const ACTION_TYPES = {
  SET_PASSWORD: 'SET_PASSWORD',
  SET_ERROR: 'SET_ERROR'
}

const initialState = {
  password: '',
  error: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_PASSWORD:
      return {
        ...state,
        password: action.password,
        error: false
      }

    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        password: '',
        error: action.error
      }

    default:
      return state
  }
}


const LoginPage = () => {
  const [state, dispath] = useReducer(reducer, initialState)
  const auth = useContext(AppContext)
  let history = useHistory()
  let location = useLocation()
  const { from } = location.state || { from: { pathname: "/" } }

  const handleLogin = () => {
    if (state.password === 'TS12den21') {
      auth.authenticate(() => {
        history.replace(from)
      })
    } else {
      dispath({
        type: ACTION_TYPES.SET_ERROR,
        error: 'Неверный пароль'
      })
    }
  }

  const handlePasswordChange = ({ target: { value } }) =>
     dispath({
       type: ACTION_TYPES.SET_PASSWORD,
       password: value
     })


  return (
     <CommonLayout className={styles.loginPage}>
       {/*<h1>Управление</h1>*/}
       {/*<br/>*/}
       {/*<p>You must log in to view the page at {from.pathname}</p>*/}
       <div className={styles.loginBlock}>
         <Input
            name="password"
            onChange={handlePasswordChange}
            placeholder="Пароль"
            value={state.password}
            hasError={state.error}
            meta={{ error: state.error }}
            onKeyPress={e => e.key === 'Enter' && handleLogin()}
         />
         <div className={styles.btn} onClick={handleLogin}>Войти</div>
       </div>
     </CommonLayout>
  )
}

export default LoginPage