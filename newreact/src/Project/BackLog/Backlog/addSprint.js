import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import * as actions from './action'
import { connect } from 'react-redux'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [namesprint, setName] = React.useState('')

  const handleChange = (e) => {
      setName(e.target.value)
  }
  const saveSprint = () => {
    const idproject = props.idproject
    props.handleSaveName(namesprint,idproject)
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className='btn' style={{background: '#3f51b5', color: 'white'}} type="button" onClick={handleOpen}>
        Add Sprint
      </button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Create sprint</h2>
          <form className={classes.root} noValidate autoComplete="off">
              <TextField id="standard-basic" label="name sprint" value={namesprint} onChange={handleChange}/>
              <Button variant="contained" color="primary" onClick={saveSprint} >
                Save
              </Button>
            </form>
        </div>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    note: state.note,
    user : state.auth,
    listsprint: state.listsprint,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleSaveName: (name, idproject) => dispatch( actions.handleSaveName(name, idproject) ),
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (SimpleModal)