import { Map } from 'immutable'
import * as actionTypes from './constants'

// const defaultState ={
//   topBanners: [],
// }

// 对象转为immutable对象 使用Map
const defaultState = Map({
  topBanners: [],
  hotRecommends: [],
  newAlbums: [],

  upRanking: {},
  originalRanking: {},
  newRanking: {},
})

function reducer(state = defaultState, action) {
  // console.log('action', action)
  switch (action.type) {
    case actionTypes.CHANGE_TOP_BANNERS:
      // return { ...state, topBanners: action.topBanners }
      return state.set('topBanners', action.topBanners)
    case actionTypes.CHANGE_HOT_RECOMMENDS:
      return state.set('hotRecommends', action.hotRecommends)
    case actionTypes.CHANGE_NEW_ALBUMS:
      return state.set('newAlbums', action.newAlbums)

    case actionTypes.CHANGE_UP_RANKING:
      return state.set('upRanking', action.upRanking)
    case actionTypes.CHANGE_ORIGINAL_RANKING:
      return state.set('originalRanking', action.originalRanking)
    case actionTypes.CHANGE_NEW_RANKING:
      return state.set('newRanking', action.newRanking)

    default:
      return state
  }
}

export default reducer
