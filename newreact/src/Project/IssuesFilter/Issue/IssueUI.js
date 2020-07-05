import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Comment from './CommentContainer'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  descript:{
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      height: theme.spacing(16),
      border: '1px black solid',
      borderRadius: '5px'
    },
  },
  textEditor:{
    width: "100%"
  },
  wrapInfo: {
    border: "1px solid black",
    borderRadius: "5px"
  },
  wrapInfoContent :{
    position: "relative",
    height: "50px",
  },
  avatarInfo:{
    position: "absolute"
  },
  nameInfo:{
    position: "absolute",
    left: "50px",
    top: "10px",
  }
}));

export default function IssueUI({issue, EditDescriptIssues}) {
  const classes = useStyles();
  useEffect(() => {
    
  }, [issue])
  const [descript, setDescript] = React.useState(false);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          
          <Typography variant="h6" color="inherit">
            {issue.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container >
            
            <Grid item xs={8}>
              
                <Grid container>
                  <Grid item xs={12}>
                    <h3>Descript</h3>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Paper className={classes.descript}>
                      <CKEditor 
                        editor={ ClassicEditor }
                        data={issue.descript}
                        onInit={ editor => {
                          editor.setData( '' )
                            // You can store the "editor" and use when it is needed.
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            setDescript(data)
                        } }
                        onBlur={ ( event, editor ) => {
                          EditDescriptIssues(descript)
                        } }
                        onFocus={ ( event, editor ) => {
                        } }
                      />
                      
                    </Paper>
                   
                  </Grid>
                </Grid>
                
                <Grid container>
                  <Grid item xs={12}>
                    <Comment idissue={issue._id}/>
                  </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container className={classes.wrapInfo}>
                <Grid item xs={12}>
                  <b>Reporter</b>
                </Grid>
                <Grid item xs={12} className={classes.wrapInfoContent}>
                  <Avatar alt="Reporter" src={issue.repoter.image} className={classes.avatarInfo}/>
                  <h6 className={classes.nameInfo}>{issue.repoter.name}</h6>
                </Grid>
              </Grid>
              <br/>
              <Grid container className={classes.wrapInfo}>
                <Grid item xs={12} >
                  <b>Assignee</b>
                </Grid>
                <Grid item xs={12} className={classes.wrapInfoContent}>
                  <Avatar alt="Assignee" src={issue.assignee.image} className={classes.avatarInfo}/>
                  <h6 className={classes.nameInfo}>{issue.assignee.name}</h6>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
    </div>
  );
}