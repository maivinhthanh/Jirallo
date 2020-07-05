import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom'
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import jwtDecode from 'jwt-decode'
let userId = null
if (localStorage.getItem('token')){
  userId = jwtDecode(localStorage.getItem('token')).data.userId
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
    left: '65px',
  },
  Link:{

  }
}));

const logout =()=>{
  localStorage.clear('user')
  localStorage.clear('token')
}

const actions = [
  { icon: <Link to="/"><Avatar alt="Remy Sharp" src="/logo-menu.jpg" /></Link>, name: 'Home' },
  { icon: <Link to="/viewAll"><Icon className="fas fa-folder" /></Link>, name: 'All Project' },
  { icon: <Link to={`/infouser/${userId}`}><Icon className="fas fa-user" /></Link>, name: 'Profile' },
  { icon: <Link to="/login" onClick={()=>logout()}><Icon className="fas fa-sign-out-alt" /></Link>, name: 'Log Out' }
];

export default function OpenIconSpeedDial() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root}>
            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                className={classes.speedDial}
                icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                open={open}
            >
                {actions.map(action => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                        />
                ))}
            </SpeedDial>
    </div>
  );
}
