import React, { memo, useEffect, useRef, useState, useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getSongDetailAction, changeSequenceAction, getCurrentIndexAndSongAction, changeCurrentLyricIndexaAction } from '../store/actionCreators'
import { getSizeImage, formatMinuteSecond, getPlaySong } from '@/utils/format'

import { NavLink } from 'react-router-dom'
import { message, Slider } from 'antd'
import { Control, Operator, PlayerBarWrapper, PlayInfo } from './style'

const PlayerBar = memo(() => {
  //props state
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isChanging, setIsChanging] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  //redux hooks
  const { currentSong, sequence, lyricList, currentLyricIndex } = useSelector(
    (state) => ({
      currentSong: state.getIn(['player', 'currentSong']),
      sequence: state.getIn(['player', 'sequence']),
      lyricList: state.getIn(['player', 'lyricList']),
      currentLyricIndex: state.getIn(['player', 'currentLyricIndex']),
    }),
    shallowEqual
  )
  const dispatch = useDispatch()

  //other hooks
  const audioRef = useRef()

  useEffect(() => {
    dispatch(getSongDetailAction(167876))
  }, [dispatch])

  useEffect(() => {
    audioRef.current.src = getPlaySong(currentSong?.id)
    //currentSong改变时自动播放
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch(() => {
        setIsPlaying(false)
      })
  }, [currentSong])
  // handle
  const singerName = (currentSong?.ar && currentSong.ar[0].name) || '未知歌手'
  const duration = currentSong?.dt || 0 //歌曲总时长 ms

  //handle function
  const playMusic = useCallback(() => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play()
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const timeUpdate = (e) => {
    // const currentTime = e.target.currentTime
    if (!isChanging) {
      setCurrentTime(e.target.currentTime * 1000) // s -> ms
      setProgress((currentTime / duration) * 100) // ms -> %
    }

    // 获取当前歌词
    let i = 0
    for (; i < lyricList.length; i++) {
      if (currentTime < lyricList[i].time) {
        break
      }
    }
    if (currentLyricIndex !== i - 1) {
      dispatch(changeCurrentLyricIndexaAction(i - 1))
      message.open({
        key: 'lyric',
        content: lyricList[i - 1] && lyricList[i - 1].content,
        duration: 0,
        className: 'lyric-class',
      })
    }
  }

  const sliderChange = useCallback(
    (value) => {
      setIsChanging(true)
      setCurrentTime((value / 100) * duration)
      setProgress(value)
    },
    [duration]
  )

  const slideAfterChange = useCallback(
    (value) => {
      const currentTime = ((value / 100) * duration) / 1000
      audioRef.current.currentTime = currentTime
      setCurrentTime(currentTime * 1000)
      setIsChanging(false)

      if (!isPlaying) {
        playMusic()
      }
    },
    [duration, isPlaying, playMusic]
  )

  // const changeSequence = () => {
  //   let currentSequence = sequence + 1
  //   if (currentSequence > 2) {
  //     currentSequence = 0
  //   }
  // }

  const handleMusicEnded = () => {
    //单曲循环
    if (sequence === 2) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    } else {
      dispatch(getCurrentIndexAndSongAction(1))
    }
  }

  return (
    <PlayerBarWrapper className='sprite_player'>
      <div className='content wrap_v2'>
        <Control isPlaying={isPlaying}>
          <button className='sprite_player prev' onClick={(e) => dispatch(getCurrentIndexAndSongAction(-1))}></button>
          <button className='sprite_player play' onClick={(e) => playMusic()}></button>
          <button className='sprite_player next' onClick={(e) => dispatch(getCurrentIndexAndSongAction(1))}></button>
        </Control>
        <PlayInfo>
          <div className='image'>
            <NavLink to='/discover/player'>
              <img src={getSizeImage(currentSong?.al?.picUrl, 35)} alt=''></img>
            </NavLink>
          </div>
          <div className='info'>
            <div className='song'>
              <NavLink to='/discover/player' className='song-name'>
                {currentSong?.name}
              </NavLink>
              <NavLink to='/discover/player' className='singer-name'>
                {singerName}
              </NavLink>
            </div>
            <div className='progress'>
              <Slider value={progress} tipFormatter={null} onChange={sliderChange} onAfterChange={slideAfterChange} />
              <div className='time'>
                <span className='now-time'>{formatMinuteSecond(currentTime || 0)}</span>
                <span className='divider'>/</span>
                <span className=''>{formatMinuteSecond(duration)}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={sequence}>
          <button className='sprite_player btn favor'></button>
          <button className='sprite_player btn share'></button>
          <div className='right sprite_player'>
            <button className='sprite_player btn volume'></button>
            <button className='sprite_player btn loop' onClick={(e) => dispatch(changeSequenceAction(sequence + 1))}></button>
            <button className='sprite_player btn playlist'></button>
          </div>
        </Operator>
      </div>
      <audio ref={audioRef} onTimeUpdate={timeUpdate} onEnded={handleMusicEnded} />
    </PlayerBarWrapper>
  )
})

export default PlayerBar
