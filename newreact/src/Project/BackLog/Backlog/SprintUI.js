import React, { Fragment } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Container, Grid } from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";
import Icon from "@material-ui/core/Icon";

import Issues from "./Issues";
import InputField from "../Backlog/inputField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";

import { Paper, Breadcrumbs, Chip, Avatar } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { emphasize, withStyles } from "@material-ui/core/styles";
import CreateIssue from "./createIssue";
import DatePicker from '../../../Components/DatePicker'

import _ from 'lodash'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 2,
    offset: theme.mixins.toolbar
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const StyledBreadcrumb = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: 20,
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.grey[300]
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12)
    }
  }
}))(Chip);

export default function PrimarySearchAppBar(props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [nameIssue, setName] = React.useState("");
  const [optionType, setType] = React.useState("");
  const [optionPriority, setPriority] = React.useState("");
  let idActiveSprint = ''
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [selectedDeadline, setSelectedDeadline] = React.useState(
    new Date("2020-10-04")
  )
  const [idActive, setId] = React.useState(null)
  const [valueName, setValueName] = React.useState('')
  const beginSprint = id => {
    props.beginStatusSprint(id);
  };
  const updateNameSprint = (name, id) => {
    props.updateNameSprint(id, name);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = e => {
    setName(e.target.value);
  };
  const handleChangeType = e => {
    setType(e.target.value);
  };
  const handleChangePriority = e => {
    setPriority(e.target.value);
  };
  const handleDateChange =(date) => { 
    setSelectedDate(date);
  }
  const handleChangeDeadline = (date) => {
    setSelectedDeadline(date)
  }
  const handleChangeName = (e) => {
    setValueName(e.target.value)
  }
  const SaveIssue = async() => {
    let issue = {
      name: nameIssue,
      type: optionType,
      priority: optionPriority,
      idsprint: props.sprint._id
    };
    await props.createIssue(issue, true);
    handleClose()
  };
  const handleClick5 = event => {
    event.preventDefault();
    alert("You clicked a breadcrumb.");
  };
  const handleSubmit = () => {
    // let sprint = 
    //   {
    //     name: valueName,
    //     timebegin: selectedDate,
    //     deadline: selectedDeadline
    //   }
    //   console.log(idActiveSprint)
      console.log(idActive)
    //   console.log(document.getElementById('modal_edit'))
    // props.updateSprint(props.sprint._id,sprint )
  }
  const setIdActive = (id) => {
    idActiveSprint = _.cloneDeep(id)
    setId(idActiveSprint)
  }
  const handleDeleteSprint = (id) => {
    props.handleDeleteSprint(id, props.idproject)
  }

  return (
    <Container className={classes.grow}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <InputField
              nameInput={"issue"}
              sprint={props.sprint}
              size="20px"
              arrow="10px"
              margin="5px"
              changeName={(data, name) =>
                updateNameSprint(data, props.sprint._id)
              }
            >
              {props.sprint.name}
            </InputField>
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* {
              props.sprint._id
              ?<ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                <Button onClick={() => beginSprint(props.sprint._id)}>Begin Sprint</Button>
                <Button>Edit Sprint</Button>
                <Button onClick={handleOpen}>Create Sprint</Button>
              </ButtonGroup>
              :<ButtonGroup variant="text" color="primary" aria-label="text primary button group">
              <Button onClick={handleOpen}>Create Sprint</Button>
            </ButtonGroup>
              
            } */}
            {props.sprint._id ? (
              <div className="kt-section__content">
                <Paper elevation={0} className={classes.root}>
                  <Breadcrumbs aria-label="Breadcrumb">
                    <StyledBreadcrumb
                      component="a"
                      href="#"
                      label="Begin Sprint"
                      avatar={
                        <Avatar className={classes.avatar}>
                          <HomeIcon />
                        </Avatar>
                      }
                      onClick={() => beginSprint(props.sprint._id)}
                    />
                    <StyledBreadcrumb
                      component="a"
                      href="#"
                      label="Edit Sprint"
                      data-toggle="modal"
                      data-target="#myModal"
                      id="modal_edit"
                      value={props.sprint._id}
                      data={props.sprint._id}
                      onClick={() => setIdActive(props.sprint._id)}
                    />
                    <StyledBreadcrumb
                      label="Create Issue"
                      deleteIcon={<ExpandMoreIcon />}
                      onClick={handleOpen}
                      onDelete={handleClick5}
                    />
                     <StyledBreadcrumb
                      label="Delete"
                      avatar={
                        <Avatar className={classes.avatar}>
                          <i class="fas fa-minus-circle"></i>
                        </Avatar>
                      }
                      onClick={() => handleDeleteSprint(props.sprint._id)}
                    />
                  </Breadcrumbs>
                </Paper>
              </div>
            ) : (
              <Fragment>
                <CreateIssue />
                {/* <StyledBreadcrumb
                  component="a"
                  href="#"
                  label="Create Issue"
                  onClick={createIssue}
                /> */}
                {/* <StyledBreadcrumb
                  label="Create Sprint"
                  deleteIcon={<ExpandMoreIcon />}
                  onClick={handleOpen}
                  onDelete={handleClick5}
                /> */}
              </Fragment>
            )}
          </div>

          <div className={classes.sectionMobile}>
            <Icon className="fas fa-ellipsis-v">
              <MoreIcon />
            </Icon>
          </div>
        </Toolbar>
      </AppBar>
      <Grid>
        <Issues
          idproject={props.idproject}
          idsprint={props.sprint._id}
          listissues={props.sprint.listissues}
          selectuser={props.selectuser}
        />
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
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form className={classes.root} noValidate autoComplete="off">
            <Grid container>
                <Grid item xs={3}>
                <div style={{ marginTop: '30px'}}>
                  Name Issue:
                </div>
                </Grid>
                <Grid item xs={9}>
                <TextField
                style={{ marginBottom: "20px", width: '100%' }}
                id="standard-basic"
                label="name issue"
                value={nameIssue}
                onChange={handleChange}
              />
              </Grid>
              <Grid item xs={3}>
                <div style={{ marginTop: '17px'}}>
                 Type:
                </div>
                </Grid>
                <Grid item xs={9}>
                <Select
                native
                value={optionType}
                onChange={handleChangeType}
                style={{ marginBottom: "20px", width: '100%' }}
                inputProps={{
                  name: "age",
                  id: "age-native-simple"
                }}
              >
                <option value="" />
                <option value="bug">Bug</option>
                <option value="task">Task</option>
              </Select>
              </Grid>
              <Grid item xs={3}>
                <div style={{ marginTop: '17px'}}>
                 Priority:
                </div>
                </Grid>
                <Grid item xs={9}>
                <Select
                native
                value={optionPriority}
                onChange={handleChangePriority}
                style={{ marginBottom: "20px", width: '100%' }}
                inputProps={{
                  name: "age",
                  id: "age-native-simple"
                }}
              >
                <option value="" />
                <option value="highest">Highest</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                <option value="lowest">Lowest</option>
              </Select>
              </Grid>
           <div style={{ marginLeft: 'auto'}}>
           <Button
                variant="contained"
                onClick={SaveIssue}
                color="primary"
              >
                Save
              </Button>
           </div>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
      <div class="modal" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Sprint</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div class="modal-body">
              <div class="container">
                <form>
                  <div class="form-group" style={{ textAlign: "left" }}>
                    <label for="email">
                      Name sprint:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      placeholder="Enter name"
                      name="name"
                      value={valueName}
                      onChange={handleChangeName}
                    />
                  </div>
                  <div class="form-group">
                  <DatePicker label={""} date={selectedDate} changedate={handleDateChange} />
                  </div>
                  <div class="form-group">
                  <DatePicker label={""} date={selectedDeadline} changedate={handleChangeDeadline} />
                  </div>
                </form>
              </div>
            </div>

            <div class="modal-footer">
            <button type="button" class="btn btn-primary" onClick={handleSubmit}>
                    Submit
                  </button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
