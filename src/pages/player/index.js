import React, { memo } from 'react'
import PlayerInfo from './c-cpns/player-info'
import { PlayerLeft, PlayerRight, PlayerWrapper } from './style'
const Player = memo(() => {
  return (
    <PlayerWrapper>
      <div className='content wrap-v2'>
        <PlayerLeft>
          <PlayerInfo />
          <div>songContent</div>
        </PlayerLeft>
        <PlayerRight>
          <div>simiplaylist</div>
          <div>simisongs</div>
          <div>simidownload</div>
        </PlayerRight>
      </div>
    </PlayerWrapper>
  )
})

export default Player
