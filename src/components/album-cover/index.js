import React, { memo } from 'react'

import { getSizeImage } from '@/utils/format'

import { AlbumWrapper } from './style'

const AlbumCover = memo((props) => {
  const { info, width = 153, size = 130, bgp = '-845px' } = props

  return (
    <AlbumWrapper size={size} width={width} bgp={bgp}>
      <div className='album-image'>
        <img src={getSizeImage(info.picUrl, size)} alt=''></img>
        <a href='/todo' className='cover sprite_cover'>
          1
        </a>
      </div>
      <div className='album-info'>
        <div className='name'>{info.name}</div>
        <div className='artist'>{info.artist.name}</div>
      </div>
    </AlbumWrapper>
  )
})

export default AlbumCover
