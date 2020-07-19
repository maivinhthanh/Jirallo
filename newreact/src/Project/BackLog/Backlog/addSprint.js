import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as actions from "./action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import { successModal } from "../../../Components/modalStatus";

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "#6A8DCD",
    "&:hover": {
      backgroundColor: "#3060BB"
    }
  }
}))(Button);

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  margin: {
    margin: theme.spacing(1),
  }
}));

function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [namesprint, setName] = React.useState("");

  const handleChange = e => {
    setName(e.target.value);
  };
  const saveSprint = () => {
    const idproject = props.idproject;
    props.handleSaveName(namesprint, idproject);
    handleClose();
    successModal('Add sprint success')
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment style={{ marginTop: "30px", marginBottom: "20px" }}>
      <Button variant="outlined" color="primary" style={{ float: 'right'}} onClick={handleOpen}>
      <i class="fas fa-plus"></i> Add sprint
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Create sprint</h2>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="standard-basic"
              label="name sprint"
              value={namesprint}
              onChange={handleChange}
            />
            <Button variant="contained" color="primary" onClick={saveSprint}>
              Save
            </Button>
          </form>
        </div>
      </Modal>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    note: state.note,
    user: state.auth,
    listsprint: state.listsprint
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleSaveName: (name, idproject) =>
      dispatch(actions.handleSaveName(name, idproject))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SimpleModal);
