import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'

import InfoUserUI from './infoUserUI'
import InfoMeUI from './infoMeUI'
import MenuUser from '../Core/Home/Menu/Menu'
import Toast from '../Components/Toast'

class InfoUserContainer extends Component {
  show = (isAuth, id)=>{
    if(!isAuth){
      
      return(
        <Grid>
            <Paper style={{height: '60px'}} />
            <InfoUserUI iduser={id}/>
            
        </Grid>
        
      )
    }
    else{
      return (
        <Grid>
            <Paper style={{height: '60px'}} />
            <InfoMeUI iduser={id}/>
        </Grid>
      )
    }
  }
  render() {
    const { match: { params } } = this.props
    const { note } = this.props
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
          <Toast open={note.show} message={note.message} type={note.type} />
          {
            this.show(isAuth, params.id)
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