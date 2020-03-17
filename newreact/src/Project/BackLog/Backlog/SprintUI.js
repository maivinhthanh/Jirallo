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
import * as actions from './action'
import { connect } from 'react-redux'
import InputField from '../Backlog/inputField'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';


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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function PrimarySearchAppBar({idproject, sprint, selectuser}, props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [nameIssue, setName] = React.useState('');
  const [optionChoose, setOption] = React.useState('')

  const beginSprint = (id) => {
    props.beginStatusSprint(id, idproject)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const updateNameSprint = (name, id) => {
    props.updateNameSprint(id, name)
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setName(e.target.value)
  }
  const handleChangeSelect = (e) => {
    setOption(e.target.value)
  }
  const SaveIssue = () => {
    let issue = {
      name: nameIssue,
      type: optionChoose
    }
    console.log(issue, idproject, props)
    // props.createIssue(issue, idproject)
  }
  return (
    <Container className={classes.grow}>
      <AppBar position="static">
        <Toolbar >

          <Typography className={classes.title} variant="h6" noWrap>
            <InputField nameInput={'issue'} sprint={sprint} size="30px" arrow="10px" margin="10px"
              changeName={(data, name) => updateNameSprint(data, sprint._id)}>{sprint.name}</InputField>
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
            <Icon className="fas fa-play" onClick={() => beginSprint(sprint._id)} />
            <Icon className="fas fa-pencil-alt" />
            <Icon className="fas fa-plus" onClick={handleOpen} />
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
        <Issues idproject={idproject} idsprint={sprint._id} listissues={sprint.listissues} selectuser={selectuser} />
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField style={{marginBottom:'20px'}} id="standard-basic" label="name issue"
               value={nameIssue}
               onChange={handleChange}
              />
              <br/>
              <Select
                native
                value={optionChoose}
                onChange={handleChangeSelect}
                style={{marginBottom:'20px'}}
                inputProps={{
                  name: 'age',
                  id: 'age-native-simple',
                }}
              >
                <option value="" />
                <option value='bug'>Bug</option>
                <option value='task'>Task</option>
              </Select>
                <br/>
              <Button style={{ marginLeft:'80px' }} variant="contained"
              onClick={SaveIssue}
               color="primary">
                Save
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    listsprint: state.listsprint
  }
}
const mapDispatchToProps = dispatch => {
  return {
    beginStatusSprint: (idsprint, idproject) => dispatch(actions.beginStatusSprint(idsprint, idproject)),
    updateNameSprint: (id, name) => dispatch(actions.updateNameSprint(id, name)),
    createIssue : (issue, idproject) => dispatch(actions.createIssue(issue, idproject))
    // createIssue : (nameIssue, optionChoose, idproject) => dispatch(actions.createIssue(nameIssue, optionChoose, idproject))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrimarySearchAppBar)