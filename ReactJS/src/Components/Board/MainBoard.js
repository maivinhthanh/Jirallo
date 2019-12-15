import React, { Component, Fragment } from 'react'

import ActiveSprints from './ActiveSprints'
import IteamHeader from '../IteamHeader'
import ListUser from '../User/ListUser';

export default class MainBoard extends Component {
  
  render() {
    const { params } = this.props
    return (
      
      <React.Fragment>
      <div className="row">
        <div className="col-1" >
          <IteamHeader params={params}/>
        </div>
        <div className="col-11" >
          <ListUser params={params}/>
          <ActiveSprints />
        </div>
        
      </div>
    </React.Fragment>
    )
  }
}
