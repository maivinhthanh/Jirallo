import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField'
import * as actions from './action'
import { connect } from 'react-redux'
import _ from 'lodash'

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
    },
    icon: {
        margin: theme.spacing(2)
      },
  }));
function ModalAddMember(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('')
    const [position, setPosition] = React.useState('')

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePosition = (e) => {
        setPosition(e.target.value)
    }
  
    const saveAddMember = async() => {
        await props.findUserLikeEmail(email)
        let user = {
            _id: _.get(props.listMember, ['0', '_id']),
            position: position
        }
        await props.AddMemberToProject(props.idProject, user)
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
        <span onClick={handleOpen}><i className="fa fa-plus"> Add</i></span>
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
                <p>Modal add member</p>
              <TextField id="standard-basic" label="Email" value={email}  onChange={handleChangeEmail}/><br/>
              <TextField id="standard-basic" label="Position" value={position}  onChange={handleChangePosition}/><br/>
              <Button variant="contained" onClick={saveAddMember} color="primary" style={{ marginTop: '20px'}}>
                Save
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
      </div>
    );
  }

  const mapStateToProps = (state) => {
      return {
          listMember : state.listMember,
      }
  }
  const mapDispatchToProps = dispatch => {
    return {
      findUserLikeEmail: (email) => dispatch( actions.findUserLikeEmailAct(email) ),
      AddMemberToProject: (idProject, user) => dispatch(actions.AddMemberAct(idProject, user))
  
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps) (ModalAddMember)


