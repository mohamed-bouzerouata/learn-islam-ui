/* eslint react/jsx-filename-extension: 0 */
import React from 'react'
import {Router} from 'react-router-dom' // eslint-disable-line
import {Provider} from 'react-redux'

import createStore from './src/createStore'

exports.replaceRouterComponent = ({history}) => {
  const store = createStore()

  const ConnectedRouterWrapper = ({children}) => (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  )

  return ConnectedRouterWrapper
}