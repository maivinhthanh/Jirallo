import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'

import InfoUserUI from './infoUserUI'
import InfoMeUI from './infoMeUI'
import MenuUser from '../Core/Home/Menu'
import * as action from './action'

class InfoUserContainer extends Component {
  show = (isAuth)=>{
    if(!isAuth){
      return(
        <Grid>
            <Paper style={{height: '60px'}} />
            <InfoUserUI/>
        </Grid>
        
      )
    }
    else{
      return (
        <Grid>
            <Paper style={{height: '60px'}} />
            <InfoMeUI/>
        </Grid>
      )
    }
  }
  render() {
    const { match: { params } } = this.props
    let isAuth = false
    if (Cookies.get('token') ){
        let token = jwtDecode(Cookies.get('token'))
        if(token.data.userId == params.id){
          isAuth = true
        }
      
    }
      return (
        <div >
          <MenuUser/>
          
          {
            this.show(isAuth)
          }
        </div>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
      note: state.note,
      auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoUserContainer)