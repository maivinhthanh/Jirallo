import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import _ from 'lodash'

import Process from './Process'
import Issues from './Issues'

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100%',
      },
      
    },
    process:{
      height: '500px',
    },
    arrowRight:{
      position: 'absolute',
      right: 0,
      zIndex: 5
    },
    arrowLeft:{
      position: 'absolute',
      left: 5,
      zIndex: 101
    }
}));

const initialState = {start: 0}
// const a = (state, action) =>{
//   state.start + 1
// }
const todoReducer = (state, action) => {
  
  switch (action.type) {
    case 'INCREMENT':
      return {start: state.start + 1};
    case 'DECREMENT':
      return {start: state.start - 1}; 
    default:
      return state
  }
}

export default function UI({ project, listissues, ChangeProcessIssue}) {
    const classes = useStyles();
    let numberColumn = project.process.length
    let divineColumn = 12 / Number.parseInt(numberColumn)
    const [state, dispatch] = React.useReducer(todoReducer, initialState)

    if(numberColumn < 4){
      return (
        <Grid className={classes.root}>
            <Grid container spacing={2}>
              {
                _.map(project.process, (ip, idp) =>{
                  return(
                      <Grid item className={classes.process} xs={divineColumn} key={idp}>
                        <Process white process={ip} handleChange={(id, process) => ChangeProcessIssue(id, process)} >
                            {
                                _.map(listissues, (item, index)=>{
                                    if(item.process === ip){
                                        return (
                                            <Issues info={item} key={index}/>
                                        )
                                    }
                                    
                                })
                            }
                        </Process>
                      </Grid>
                  )
                })
              }
              
            </Grid>
        </Grid>
      )
    }
    else{

      return (
        <Grid className={classes.root}>
            <Grid container spacing={2}>
              {
                state.start === 0 
                ? <div></div> 
                :<Avatar className={classes.arrowLeft} onClick={() => dispatch({type: 'DECREMENT'})}>
                  <Icon className="fa fa-arrow-left" />
                </Avatar>
              }
              
              {
                _.map(project.process.slice(state.start, state.start + 4), (ip, idp) =>{
                  return(
                      <Grid item className={classes.process} xs={3} key={idp}>
                        <Process white process={ip} handleChange={(id, process) => ChangeProcessIssue(id, process)} >
                            {
                                _.map(listissues, (item, index)=>{
                                    if(item.process === ip){
                                        return (
                                            <Issues info={item} key={index}/>
                                        )
                                    }
                                    
                                })
                            }
                        </Process>
                      </Grid>
                  )
                })
              }
              {
                numberColumn === state.start + 4
                ? <div></div> 
                :<Avatar className={classes.arrowRight} onClick={() => dispatch({type: 'INCREMENT'})}>
                  <Icon className="fa fa-arrow-right" />
                </Avatar>
              }
            </Grid>
        </Grid>
      )
    }
    

  
}