import React, { Component } from 'react'
// import Header from '../Components/Header';
import BannerLeft from '../Components/BannerLeft';
import HeaderHome from '../Components/HeaderHome';
import Headers from '../Components/Header';

export default class HomePage extends Component {
  header=()=>{
    if(localStorage.getItem('user')){
      return(
        <Headers />
      )
    }
    else{
      return (
        <HeaderHome />
      )
    }
  }
  render() {
    return (
      <div>
        {
            this.header()
        }

      <BannerLeft/>
      </div>
    )
  }
}
