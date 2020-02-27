import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import _ from 'lodash'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      marginLeft: theme.spacing(6),
      marginRight: theme.spacing(6),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function ImageAvatars({listMember,selectUser}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {
        _.map(listMember, (item,index) =>{
          console.log(item._id)
          return(
            <div key={index}>
              {
                item.image
                ? <Avatar alt={item.name} src={'/image/'+item.image} onClick={()=>selectUser(item._id)}
                    className={classes.large}  />
                : <Avatar alt={item.name} onClick={()=>selectUser(item._id)}
                    className={classes.large} >{item.name.charAt(0)}</Avatar>
              }
            </div>
            
            
          )
          
        })
      }
      
    </div>
  );
}
