import React, { memo } from 'react'
import { getCount, getSizeImage } from '@/utils/format'
import { PlaylistCoverWrapper } from './style'

const PlaylistCover = memo((props) => {
  const { info } = props
  return (
    <PlaylistCoverWrapper>
      <div className='cover-top'>
        <img src={getSizeImage(info.picUrl, 140)} alt='' />
        <div className='cover sprite_cover'>
          <div className='info sprite_cover'>
            <span>
              <i className='sprite_icon erji'></i>
              {getCount(info.playCount)}
            </span>
            <i className='sprite_icon play'></i>
          </div>
        </div>
      </div>
      <div className='cover-bottom'>{info.name}</div>
      {/* <div className='cover-source'>by {info.copywriter || info.creator.nickname}</div> */}
    </PlaylistCoverWrapper>
  )
})

export default PlaylistCover
