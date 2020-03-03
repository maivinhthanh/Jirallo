import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import Icon from '@material-ui/core/Icon';
import _ from 'lodash'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SelectedListItem({listissues, selectIssues}) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    let issue = listissues[index]
    selectIssues(issue._id)
  };
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {
          listissues.length != 0 ?
          _.map(listissues, (item, index) =>{
            return (
              <ListItem 
                button key={index}
                selected={selectedIndex === index}
                onClick={event => handleListItemClick(event, index)}
              > 
                  {
                    item.type === 'bug' 
                    ? <Icon className="fa fa-bug" color="secondary" /> 
                    : <Icon className="fa fa-tasks" color="primary" />
                  }
                  
                <ListItemText primary={item.name} />
              </ListItem>
            )
          })
          :<ListItem
            button
            selected={selectedIndex === 0}
            onClick={event => handleListItemClick(event, 0)}
          > 
              
            <ListItemText primary="Not Issues" />
          </ListItem>
        }
        
      </List>
    </div>
  );
}