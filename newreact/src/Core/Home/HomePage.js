import React, { Component } from 'react'

import BannerLeft from './Home';
import MenuUser from './Menu'

class HomePage extends Component {

  render() {
    return (
      <div>
        <MenuUser/>
        <BannerLeft/>
      </div>
    )
  }
}

export default HomePage