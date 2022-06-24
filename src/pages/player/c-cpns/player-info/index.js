import React, { memo, useState } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import { getSizeImage } from '@/utils/format'

import SongOperationBar from '@/components/song-operation-bar'
import { InfoWrapper, InfoLeft, InfoRight } from './style'

const PlayerInfo = memo(() => {
  const [isSpread, setIsSpread] = useState(false)
  const { currentSong, lyricList } = useSelector(
    (state) => ({
      currentSong: state.getIn(['player', 'currentSong']),
      lyricList: state.getIn(['player', 'lyricList']),
    }),
    shallowEqual
  )
  const totalLyricCount = isSpread ? lyricList.length : 13

  return (
    <InfoWrapper>
      <InfoLeft>
        <div className='image'>
          <img src={getSizeImage(currentSong.al.picUrl, 130)} alt='' />
          <span className='cover image_cover'></span>
        </div>
        <div className='link'>
          <i className='sprite_icon2'></i>
          <a href='#/'>生成外联播放器</a>
        </div>
      </InfoLeft>
      <InfoRight isSpread={isSpread}>
        <div className='header'>
          <i className='sprite_icon2'></i>
          <h3 className='title'>{currentSong.name}</h3>
        </div>
        <div className='singer'>
          <span className='label'>歌手：</span>
          <a href='/#' className='name'>
            {currentSong.ar[0].name}
          </a>
        </div>
        <div className='album'>
          <span className='label'>所属专辑：</span>
          <a href='/#' className='name'>
            {currentSong.al.name}
          </a>
        </div>

        <SongOperationBar favorTitle='收藏' shareTitle='分享' downloadTitle='下载' commentTitle='(167366)' />

        <div className='lyric'>
          <div className='lyric-info'>
            {lyricList.slice(0, totalLyricCount).map((item, index) => {
              return (
                <p key={item.time} className='text'>
                  {item.content}
                </p>
              )
            })}
          </div>
          <button className='lyric-control' onClick={(e) => setIsSpread(!isSpread)}>
            {isSpread ? '收起' : '展开'}
            <i className='sprite_icon2'></i>
          </button>
        </div>
      </InfoRight>
    </InfoWrapper>
  )
})

export default PlayerInfo
