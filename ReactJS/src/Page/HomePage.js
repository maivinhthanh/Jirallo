import React, { Component } from 'react'
import { connect } from "react-redux"

// import Header from '../Components/Header';
import BannerLeft from '../Components/BannerLeft';
import HeaderHome from '../Components/HeaderHome';
import Headers from '../Components/Header';
import MenuUser from '../Components/MenuUser/Menu'

class HomePage extends Component {
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
        <MenuUser/>
        {/* {
            this.header()
        } */}

      <BannerLeft/>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    error: state.error,
  };
};

export default connect(
  mapStateToProps,
  null
)(HomePage)