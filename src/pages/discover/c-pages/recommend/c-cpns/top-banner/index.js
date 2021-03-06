import React, { memo, useEffect, useRef, useCallback, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { getTopBannerAction } from '../../store/actionCreators'

import { Carousel } from 'antd'
import { BannerWrapper, BannerControl, BannerLeft, BannerRight } from './style'

const TopBanner = memo(() => {
  //state
  const [currentIndex, setCurrentIndex] = useState(0)

  //组件和redux关联：获取数据和进行操作
  const { topBanners } = useSelector(
    (state) => ({
      // topBanners: state.recommend.topBanners,
      // topBanners: state.get('recommend').get('topBanners'),
      topBanners: state.getIn(['recommend', 'topBanners']),
    }),
    shallowEqual
  )

  //其他hooks
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTopBannerAction())
  }, [dispatch])

  const bannerRef = useRef()

  const bannerChange = useCallback((from, to) => {
    setCurrentIndex(to)
  }, [])

  //其他业务逻辑
  const bgImage = topBanners[currentIndex]?.imageUrl + '?imageView&blur=40x20'

  return (
    <BannerWrapper bgImage={bgImage}>
      <div className='banner wrap-v2'>
        <BannerLeft>
          <Carousel effect='fade' autoplay ref={bannerRef} beforeChange={bannerChange}>
            {topBanners.map((item, index) => {
              return (
                <div className='banner-item' key={item.imageUrl}>
                  <img className='image' src={item.imageUrl} alt={item.typeTitle}></img>
                </div>
              )
            })}
          </Carousel>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className='btn left' onClick={(e) => bannerRef.current.prev()}></button>
          <button className='btn right' onClick={(e) => bannerRef.current.next()}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
})

export default TopBanner
