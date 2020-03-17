import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import _ from 'lodash'

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
    }
}));

const initialState = {isEdit: false}

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

export default function UI({}) {
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
    
    if(state.isEdit){
        return (
          <div onMouseEnter={handleHover} onMouseLeave={handleHover} 
            className={isHover ? classes.divParentHover : classes.divParent}>
            <div>
              abc
            </div>
            {
              !isHover ? 
              <div ></div>
              :
              <div >
                <Avatar variant="rounded" onClick={editText} className={classes.small}>
                  <Icon className="fas fa-edit" color="secondary"></Icon>
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
              def
            </div>
            {
              !isHover ? 
              <div ></div>
              :
              <div >
                <Avatar variant="rounded" onClick={saveText} className={classes.small}>
                  <Icon className="fas fa-check" color="primary"></Icon>
                </Avatar>
              </div>
            }
          </div>
        );
      }

  
}