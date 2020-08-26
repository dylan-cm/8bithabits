import React, { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { ThemeProvider } from 'emotion-theming'
import { theme } from '../styles'

import ErrorPage from '../pages/ErrorPage'
import Loading from '../pages/Loading'
import LoginPage from '../pages/LoginPage'
import Header from '../organisms/Header'
import Footer from '../organisms/Footer'

const Home = lazy(() => import('../pages/Home'))
const Contact = lazy(() => import('../pages/Contact'))
const NewHabit = lazy(() => import('../pages/NewHabit'))
const UpdateHabit = lazy(() => import('../pages/UpdateHabit'))
const NewSequence = lazy(() => import('../pages/NewSequence'))
const UpdateSequence = lazy(() => import('../pages/UpdateSequence'))
const UserPage = lazy(() => import('../pages/UserPage'))

export const history = createBrowserHistory()

function AuthIsLoaded({ children }: any) {
  const auth = useSelector((state: any) => state.firebaseReducer.auth)
  if (!isLoaded(auth)) return <Loading />
  else return children
}

function PrivateRoute({ children, ...rest }: any) {
  const auth = useSelector((state: any) => state.firebaseReducer.auth)
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isLoaded(auth) && !isEmpty(auth) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }}
    />
  )
}

function Routes() {
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <ErrorPage>
          <Suspense fallback={<Loading />}>
            <AuthIsLoaded>
              <Switch>
                <Route path="/login" component={LoginPage} />
                <PrivateRoute>
                  <Header />
                  <Switch>
                    <Route path="/contact" component={Contact} />
                    <Route path="/new" component={NewHabit} />
                    <Route path="/edit/:id" component={UpdateHabit} />
                    <Route path="/editSequence/:id" component={UpdateSequence} />
                    <Route path="/new-sequence" component={NewSequence} />
                    <Route path="/user" component={UserPage} />
                    <Route path="/" component={Home} />
                  </Switch>
                  <Footer />
                </PrivateRoute>
              </Switch>
            </AuthIsLoaded>
          </Suspense>
        </ErrorPage>
      </ThemeProvider>
    </Router>
  )
}

export default Routes
