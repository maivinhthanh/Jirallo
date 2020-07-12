import React from 'react';
import _ from 'lodash'
import { useDrag } from 'react-dnd'
import { useDrop } from 'react-dnd'
import { Link } from "react-router-dom";

import IssueInfoModal from './IssueInfoModal'
import * as action from '../Backlog/action'
import { connect } from 'react-redux'

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core'


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
        padding: theme.spacing(2, 4, 2),
    },
    root: {
        '& > *': {
          margin: theme.spacing(0),
          width: 400,
        },
      },
}));

function IssueAdd(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [{ isDragging }, drag] = useDrag({
        item: { type: 'issue', issue: props.item },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
        end: (item, monitor) =>{
            props.handleRemoveIssueIntoSprint(props.item)
        }
    })
    let item = props.item
    const fill = props.white ? 'white' : 'white'
    const [{ isOver }, drop] = useDrop({
        accept: 'issue',
        drop: (item) => {
            props.handleAddIssueIntoSprint(props, item)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })
    const showInfomation = (id) => {
        props.showInfomationIssue(id)
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            padding: '1px 0px',
        }}>

            <div ref={drop} style={{ position: 'relative', width: '100%', height: '100%', }} >
                <div style={{
                    backgroundColor: fill, width: '100%',
                    height: '100%',
                }} >
                    <Grid container
                        ref={drag}
                        style={{
                            opacity: isDragging ? 1 : 1,
                            fontSize: '1rem',
                            cursor: 'move',
                            border: '1px solid #ccaa', height: '40px',
                            padding: '5px'
                        }}>
                        <Grid item xs={10}>
                            <span onClick={() => showInfomation(props.item._id)}>
                                <span className="mr-2">
                                    {props.item.type === 'bug' ? <i className="fas fa-bug" style={{ color: 'red' }}></i> : <i className="fas fa-tasks" style={{ color: 'green' }}></i>}
                                </span>
                                {props.item.name}

                            </span>
                        </Grid>
                        <Grid item xs={1} style={{ display: 'flex' }}>
                            <Link to={`/issues/${props.idproject}/${item._id}`} >
                                <i className="fas fa-arrow-right"></i>
                            </Link>
                        </Grid>
                        <Grid item xs={1} style={{ display: 'flex' }}>
                            <span >
                                <IssueInfoModal idissue={props.item._id} />
                            </span>
                        </Grid>
                    </Grid>

                </div>
                {isOver && (
                    <div style={{
                        position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 1,
                        opacity: 1, border: '4px black dotted', backgroundColor: 'whitesmoke',
                    }}
                    />
                )}
            </div>
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
                        <TextField id="standard-basic" value={props.issues.name}/> <br/>
                        <TextField id="standard-basic" value={props.issues.priority}/> <br/>
                        <TextField id="standard-basic" value={props.issues.process}/> <br/>
                        {
                            !_.isEmpty(props.issues.repoter) && 
                            <TextField id="standard-basic" value={props.issues.repoter.name}/> 
                        }
                       <br/>
                        {
                            !_.isEmpty(props.issues.assignee) && 
                            <TextField id="standard-basic" value={props.issues.assignee.name}/>
                        }
                        <br/>
                        <TextField id="standard-basic" value={!_.isEmpty(props.issues.comment) ? props.issues.comment : 'do not have comment' }/> <br/>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>

    );
}
const mapStateToProps = (state) => {
    return {
        issues: state.issues
    }
}
const mapDispatchToProps = dispatch => {
    return {
        showInfomationIssue: (id) => dispatch(action.showInfomationIssue(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(IssueAdd)