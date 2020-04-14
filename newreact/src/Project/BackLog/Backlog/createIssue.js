import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as action from '../Backlog/action';
import { connect } from 'react-redux'

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
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 400,
        },
    },
}));

function Modalcreate(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [process, setProcess] = React.useState('');
    const [type, setType] = React.useState('');
    const [tag, setTag] = React.useState('');
    const [priority, setPriority] = React.useState('');

    const handleChangePriority = (e) => {
        setPriority(e.target.value)
    }
    const handleChangeTag = (e) => {
        setTag(e.target.value)
    }
    const handleChangeType = (e) => {
        setType(e.target.value)
    }
    const handleChangeProcess = (e) => {
        setProcess(e.target.value)
    }
    const handleChangeName = (e) => {
        setName(e.target.value)
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const submitIssue = () => {
        const issue = {
            name: name,
            process: process,
            type: type,
            tag: tag,
            priority: priority,
        }
        props.createIssue(issue, props.idproject)
        props.ShowListIssueInBackLog(props.idproject, null)
        handleClose()

    }

    return (
        <div style={{ margin: '30px 30px 20px auto'}}>
              <button class="btn btn-custom btn-outline-danger btn-lg btn-block" onClick={handleOpen}> Create Issue</button>
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
                        <h2 id="transition-modal-title"> create issue</h2>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField value={name} onChange={handleChangeName} id="outlined-basic" label="Name issue" variant="outlined" /><br />
                            <TextField value={process} onChange={handleChangeProcess} id="outlined-basic" label="Process issue" variant="outlined" /><br />
                            <TextField value={type} onChange={handleChangeType} id="outlined-basic" label="Type issue" variant="outlined" /><br />
                            <TextField value={priority} onChange={handleChangePriority} id="outlined-basic" label="Priority issue" variant="outlined" /><br />
                            <TextField value={tag} onChange={handleChangeTag} id="outlined-basic" label="Tag issue" variant="outlined" /><br />
                            <div className='list-btn' style={{textAlign: 'end'}}>
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
const mapStateToProps = (state) => {
    return {
        listsprint: state.listsprint
    }
}
const mapDispatchToProps = dispatch => {
    return {
        createIssue: (issue, idproject) => dispatch(action.createIssue(issue, idproject)),
        ShowListIssueInBackLog : (idproject, iduser) => dispatch(action.ShowListIssueInBackLog(idproject,iduser))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Modalcreate)