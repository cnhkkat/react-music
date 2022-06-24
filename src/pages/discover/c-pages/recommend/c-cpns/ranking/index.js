import React, { memo, useEffect } from 'react'

import ThemeHeaderRCM from '../../../../../../components/theme-header-rcm'
import Ranking from '../../../../../../components/ranking'
import { RankingWrapper } from './style'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getRecommendRankingAction } from '../../store/actionCreators'

const RecommendRanking = memo(() => {
  const { upRanking, originalRanking, newRanking } = useSelector(
    (state) => ({
      upRanking: state.getIn(['recommend', 'upRanking']),
      originalRanking: state.getIn(['recommend', 'originalRanking']),
      newRanking: state.getIn(['recommend', 'newRanking']),
    }),
    shallowEqual
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRecommendRankingAction(19723756))
    dispatch(getRecommendRankingAction(3779629))
    dispatch(getRecommendRankingAction(2884035))
  }, [dispatch])

  return (
    <RankingWrapper>
      <ThemeHeaderRCM title='推荐榜单'></ThemeHeaderRCM>
      <div className='tops'>
        <Ranking info={upRanking}></Ranking>
        <Ranking info={originalRanking}></Ranking>
        <Ranking info={newRanking}></Ranking>
      </div>
    </RankingWrapper>
  )
})

export default RecommendRanking
