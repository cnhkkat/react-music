/*
 * @Descripttion:
 * @version:
 * @Author: wutingting
 * @Date: 2022-03-20 21:02:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-16 16:59:51
 */
import { memo, Suspense } from 'react'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'

import routes from './router'
import store from './store'

import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'
import { HashRouter } from 'react-router-dom'
import PlayerBar from './pages/player/player-bar'

const App = memo(() => {
  return (
    <Provider store={store}>
      <HashRouter>
        <AppHeader />
        <Suspense fallback={<div>page is loading</div>}>{renderRoutes(routes)}</Suspense>
        <AppFooter />
        <PlayerBar />
      </HashRouter>
    </Provider>
  )
})

export default App
