import React, { memo, useEffect } from 'react'
import { renderRoutes } from 'react-router-config'
import { NavLink } from 'react-router-dom'

import request from '../../services/request'

import { dicoverMenu } from '../../common/local-data'
import { DiscoverWrapper, TopMenu } from './style'

const Discover = memo((props) => {
  // useEffect(() => {
  //   request({
  //     url: '/banner',
  //   }).then((res) => {
  //     console.log(res)
  //   })
  // }, [])

  // console.log(props)
  const { route } = props
  return (
    <DiscoverWrapper>
      <div className='top'>
        <TopMenu className='wrap-v1'>
          {dicoverMenu.map((item, index) => {
            return (
              <div className='item' key={item.title}>
                <NavLink to={item.link}>{item.title}</NavLink>
              </div>
            )
          })}
        </TopMenu>
      </div>
      {renderRoutes(route.routes)}
    </DiscoverWrapper>
  )
})

export default Discover
