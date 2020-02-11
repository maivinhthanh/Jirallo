import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: theme.palette.common.white,
        },
        },
        
    },
    
}))(MenuItem);

const useStyles = makeStyles(theme =>({
    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
}));
export default function CustomizedMenus({jwt}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Avatar onClick={handleClick} className={classes.large}>H</Avatar>
        
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem>
                    <Link to="/">
                        <ListItemIcon>
                            <Avatar alt="Remy Sharp" src="/logo-menu.jpg" className={classes.small} />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </Link>
                </StyledMenuItem>

                <StyledMenuItem>
                    <Link to="/viewAll">
                        <ListItemIcon>
                            <Icon className="fas fa-folder" />
                        </ListItemIcon>
                        <ListItemText primary="All Project" />
                    </Link>
                </StyledMenuItem>

                <StyledMenuItem>
                    <Link to={`/infouser/${jwt.data.userId}`}>
                        <ListItemIcon>
                            <Icon className="fas fa-user" />
                        </ListItemIcon>
                        <ListItemText primary="User" />
                    </Link>
                </StyledMenuItem>

                <StyledMenuItem>
                    <Link to="/login" onClick={()=>this.logout()}>
                        <ListItemIcon>
                            <Icon className="fas fa-sign-out-alt" />
                        </ListItemIcon>
                        <ListItemText primary="Log Out" />
                    </Link>
                </StyledMenuItem>

            </StyledMenu>
        </div>
    );
}