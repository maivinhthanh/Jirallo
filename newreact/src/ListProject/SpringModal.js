import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import * as actions from './ListProject/action'
import { connect } from 'react-redux'
import { successModal, errorModal } from '../Components/modalStatus';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash'


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
    border: '1px solid',
    borderRadius: '100px' 
  }
}));

function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [nameProject, setName] = React.useState('')

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const saveName = () => {
    if (!_.isEmpty(nameProject)) {
      props.handleSave(nameProject)
      handleClose()
      successModal()
    }
    else {
      errorModal('Please enter name project')
    }
    
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
     <ToastContainer />
      <button type="button" onClick={handleOpen}>
      <i className="fas icon_add fa-plus-circle"></i>
      <div className='text_add'>
      Add project
      </div>
      </button>
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
              <TextField id="standard-basic" label="Name project" value={nameProject}  onChange={handleChangeName}/>
              <div className='btn_save'>
              <Button variant="contained" onClick={saveName} color="primary">
                Save
              </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    note: state.note,
    user : state.auth,
    listproject: state.listproject,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleSave: (name) => dispatch( actions.handleSave(name) ),

  }
}
export default connect(mapStateToProps, mapDispatchToProps) (TransitionsModal)