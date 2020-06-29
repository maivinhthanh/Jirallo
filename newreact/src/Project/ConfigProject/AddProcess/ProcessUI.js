import React from 'react';
import { useDrag } from 'react-dnd'
import { useDrop } from 'react-dnd'
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
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
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
export default function IssueAdd(props) {
    const [open, setOpen] = React.useState(false);
    const [itemDetete, setItemDelete] = React.useState("")
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const handleOpen = (name) => {
        setOpen(true);
        setItemDelete(name)
    };

    const handleClose = () => {
        setOpen(false);
    };
    const deleteItem = () => {
        props.DeleteProcess(itemDetete)
        setOpen(false)
    };
    const [{ isDragging }, drag] = useDrag({
        item: { type: 'process', process: props.name },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })
    let item = props.item
    const fill = props.white ? 'white' : 'white'
    const [{ isOver }, drop] = useDrop({
        accept: 'process',
        drop: (item) => {
            props.changePosition(props, item)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
        
    })
    
    return (

        <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            padding: '7px 0px',
        }}>

            <div ref={drop} style={{ position: 'relative', width: '100%', height: '100%', }} >
                <div style={{
                    backgroundColor: fill, width: '100%',
                    height: '100%',
                }} >
                    <div
                        ref={drag}
                        style={{
                            opacity: isDragging ? 1 : 1,
                            fontSize: '1rem',
                            cursor: 'move',
                            border: '1px solid #ccaa', height: '40px',
                            padding: '5px'
                        }}
                        className="col-md-12">
                        <span >
                            {props.name}
                        </span>
                        <Icon className="fa fa-minus-circle" fontSize="small" 
                        style={{float: "right"}} onClick={()=>handleOpen(props.name)}/>
                    </div>
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
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2 id="simple-modal-title">Are you delete item?</h2>
                    <Button onClick={ deleteItem }>Yes</Button>
                </div>
            </Modal>
        </div>

    );
}