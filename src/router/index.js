import React from 'react'
import { Redirect } from 'react-router-dom'

const Discover = React.lazy(() => import('@/pages/discover'))
const DjRadio = React.lazy(() => import('@/pages/discover/c-pages/djradio'))
const Toplist = React.lazy(() => import('@/pages/discover/c-pages/toplist'))
const Recommend = React.lazy(() => import('@/pages/discover/c-pages/recommend'))
const Playlist = React.lazy(() => import('@/pages/discover/c-pages/playlist'))
const Artist = React.lazy(() => import('@/pages/discover/c-pages/artist'))
const Player = React.lazy(() => import('@/pages/player'))
const Friend = React.lazy(() => import('@/pages/friend'))
const Mine = React.lazy(() => import('@/pages/mine'))

// import Discover from '../pages/discover'
// import djRadio from '../pages/discover/c-pages/djradio'
// import Toplist from '../pages/discover/c-pages/toplist'
// import Recommend from '../pages/discover/c-pages/recommend'
// import Playlist from '../pages/discover/c-pages/playlist'
// import Artist from '../pages/discover/c-pages/artist'
// import Player from '../pages/player'
// import Friend from '../pages/friend'
// import Mine from '../pages/mine'

const routes = [
  {
    path: '/',
    exact: true,
    render: () => <Redirect to='/discover' />,
  },
  {
    path: '/discover',
    component: Discover,
    routes: [
      {
        path: '/discover',
        exact: true,
        render: () => <Redirect to='/discover/recommend' />,
      },
      {
        path: '/discover/recommend',
        component: Recommend,
      },
      {
        path: '/discover/Toplist',
        component: Toplist,
      },
      {
        path: '/discover/Playlist',
        component: Playlist,
      },
      {
        path: '/discover/djRadio',
        component: DjRadio,
      },
      {
        path: '/discover/artist',
        component: Artist,
      },
      {
        path: '/discover/player',
        component: Player,
      },
    ],
  },
  {
    path: '/mine',
    component: Mine,
  },
  {
    path: '/friend',
    component: Friend,
  },
]

export default routes
