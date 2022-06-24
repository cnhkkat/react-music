import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { HOT_RECOMMEND_LIMIT } from '@/common/contants'

import ThemeHeaderRCM from '../../../../../../components/theme-header-rcm'
import PlaylistCover from '../../../../../../components/playlist-cover'
import { getHotRecommendAction } from '../../store/actionCreators'

import { RecommendWrapper } from './style'

const HotRecommend = memo(() => {
  //state

  //redux hooks
  const { hotRecommends } = useSelector(
    (state) => ({
      hotRecommends: state.getIn(['recommend', 'hotRecommends']),
    }),
    shallowEqual
  )

  const dispatch = useDispatch()

  //other hooks

  useEffect(() => {
    dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT))
  }, [dispatch])

  return (
    <RecommendWrapper>
      <ThemeHeaderRCM title='热门推荐' keywords={['华语', '流行', '民谣', '摇滚', '电子']} />
      <div className='recommend-list'>
        {hotRecommends.map((item, index) => {
          return <PlaylistCover key={item.id} info={item} />
        })}
      </div>
    </RecommendWrapper>
  )
})

export default HotRecommend
