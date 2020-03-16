import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import _ from 'lodash'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList({project, getSelect}) {
  const classes = useStyles();
  const [openProcess, setOpenprocess] = React.useState(false);
  const [openSprint, setOpensprint] = React.useState(false);
  const [process, setProcess] = React.useState({});
  const [sprint, setSprint] = React.useState({});

  const handleChange = name => event => {
    setProcess({ ...process, [name]: event.target.checked });
    let data = _.cloneDeep(process)
    
    data[name] = event.target.checked

    getSelect(data)
  };
  const handleClick = (name) => {
    if(name === 'process'){
      setOpenprocess(!openProcess)
    }
    else{
      setOpensprint(!openSprint)
    }
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Filter
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button onClick={(name)=>handleClick('process')}>
        <ListItemText primary="Process" />
        {openProcess ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openProcess} timeout="auto" unmountOnExit>
        {
          _.map(project.process, (item, index)=>{
            return(
              <List component="div" disablePadding key={index}>
                <ListItem button className={classes.nested}>
                <FormControlLabel
                  control={
                    <Checkbox checked={process[item]} onChange={handleChange(item)} value={item} />
                  }
                  label={item}
                />
                </ListItem>
              </List>
            )
            
          })
        }
        
      </Collapse>
      <ListItem button onClick={(name)=>handleClick('sprint')}>
        <ListItemText primary="Process" />
        {openSprint ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openSprint} timeout="auto" unmountOnExit>
        {
          _.map(project.process, (item, index)=>{
            return(
              <List component="div" disablePadding key={index}>
                <ListItem button className={classes.nested}>
                <FormControlLabel
                  control={
                    <Checkbox checked={process[item]} onChange={handleChange(item)} value={item} />
                  }
                  label={item}
                />
                </ListItem>
              </List>
            )
            
          })
        }
        
      </Collapse>
    </List>
  );
}