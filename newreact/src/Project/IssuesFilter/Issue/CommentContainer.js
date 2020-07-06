import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'

import AddCommentUI from './AddCommentUI'
import ListCommentUI from './ListCommentUI'
import * as action from './action'

class CommentContainer extends Component {
  
  
  changeContent = (data) =>{
    this.props.AddComment(this.props.idissue, data)
  }
  render() {
    const { issues } = this.props
      return (
        <div >
          <Grid container>
            <Grid item xs={12}>
              <ListCommentUI listcomment={issues.comment} />
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
      issues: state.issues,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      AddComment:(idissue,data) => dispatch( action.AddComment(idissue,data) ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer)