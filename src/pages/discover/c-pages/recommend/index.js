import React, { memo } from 'react'
import HotRecommend from './c-cpns/hot-recommend'
import NewAlbum from './c-cpns/new-album'
import RecommendRanking from './c-cpns/ranking'
import TopBanner from './c-cpns/top-banner'
import UserLogin from './c-cpns/user-login'
import HotRadio from './c-cpns/hot-radio'
import SettleSinger from './c-cpns/settle-singer'

import { RecommendWrapper, Content, RecommendLeft, RecommendRight } from './style'

const Recommend = memo(() => {
  return (
    <RecommendWrapper>
      <TopBanner />
      <Content className='wrap-v2'>
        <RecommendLeft>
          <HotRecommend />
          <NewAlbum />
          <RecommendRanking />
        </RecommendLeft>
        <RecommendRight>
          <UserLogin />
          <SettleSinger />
          <HotRadio />
        </RecommendRight>
      </Content>
    </RecommendWrapper>
  )
})

export default Recommend

// const Recommend = memo((props) => {
//   // console.log(props)
//   const { getTopBanners, topBanners } = props
//   useEffect(() => {
//     getTopBanners()
//   }, [getTopBanners])
//   return <div>Recommend:{topBanners.length}</div>
// })

// const mapStateToProps = (state) => ({
//   topBanners: state.recommend.topBanners,
// })

// const mapDispationToProps = (dispatch) => ({
//   getTopBanners: () => {
//     dispatch(getTopBannerAction())
//   },
// })

// export default connect(mapStateToProps, mapDispationToProps)(Recommend)
