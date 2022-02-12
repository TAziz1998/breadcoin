// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react'
// import AuthService from './Services/AuthService'
import { Redirect, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
//   const isLoggedIn = AuthService.isLoggedIn()
const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute