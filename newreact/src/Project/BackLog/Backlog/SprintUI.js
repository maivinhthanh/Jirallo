import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { Container, Grid } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import Icon from '@material-ui/core/Icon';
import SearchIcon from '@material-ui/icons/Search';

import Issues from './Issues'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 2,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar({idproject, sprint, selectuser}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [idsprint, setSprint] = React.useState('')

  const AddIssueOnSprint = (id) => {
    console.log(id)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  
  return (
    <Container className={classes.grow}>
      <AppBar position="static">
        <Toolbar >
          
          <Typography className={classes.title} variant="h6" noWrap>
            {sprint.name}
          </Typography>
          
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Icon className="fas fa-play" />
            <Icon className="fas fa-pencil-alt" />
            <Icon className="fas fa-plus" onClick={ () => AddIssueOnSprint(sprint._id)} />
          </div>
          <div className={classes.sectionMobile}>
            <Icon
              className="fas fa-ellipsis-v" 
            >
              <MoreIcon />
            </Icon>
          </div>
        </Toolbar>
      </AppBar>
      <Grid>
        <Issues idproject={idproject} idsprint={sprint._id} listissues={sprint.listissues} selectuser={selectuser}/> 
          
      </Grid>
    </Container>
  );
}