import { getSongDetail, getLyric } from '../../../services/player'
import { getRandomNum } from '@/utils/math'
import * as actionTypes from './constants'
import { parseLyric } from '../../../utils/lyric'

//当前歌曲相关信息
const changeCurrentSongAction = (currentSong) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  currentSong,
})

// 播放列表
const changePlaylistAction = (playlist) => ({
  type: actionTypes.CHANGE_PLAYLIST,
  playlist,
})

//当前歌曲在播放列表的索引值
const changeCurrentSongIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  index,
})

// 歌词
const changeLyricListAction = (lyricList) => ({
  type: actionTypes.CHANGE_LYRIC_LIST,
  lyricList,
})

// 当前播放的歌词
export const changeCurrentLyricIndexaAction = (currentLyricIndex) => ({
  type: actionTypes.CHANGE_CURRENT_LYRIC_INDEX,
  currentLyricIndex,
})

//对外暴露的Action
export const getSongDetailAction = (ids) => {
  return (dispatch, getState) => {
    //根据id查找播放列表中该歌曲的index
    const playlist = getState().getIn(['player', 'playlist'])
    const songIndex = playlist?.findIndex((song) => song.id === ids)

    //判断index是否存在
    let song = null
    if (songIndex !== -1) {
      dispatch(changeCurrentSongIndexAction(songIndex))
      song = playlist[songIndex]
      dispatch(changeCurrentSongAction(song))
      dispatch(getLyricAction(song.id))
    } else {
      getSongDetail(ids).then((res) => {
        song = res?.songs[0]
        if (!song) return
        // 浅拷贝
        const newPlaylist = [...playlist]
        newPlaylist.push(song)

        //更新redux
        dispatch(changePlaylistAction(newPlaylist))
        dispatch(changeCurrentSongIndexAction(newPlaylist.length - 1))
        dispatch(changeCurrentSongAction(song))

        //请求歌词
        dispatch(getLyricAction(song.id))
      })
    }
  }
}

//播放顺序
export const changeSequenceAction = (sequence) => {
  if (sequence === 3) {
    sequence = 0
  }
  return {
    type: actionTypes.CHANGE_SEQUENCE,
    sequence,
  }
}

// 本来逻辑在onClick那边写，但是因为太多，所以在这里写 ？，就得返回dispatch，在那边派发changeCurrentSong传过来tag
export const getCurrentIndexAndSongAction = (tag) => {
  return (dispatch, getState) => {
    const playlist = getState().getIn(['player', 'playlist'])
    const sequence = getState().getIn(['player', 'sequence'])
    let currentSongIndex = getState().getIn(['player', 'currentSongIndex'])
    switch (sequence) {
      case 1: //随机
        let randomIndex = getRandomNum(playlist.length)
        while (randomIndex === currentSongIndex) {
          randomIndex = getRandomNum(playlist.length)
        }
        currentSongIndex = randomIndex
        break
      default: //顺序
        currentSongIndex = currentSongIndex + tag
        if (currentSongIndex === playlist.length) currentSongIndex = 0
        if (currentSongIndex < 0) currentSongIndex = playlist.length - 1
    }

    const currentSong = playlist[currentSongIndex]
    dispatch(changeCurrentSongIndexAction(currentSongIndex))
    dispatch(changeCurrentSongAction(currentSong))

    //请求歌词
    dispatch(getLyricAction(currentSong.id))
  }
}

export const getLyricAction = (id) => {
  return (dispatch) => {
    getLyric(id).then((res) => {
      const lyric = res.lrc.lyric
      const lyricList = parseLyric(lyric)
      // console.log(lyricList)

      // 保存到redux里
      dispatch(changeLyricListAction(lyricList))
    })
  }
}
