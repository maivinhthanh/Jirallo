import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import _ from 'lodash'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginLeft: '35px',
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
          return(
            <div key={index} onClick={()=>selectUser(item._id, index, item.active)} style={item.active?{backgroundColor:'#6A8DCD'}:{}, { marginTop: '10px'}}>
              {/* {
                _.get(item, ['id', 'image'])
                ? <Avatar alt={ _.get(item, ['id', 'name'])} src={'/image/'+_.get(item, ['id', 'image'])} 
                    className={classes.large}  />
                : <Avatar alt={ _.get(item, ['id', 'name'])} 
                    // className={classes.large} >{item.name.charAt(0)}</Avatar>
                    className={classes.large} ></Avatar>
              } */}
               {
                _.get(item, ['id', 'image'])
                ? <Avatar alt={ _.get(item, ['id', 'name'])} src={'/image/'+_.get(item, ['id', 'image'])} 
                    className={classes.large}  />
                : <Avatar alt={ _.get(item, ['id', 'name'])} src="images/logo-login.jpg" />
                    // className={classes.large} >{item.name.charAt(0)}</Avatar>
                    // className={classes.large} ></Avatar>
              }
              <p> { _.get(item, ['id', 'name']) && _.get(item, ['id', 'name']).split(' ').pop()} </p>
            </div>
            
          )
          
        })
      }
      
    </div>
  );
}
