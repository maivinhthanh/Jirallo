import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as action from "../Backlog/action";
import { connect } from "react-redux";
import { emphasize, withStyles } from "@material-ui/core/styles";
import {  Chip, InputLabel, NativeSelect, InputBase } from "@material-ui/core";
import _ from 'lodash'
import { successModal } from "../../../Components/modalStatus";

const useStyles = makeStyles(theme => ({
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
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 400
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
}));
const StyledBreadcrumb = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: 24,
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
const BootstrapInput = withStyles(theme => ({
    root: {
      "label + &": {
        marginTop: theme.spacing(3)
      }
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
      }
    }
  }))(InputBase);

function Modalcreate(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [process, setProcess] = React.useState("");
  const [type, setType] = React.useState("");
  const [tag, setTag] = React.useState("");
  const [priority, setPriority] = React.useState("");

  const handleChangePriority = e => {
    setPriority(e.target.value);
  };
  const handleChangeTag = e => {
    setTag(e.target.value);
  };
  const handleChangeType = e => {
    setType(e.target.value);
  };
  const handleChangeProcess = e => {
    setProcess(e.target.value);
  };
  const handleChangeName = e => {
    setName(e.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submitIssue = () => {
    const { project }  = props
    const issue = {
      name: name,
      process: process,
      type: type,
      tag: tag,
      priority: priority
    };
    props.createIssue(issue, _.get(project, '_id'), true);
    props.ShowListIssueInBackLog(_.get(project, '_id'), null);
    handleClose();
    successModal()
  };

  return (
    <div>
      <StyledBreadcrumb
        component="a"
        href="#"
        label="Create Issue"
        onClick={handleOpen}
      />
      {/* <button class="btn btn-custom btn-outline-danger btn-lg btn-block" onClick={handleOpen}> Create Issue</button> */}
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
            <h2 id="transition-modal-title"> create issue</h2>
            <form className={classes.root} noValidate autoComplete="off">
            <InputLabel htmlFor="age-customized-native-simple">
                  Name
                </InputLabel>
              <TextField
                value={name}
                onChange={handleChangeName}
                id="outlined-basic"
                label="Name issue"
                variant="outlined"
              />
              <br />
              <br />
                <InputLabel htmlFor="age-customized-native-simple">
                  Type
                </InputLabel>
                <NativeSelect
                  value={type}
                  onChange={handleChangeType}
                  input={
                    <BootstrapInput
                      name="type"
                      id="age-customized-native-simple"
                    />
                  }
                >
                  <option value="" />
                  <option value={'task'}>Task</option>
                  <option value={'bug'}>Bug</option>
                </NativeSelect>
              <br />
                <InputLabel htmlFor="age-customized-native-simple">
                  Process
                </InputLabel>
                <NativeSelect
                  value={process}
                  onChange={handleChangeProcess}
                  input={
                    <BootstrapInput
                      name="process"
                      id="age-customized-native-simple"
                    />
                  }
                >
                  <option value="" />
                  <option value={'todo'}>To do</option>
                  <option value={'in process'}>In process</option>
                  <option value={'done'}>Done</option>
                </NativeSelect>
              <br/>
                <InputLabel htmlFor="age-customized-native-simple">
                  Prioity
                </InputLabel>
                <NativeSelect
                  value={priority}
                  onChange={handleChangePriority}
                  input={
                    <BootstrapInput
                      name="priority"
                      id="age-customized-native-simple"
                    />
                  }
                >
                  <option value="" />
                  <option value={'medium'}>Medium</option>
                  <option value={'height'}>Height</option>
                  <option value={'low'}>Low</option>
                </NativeSelect>
              <br />
              <InputLabel htmlFor="age-customized-native-simple">
                  Tag
                </InputLabel>
              <TextField
                value={tag}
                onChange={handleChangeTag}
                id="outlined-basic"
                label="Tag issue"
                variant="outlined"
              />
              <br />
              <div className="list-btn" style={{ textAlign: "end" }}>
                <Button color="primary" onClick={submitIssue}>
                  Save
                </Button>
                <Button color="secondary" onClick={handleClose}>
                  Cancle
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    listsprint: state.listsprint,
    project: state.project
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createIssue: (issue, idproject, isSprint) =>
      dispatch(action.createIssue(issue, idproject, isSprint)),
    ShowListIssueInBackLog: (idproject, iduser) =>
      dispatch(action.ShowListIssueInBackLog(idproject, iduser))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Modalcreate);
