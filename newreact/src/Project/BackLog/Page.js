import React, { Component } from 'react'
import { connect } from 'react-redux'

import UI from './UI'
import MenuProject from '../../Core/Home/Menu/MenuProject'
import Toast from '../../Components/Toast'
import * as action from './action'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));
class BackLogPage extends Component {
  componentWillMount(){
    this.props.HasAuth(this.props.match.params.id)
  }
  shouldComponentUpdate(nextProps){
    return nextProps.authProject.hasAuth !== this.props.authProject.hasAuth
  }
  componentDidMount(){
    const { match: { params } } = this.props
    document.title = "Back Log"
    this.props.getInfoProject(params.id)
  }
  render() {
      const { match: { params } } = this.props
      const { note, authProject } = this.props
      if(authProject.hasAuth === true){
        return (
          <Grid container className={useStyles.root} spacing={2}>
             <Grid item xs={1} style={{ background: 'cornflowerblue'}}>
             <MenuProject idproject={params.id}/>
             </Grid>
             <Grid item xs={11}>
             <UI idproject={params.id} />
                <Toast open={note.show} message={note.message} type={note.type} />
             </Grid>
          </Grid>
         
        )
      }
      else{
        return(
          <Grid>
                <MenuProject idproject={params.id}/>
                <p>Project không tồn tại</p>
                <Toast open={note.show} message={note.message} type={note.type} />

          </Grid>
        )
      }
      
    
  }
}

const mapStateToProps = (state) => {
    return {
      note: state.note,
      authProject: state.authProject,
      project: state.project
    }
}

const mapDispatchToProps = dispatch => {
    return {
      HasAuth: (id) =>dispatch(action.HasAuth(id)),
      getInfoProject: (id) => dispatch(action.GetInfoProject(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackLogPage)