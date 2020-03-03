import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Grid } from '@material-ui/core'

import AddCommentUI from './AddCommentUI'
import * as action from './action'

class CommentContainer extends Component {
  componentWillUpdate(nextProps, nextState, snapshot) {
    
  }
  changeContent = (data) =>{
    // let com = {
    //   content: data
    // }
    this.props.AddComment(this.props.idissue, data)
  }
  render() {
      return (
        <div >
          <Grid container>
            <Grid item xs={12}>

            </Grid>
            <Grid item xs={12}>
              <AddCommentUI changeContent={this.changeContent}/>
            </Grid>
          </Grid>
        </div>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
      AddComment:(idissue,data) => dispatch( action.AddComment(idissue,data) ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer)