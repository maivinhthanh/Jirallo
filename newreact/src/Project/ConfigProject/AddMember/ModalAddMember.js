import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField'
import _ from 'lodash'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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
export default function ModalAddMember(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('')
  const [position, setPosition] = React.useState('')

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleChangePosition = (e) => {
    setPosition(e.target.value)
  }

  const saveAddMember = async () => {
    await props.findUserLikeEmail(email)
    let user = {
      _id: _.get(props.auth, ['0', '_id']),
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
              <h4>Modal add member</h4>
              <TextField id="standard-basic" label="Email" value={email} onChange={handleChangeEmail} /><br />
              <Select
                value={position}
                onChange={handleChangePosition}
                displayEmpty
                className={classes.selectEmpty}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="Developer">
                  <em>Developer</em>
                </MenuItem>
                <MenuItem value={'Manager'}>Manager</MenuItem>
              </Select><br/>
              {/* <TextField id="standard-basic" label="Position" value={position} onChange={handleChangePosition} /><br /> */}
              <div className='btn_save'>
              <Button variant="contained" onClick={saveAddMember} color="primary" style={{ marginTop: '20px' }}>
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

// const mapStateToProps = (state) => {
//   return {
//     listMember: state.listMember,
//     auth: state.auth
//   }
// }
// const mapDispatchToProps = dispatch => {
//   return {
//     findUserLikeEmail: (email) => dispatch(actions.findUserLikeEmailAct(email)),
//     AddMemberToProject: (idProject, user) => dispatch(actions.AddMemberAct(idProject, user))

//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(ModalAddMember)

