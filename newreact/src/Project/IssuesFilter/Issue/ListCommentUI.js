import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import _ from 'lodash'

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
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
              <Grid container spacing={1} alignItems="flex-end" key={index}>
                <Grid item xs={2}>
                  <Avatar alt="Avatar" src={item.author.image} />
                  <p>{item.author.name}</p>
                </Grid>
                <Grid item xs={10}>
                  <p>{item.content}</p>
                </Grid>
              </Grid>
            )
          })
          :<div></div>
        }
        
        
      </div>
    </div>
  );
}