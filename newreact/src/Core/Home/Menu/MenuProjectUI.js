import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  buttonMenu: {

  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem button >
          <Icon className="fas fa-stream" />
          <ListItemText primary={'Backlog'} />
        </ListItem>
      </List>
      <List>
        <ListItem button >
          <Icon className="fas fa-columns" />
          <ListItemText primary={'Active Sprint'} />
        </ListItem>
      </List>
      <List>
        <ListItem button >
          <Icon className="fas fa-cog" />
          <ListItemText primary={'Config'} />
        </ListItem>
      </List>
     
    </div>
  );

  
  return (
    <div>
      <Button className={classes.buttonMenu} onClick={toggleDrawer('left', true)}>
        <Avatar className={classes.orange}><Icon className="fas fa-ellipsis-v" /></Avatar>
      </Button>
      
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
      
    </div>
  );
}
