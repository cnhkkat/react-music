import * as actionTypes from './constants'

import { getTopBanners, getHotRecommends, getNewAlbums, getRecommendRanking } from '../../../../../services/recommend'

// 首页轮播图
const changeTopBannerAction = (res) => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: res.banners,
})

export const getTopBannerAction = () => {
  return (dispatch) => {
    getTopBanners().then((res) => {
      dispatch(changeTopBannerAction(res))
    })
  }
}

// 推荐歌单
export const changeHotRecommendAction = (res) => ({
  type: actionTypes.CHANGE_HOT_RECOMMENDS,
  hotRecommends: res.result,
})

export const getHotRecommendAction = (limit) => {
  return (dispatch) => {
    getHotRecommends(limit).then((res) => {
      dispatch(changeHotRecommendAction(res))
    })
  }
}

// 推荐新碟
export const changeNewAlbumAction = (res) => ({
  type: actionTypes.CHANGE_NEW_ALBUMS,
  newAlbums: res.albums,
})

export const getNewAlbumAction = (limit) => {
  return (dispatch) => {
    getNewAlbums(limit).then((res) => {
      // console.log(res)
      dispatch(changeNewAlbumAction(res))
    })
  }
}

// 推荐榜单 飙升榜、原创榜、新歌榜
export const changeUpRankingAction = (res) => ({
  type: actionTypes.CHANGE_UP_RANKING,
  upRanking: res.playlist,
})

export const changeOriginalRankingAction = (res) => ({
  type: actionTypes.CHANGE_ORIGINAL_RANKING,
  originalRanking: res.playlist,
})
export const changeNewRankingAction = (res) => ({
  type: actionTypes.CHANGE_NEW_RANKING,
  newRanking: res.playlist,
})

export const getRecommendRankingAction = (id) => {
  return (dispatch) => {
    getRecommendRanking(id).then((res) => {
      switch (id) {
        case 19723756:
          dispatch(changeUpRankingAction(res))
          break
        case 3779629:
          dispatch(changeOriginalRankingAction(res))
          break
        case 2884035:
          dispatch(changeNewRankingAction(res))
          break
        default:
      }
    })
  }
}
