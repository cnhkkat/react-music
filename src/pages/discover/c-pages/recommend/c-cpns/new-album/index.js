import React, { memo, useEffect, useRef } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getNewAlbumAction } from '../../store/actionCreators'
// import { NEW_ALBUM_PAGE_NUM, NEW_ALBUM_PER_NUM } from '@/common/contants'

import { Carousel } from 'antd'
import ThemeHeaderRCM from '../../../../../../components/theme-header-rcm'
import { NewAlbumWrapper } from './style'
import AlbumCover from '../../../../../../components/album-cover'

const NewAlbum = memo(() => {
  const { newAlbums } = useSelector(
    (state) => ({
      newAlbums: state.getIn(['recommend', 'newAlbums']),
    }),
    shallowEqual
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getNewAlbumAction(10))
  }, [dispatch])

  const pageRef = useRef()

  return (
    <NewAlbumWrapper>
      <ThemeHeaderRCM title='新碟上架' />
      <div className='content'>
        <button className='arrow arrow-left sprite_02' onClick={(e) => pageRef.current.prev()}></button>
        <div className='album'>
          <Carousel dots={false} ref={pageRef}>
            {[0, 1].map((item) => {
              return (
                <div key={item} className='page'>
                  {newAlbums.slice(item * 5, (item + 1) * 5).map((iten) => {
                    return <AlbumCover key={iten.id} info={iten} size={100} width={118} bgp='-570px'></AlbumCover>
                  })}
                </div>
              )
            })}
          </Carousel>
        </div>
        <button className='arrow arrow-right sprite_02' onClick={(e) => pageRef.current.next()}></button>
      </div>
    </NewAlbumWrapper>
  )
})

export default NewAlbum
