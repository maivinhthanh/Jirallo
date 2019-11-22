import React, { Component } from 'react'
import Header from '../Components/Header';
import ProfileDetail from '../Components/Project/profileDetail'
export default class ProfileProject extends Component {
  render() {
    const { match: { params: { id } } } = this.props
    return (
      <div>
      {/* <Header/> */}
      <Header/>
      <ProfileDetail params = {id}/>
      </div>
    )
  }
}
