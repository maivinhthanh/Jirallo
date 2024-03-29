import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField'
import * as actions from './action'
import { connect } from 'react-redux'
import Toast from '../../../Components/Toast'

const useStyles = makeStyles(theme => ({
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
  btn: {
    padding: '10px',
    marginTop: '7px',
  }
}));

function SimpleModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [nameProcess, setName] = React.useState('')

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const saveName = () => {
    let newlist = [...props.project.process, nameProcess.toLowerCase() ]
    props.AddProcess(props.idproject, newlist)
    handleClose()
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add
      </Button>
      
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
              <TextField id="standard-basic" label="Name process" value={nameProcess}  onChange={handleChangeName}/>
              <Button variant="contained" onClick={saveName} color="primary">
                Save
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
      <Toast open={props.note.show} message={props.note.message} type={props.note.type} />
    </div>
  );
}
const mapStateToProps = state => {
  return {
    note: state.note
  }
}
const mapDispatchToProps = dispatch => {
  return {
    AddProcess: (id, process) => dispatch( actions.AddProcess(id, process) ),

  }
}

export default connect(mapStateToProps, mapDispatchToProps) (SimpleModal)