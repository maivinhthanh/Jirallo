import React, { Component } from 'react'

import ListProject from './ListProject/ListProject'
import MenuUser from '../Core/Home/Menu'

class ListProjectPage extends Component {
  
  render() {

      return (
        <div >
          <MenuUser/>
          <ListProject />
        </div>
      )
    
  }
}

export default ListProjectPage