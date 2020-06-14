import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom'
import Icon from '@material-ui/core/Icon';

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

export default function OpenIconSpeedDial({idproject}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const actions = [
    { icon: <Link to={`/backlog/${idproject}`}><Icon className="fas fa-stream" /></Link>, name: 'Backlog' },
    { icon: <Link to={`/active/${idproject}`}><Icon className="fas fa-columns" /></Link>, name: 'Active Sprint' },
    { icon: <Link to={`/config/${idproject}`}><Icon className="fas fa-cog" /></Link>, name: 'Config' },
    { icon: <Link to={`/issues/${idproject}/null`} ><Icon className="fas fa-tasks" /></Link>, name: 'Issues' },
    { icon: <Link to={`/report/${idproject}`} ><Icon className="fas fa-book" /></Link>, name: 'Report' }
  ];

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
            
            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                className={classes.speedDial}
                hidden={hidden}
                icon={<SpeedDialIcon icon={<Icon className="fas fa-folder" />} openIcon={<EditIcon />} />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction={'right'}
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
            <Button onClick={handleVisibility}></Button>
    </div>
  );
}
