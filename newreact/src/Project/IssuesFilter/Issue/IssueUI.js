import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Card, Row, Col, Select, Input, Button } from 'antd';
import Comment from './CommentContainer';

const { TextArea } = Input;
const { Option } = Select;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: '20px'
  },
  issue: {
    marginTop: '30px'
  },
  desc: {
      marginTop: '10px',
      textAlign: 'left'
  },
  
}));

export default function IssueUI({issue, EditDescriptIssues, listMember, EditAssignee}) {
  const classes = useStyles();
  const [descript, setDescript] = useState(false);

  const handleChange = (e) =>{
    EditAssignee(e)
  }

  const handleChangeDescription = (e) =>{
    setDescript(e.target.value)
  }

  const submitDescript = () =>{
    EditDescriptIssues(descript)
  }

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
        <Grid item xs={8} style={{ padding: '10px'}}>
            <Grid container>
              <Grid item xs={12}>
                <h6 className={classes.desc}>Descript</h6>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <TextArea defaultValue={issue.descript} key={issue.descript}
                  onChange={handleChangeDescription} />
                <Button type="primary" onClick={submitDescript} style={{float: "right", marginTop: '10px'}}>
                  Save
                </Button>
              </Grid>
            </Grid>
            
            <Grid container>
              <Grid item xs={12}>
                <Comment idissue={issue._id}/>
              </Grid>
            </Grid>
        </Grid>
        <Grid item xs={4}>
          <Card title="Reporter">
            <Row>
              <Col sm={4}>
                <Avatar alt="Reporter" src={issue.repoter.image}/>
              </Col>
              <Col sm={20}>
                <h6>{issue.repoter.name}</h6>
              </Col>
            </Row>
          </Card>
          <Card title="Assignee">
            <Row>
              <Col sm={4}>
                <Avatar alt="Assignee" src={issue.assignee.image} /> {issue.assignee.name}
              </Col>
              <Col sm={20}>
                <Select style={{ width: "80%" }} key={issue.assignee.name}
                  defaultValue={issue.assignee.name}
                  onChange={handleChange}
                >
                  {
                    listMember.map((item, index)=>{
                      return (
                        item.id && <Option value={item.id._id} key={index}>{item.id.name}</Option>
                      )
                    })
                  }
                </Select>
              </Col>
            </Row>
            <Row>
              
            </Row>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}