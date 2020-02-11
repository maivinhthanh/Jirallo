import React, { Component } from 'react'

import ListProject from './ListProject/ListProjectContainer'
import MenuUser from '../Core/Home/Menu/Menu'
import Header from './Header/HeaderContainer'

class ListProjectPage extends Component {
  
  render() {

      return (
        <div >
          <MenuUser/>
          <Header />
          <ListProject />
        </div>
      )
    
  }
}

export default ListProjectPage