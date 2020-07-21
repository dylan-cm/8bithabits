import React, { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { isLoaded } from 'react-redux-firebase'
import { ThemeProvider } from 'emotion-theming'
import { theme } from '../styles'

import ErrorPage from '../pages/ErrorPage'
import Loading from '../pages/Loading'
import LoginPage from '../pages/LoginPage'
import Header from '../organisms/Header'
import Footer from '../organisms/Footer'

const Home = lazy(() => import('../pages/Home'))
const Contact = lazy(() => import('../pages/Contact'))

export const history = createBrowserHistory()

function AuthIsLoaded({ children }: any) {
  const auth = useSelector((state: any) => state.firebaseReducer.auth)
  if (!isLoaded(auth)) return <LoginPage />
  else return children
}

function Routes() {
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <ErrorPage>
          <AuthIsLoaded>
            <Suspense fallback={<Loading />}>
              <Header />
              <Switch>
                <Route path="/contact" component={Contact} />
                <Route path="/" component={Home} />
              </Switch>
              <Footer />
            </Suspense>
          </AuthIsLoaded>
        </ErrorPage>
      </ThemeProvider>
    </Router>
  )
}

export default Routes
