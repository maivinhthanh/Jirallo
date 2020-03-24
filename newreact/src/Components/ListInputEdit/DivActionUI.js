import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import _ from 'lodash'

import DivInput from './divInput'

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100%'
      },
      
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    divParent:{
        width: '100%',
    },
    divParentHover:{
        width: '100%',
        border: '1px solid black',
        borderRadius: '5px'
    },
    action:{
      float: "right"
    }
}));

const initialState = {isEdit: true}

const todoReducer = (state, action) => {
  
  switch (action.type) {
    case 'EDIT':
      return {isEdit: false};
    case 'SAVE':
      return {isEdit: true}; 
    default:
      return state
  }
}
const defaultPropValue = {
  size: 18,
  marginBottom: 5,
  arrow: 5,
  margin: 2
};
export default function UI( props = defaultPropValue ) {
    const classes = useStyles();

    const [state, dispatch] = React.useReducer(todoReducer, initialState)
    const [isHover, setIsHover] = React.useState(false);

    const handleHover = () =>{
        setIsHover(!isHover)
    }
    const editText = ()=>{
        dispatch({type: 'EDIT'})
    }
    const saveText = ()=>{
        dispatch({type: 'SAVE'})
    }
    const add = ()=>{
      props.addParagraph()
    }
    if(state.isEdit){
        return (
          <div onMouseEnter={handleHover} onMouseLeave={handleHover} 
            className={isHover ? classes.divParentHover : classes.divParent}>
            <div style={{fontSize : props.size, marginBottom : props.arrow,
              display:'inline', margin: props.margin}}>
              {
                _.map(props.content, (item, index)=>{
                  return <p key={index}>{item}</p>
                })
              }
            </div>
            {
              !isHover ? 
              <div className={classes.action}></div>
              :
              <div className={`row ${classes.action}`}>
                <Avatar variant="rounded" onClick={editText} className={classes.small}>
                  <Icon className="fas fa-edit" color="secondary"></Icon>
                </Avatar>
                <Avatar variant="rounded" onClick={add} className={classes.small}>
                  <Icon className="fas fa-plus" color="primary"></Icon>
                </Avatar>
              </div>
            }
          </div>
        );
      }
      else{
        return (
          <div onMouseEnter={handleHover} onMouseLeave={handleHover}
          className={isHover ? classes.divParentHover : classes.divParent}>
            <div>
              {
                _.map(props.content, (item, index)=>{
                  return (
                    <div key={index}>
                      <DivInput {...props} indexArr={index} >{item}</DivInput>
                      <br/>
                    </div>
                  )
                })
              }
              
            </div>
            {
              !isHover ? 
              <div className={classes.action}></div>
              :
              <div className={`row ${classes.action}`}>
                <Avatar variant="rounded" onClick={saveText} className={classes.small}>
                  <Icon className="fas fa-check" color="primary"></Icon>
                </Avatar>
                <Avatar variant="rounded" onClick={add} className={classes.small}>
                  <Icon className="fas fa-plus" color="primary"></Icon>
                </Avatar>
              </div>
            }
          </div>
        );
      }

  
}