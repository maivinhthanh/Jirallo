import React, { Component } from 'react'
import Header from '../Components/Header';
import BannerLeft from '../Components/BannerLeft';

export default class HomePage extends Component {
  render() {
    return (
      <div>
      <Header/>
      <BannerLeft/>
      </div>
    )
  }
}
