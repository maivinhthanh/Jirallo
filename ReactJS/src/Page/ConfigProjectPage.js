import React, { Component } from 'react'
import { connect } from "react-redux"

import MenuUser from '../Components/MenuUser/Menu'
import ConfigProject from '../Components/Project/ConfigProject'
import CallApi from "../until/apiCaller";

class ConfigProjectPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      auth: true
    }
  }
  async componentWillMount(){
    let data = await CallApi(`project/hasAuth/${this.props.match.params.id}`,'GET',
      {},
      'token'
    )
    let auth = data.data.hasAuth
    this.setState({
      auth: auth
    })
  }
  render() {
    const { match: { params: { id } } } = this.props
    const { auth } = this.state
    return (
      <div>
        <MenuUser/>
        <ConfigProject params={id} auth={auth}/>
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
)(ConfigProjectPage)