import React from 'react';
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
import { textAlign } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  issue: {
    marginTop: '30px'
  },
  detail: {
    paddingTop: '10px',
    paddingLeft: '10px'
  },
  desc: {
      marginTop: '10px',
      textAlign: 'left'
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
  }
}));

export default function IssueUI({issue, EditDescriptIssues}) {
  const classes = useStyles();
  const [descript, setDescript] = React.useState(false);
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.issue}>
        <Toolbar variant="dense">
          
          <Typography variant="h6" color="inherit">
            {issue.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container>
            
            <Grid item xs={8}>
              
                <Grid container>
                  <Grid item xs={12}>
                    <h3 className={classes.desc}>Descript</h3>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Paper className={classes.descript}>
                          <CKEditor
                            editor={ ClassicEditor }
                            data={issue.descript}
                            onInit={ editor => {
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
                    {/* <Button variant="contained" color="primary" >
                        Save
                      </Button> */}
                  </Grid>
                </Grid>
                
                <Grid container>
                  <Grid item xs={12}>
                    <h3 className={classes.desc}>Comment</h3>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Comment idissue={issue._id}/>
                  </Grid>
                </Grid>
              
            </Grid>

            <Grid item xs={4} className={classes.detail}>
              <Grid container>
                <Grid item xs={12}>
                  Reporter
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Avatar alt="Reporter" src={issue.repoter.image} /> <h6>{issue.repoter.name}</h6>
                </Grid>
              </Grid>
              <hr/>
              <Grid container>
                <Grid item xs={12}>
                  Assignee
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Avatar alt="Assignee" src={issue.assignee.image} /> <h6>{issue.assignee.name}</h6>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
    </div>
  );
}