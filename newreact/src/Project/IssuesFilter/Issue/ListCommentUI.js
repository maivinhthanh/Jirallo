import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import _ from 'lodash'

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  wrapComment :{
    position: "relative",
    height: "50px",
    margin: "10px 0px"
  },
  avatarComment:{
    position: "absolute"
  },
  nameComment:{
    fontWeight: "bold",
  },
  contendComment:{
    wordBreak: "break-all",
  },
  wrapContentComment:{
    position: "absolute",
    left: "10%",
    top: "6%",
    backgroundColor: "whitesmoke",
    width: "85%",
    borderRadius: "30px",
    padding: "3px 25px",
  }
}));

export default function ListCommentUI({listcomment}) {
  const classes = useStyles();
  return (
    <div>
      
      <div className={classes.margin}>
        {
          listcomment.length !== 0 ?
          _.map(listcomment, (item, index)=>{
            return(
              <Grid className={classes.wrapComment} container spacing={1} alignItems="flex-end" key={index}>
                <Avatar alt="Avatar" src={item.author.image} className={classes.avatarComment}/>
                <div className={classes.wrapContentComment} >
                  <p className={classes.nameComment}>{item.author.name}</p>
                  <p className={classes.contendComment}>{item.content}</p>
                </div>
                
              </Grid>
            )
          })
          :<div></div>
        }
        
        
      </div>
    </div>
  );
}