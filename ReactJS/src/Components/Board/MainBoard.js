import React, { Component, Fragment } from 'react'

import ActiveSprints from './ActiveSprints'

export default class MainBoard extends Component {
  
  render() {
    return (
      
      <React.Fragment>
      <div className="row">
        <div className="col-12" >
          <ActiveSprints />
        </div>
        
      </div>
    </React.Fragment>
    )
  }
}
