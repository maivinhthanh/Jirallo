import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Container, Grid } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import Icon from '@material-ui/core/Icon';

import Issues from './Issues'
import InputField from '../Backlog/inputField'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 2,
    offset: theme.mixins.toolbar,
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

export default function PrimarySearchAppBar(props) {
  const [open, setOpen] = React.useState(false);
  const [openedit, setOpenEdit] = React.useState(false);
  const classes = useStyles();
  const [nameIssue, setName] = React.useState('');
  const [optionType, setType] = React.useState('')
  const [optionPriority, setPriority] = React.useState('')

  const beginSprint = (id) => {
    props.beginStatusSprint(id)
  }
  const updateNameSprint = (name, id) => {
    props.updateNameSprint(id, name)
  }
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleChange = (e) => {
    setName(e.target.value)
  }
  const handleChangeType = (e) => {
    setType(e.target.value)
  }
  const handleChangePriority = (e) => {
    setPriority(e.target.value)
  }
  const SaveIssue = () => {
    let issue = {
      name: nameIssue,
      type: optionType,
      priority: optionPriority,
      idsprint: props.sprint._id
    }
    props.createIssue(issue)
  }
  return (
    <Container className={classes.grow}>
      <AppBar position="static" color="transparent">
        <Toolbar >

          <Typography className={classes.title} variant="h6" noWrap>
            <InputField nameInput={'issue'} sprint={props.sprint} size="30px" arrow="10px" margin="10px"
              changeName={(data, name) => updateNameSprint(data, props.sprint._id)}>{props.sprint.name}</InputField>
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          {
              props.sprint._id
              ?<ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                <Button onClick={() => beginSprint(props.sprint._id)}>Begin Sprint</Button>
                <Button>Edit Sprint</Button>
                <Button onClick={handleOpen}>Create Sprint</Button>
              </ButtonGroup>
              :<ButtonGroup variant="text" color="primary" aria-label="text primary button group">
              <Button onClick={handleOpen}>Create Sprint</Button>
            </ButtonGroup>
              
            }

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
        <Issues idproject={props.idproject} idsprint={props.sprint._id} listissues={props.sprint.listissues} selectuser={props.selectuser} />
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
                value={optionType}
                onChange={handleChangeType}
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
              <Select
                native
                value={optionPriority}
                onChange={handleChangePriority}
                style={{marginBottom:'20px'}}
                inputProps={{
                  name: 'age',
                  id: 'age-native-simple',
                }}
              >
                <option value="" />
                <option value='highest'>Highest</option>
                <option value='high'>High</option>
                <option value='medium'>Medium</option>
                <option value='low'>Low</option>
                <option value='lowest'>Lowest</option>
              </Select>
              <br />
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
