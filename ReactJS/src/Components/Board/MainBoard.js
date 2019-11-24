import React, { Component, Fragment } from 'react'

import { useRef, useEffect} from "react"
import { Link } from 'react-router-dom'
import { UncontrolledCollapse, Input, CardBody, Card, Button } from 'reactstrap';
import MenuBoard from './MenuBoard';
import ActiveSprints from './ActiveSprints'

export default class MainBoard extends Component {
  
  render() {
    return (
      
      <React.Fragment>
      <div className="row">
        <div className="col-1 board-task">
          <MenuBoard/>
        </div>
        <div className="col-11" style={{ width: '100%',height: '400px'}}>
          <ActiveSprints />
        </div>
        
      </div>
    </React.Fragment>
    )
  }
}
