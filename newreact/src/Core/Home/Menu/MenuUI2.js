import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom'
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
let userId = null
if (!(!Cookies.get('token') && !Cookies.get('refreshtoken')) ){
  if(Cookies.get('token')!= undefined && Cookies.get('token')!= 'undefined'){
    userId = jwtDecode(Cookies.get('refreshtoken')).data.userId
  }
}
const useStyles = makeStyles(theme => ({
  root: {
    height: 0,
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  speedDial: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
  Link:{

  }
}));

const actions = [
  { icon: <Link to="/"><Avatar alt="Remy Sharp" src="/logo-menu.jpg" /></Link>, name: 'Home' },
  { icon: <Link to="/viewAll"><Icon className="fas fa-folder" /></Link>, name: 'All Project' },
  { icon: <Link to={`/infouser/${userId}`}><Icon className="fas fa-user" /></Link>, name: 'Profile' },
  { icon: <Link to="/login" onClick={()=>this.logout()}><Icon className="fas fa-sign-out-alt" /></Link>, name: 'Log Out' }
];

export default function OpenIconSpeedDial() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const handleVisibility = () => {
    setHidden(prevHidden => !prevHidden);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
            <Button onClick={handleVisibility}></Button>
            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                className={classes.speedDial}
                hidden={hidden}
                icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map(action => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={handleClose}
                        />
                ))}
            </SpeedDial>
    </div>
  );
}
