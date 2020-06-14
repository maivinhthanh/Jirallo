import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash'

import './AddImage.css';
// import AddImage from './AddImage'
import { Icon, Avatar, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100%',
        
      },
      
    },
    divUpload:{
        padding: '20%',
        border: '1px solid black',
        borderRadius: 5
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    divParent:{
        width: '100%',
    },
    divParentHover:{
        width: '100%',
        border: '1px solid black',
        borderRadius: '5px'
    },
    action:{
      float: "right"
    }

}));
const initialState = {
    isEdit: 0,
}

const todoReducer = (state, action) => {
  
  switch (action.type) {
    case 'EDIT':
      return {isEdit: 1};
    case 'DELETE_IMAGE':
      return {isEdit: 2}
    case 'UPLOAD_IMAGE':
      return {isEdit: 3}
    case 'SAVE':
      return {isEdit: 0}; 
    default:
      return state
  }
}
export default function ImageEditor(props ) {
    const classes = useStyles();

    const [state, dispatch] = React.useReducer(todoReducer, initialState)
    const [isHover, setIsHover] = React.useState(false);
    const [allFiles, setFile] = React.useState([]);
    const [avatar, setAvatar] = React.useState(null);
    const [name, setName] = React.useState(props.image.name);

    const handleHover = () =>{
        setIsHover(true)
    }
    const handleHoverFalse = () =>{
        setIsHover(false)
    }
    const editText = ()=>{
        dispatch({type: 'EDIT'})
    }
    const changeImage = () =>{
        dispatch({type: 'DELETE_IMAGE'})
    }
    const saveText = ()=>{
        dispatch({type: 'SAVE'})
        props.saveImage(avatar, name, props.image._id)
    }
    const handleName = (event) => {
        event.preventDefault();
        setName( event.target.value )
    }
    const deleteImage = ()=>{
        props.deleteImage(props.image._id)
    }
    const removeImage = ()=>{
        setFile([])
        setAvatar(null)
        dispatch({type: 'EDIT'})
    }
    const handleUpload = (e) => {
        e.preventDefault();
        let files = e.target.files

        for (var i = 0; i < files.length; i++) {

            let file = files[i];

            let reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => {

                let fileInfo = {
                    name: file.name,
                    type: file.type,
                    size: Math.round(file.size / 1000) + ' kB',
                    base64: reader.result,
                    file: file,
                }
                if (fileInfo.type === 'image/jpeg' || fileInfo.type === 'image/jpg' || fileInfo.type === 'image/png' || fileInfo.type === 'image/gif') {
                    setFile([...allFiles, fileInfo])
                }
            }

        }
        if (files[0].type === 'image/jpeg' || files[0].type === 'image/jpg' || files[0].type === 'image/png' || files[0].type === 'image/gif') {
            setAvatar(files[0])
        }
        else {
            setAvatar(null)
        }
        dispatch({type: 'UPLOAD_IMAGE'})
        // props.saveImage(avatar, name)

    }
    if(state.isEdit === 0){
        
        return (
            <div onMouseEnter={handleHover} onMouseLeave={handleHoverFalse} 
                className={isHover ? classes.divParentHover : classes.divParent}>
                    <div class="upload-btn-wrapper">
                        <img src={`http://localhost:8088/${props.image.address}`} width="500" height="350"/>
                        <p>{props.image.name}</p>
                    </div>   
                    {
                        !isHover ? 
                        <div className={classes.action}></div>
                        :
                        <div className={classes.action}>
                            <Avatar variant="rounded" onClick={editText} className={classes.small}>
                                <Icon className="fas fa-edit" color="secondary"></Icon>
                            </Avatar>
                        </div>
                    }               
            </div>
        )
    }
    else if(state.isEdit === 1){
        return(
            <div onMouseEnter={handleHover} onMouseLeave={handleHoverFalse} 
            className={isHover ? classes.divParentHover : classes.divParent}>
                <div class="upload-btn-wrapper">
                    <img src={`http://localhost:8088/${props.image.address}`} width="500" height="350"/>
                    <TextField value={name} onChange={handleName} label="Name Image" />
                </div>   
                {
                    !isHover ? 
                    <div className={classes.action}></div>
                    :
                    <div className={classes.action}>
                        <Avatar variant="rounded" onClick={saveText} className={classes.small}>
                            <Icon className="fas fa-check" color="primary"></Icon>
                        </Avatar>
                        <Avatar variant="rounded" onClick={deleteImage} className={classes.small}>
                            <Icon className="fas fa-times" color="secondary"></Icon>
                        </Avatar>
                        <Avatar variant="rounded" onClick={changeImage} className={classes.small}>
                            <Icon className="fas fa-image" color="secondary"></Icon>
                        </Avatar>
                    </div>
                }             
        </div>
        )
    }
    else if(state.isEdit === 2){
        return(
            <div onMouseEnter={handleHover} onMouseLeave={handleHoverFalse} 
            className={isHover ? classes.divParentHover : classes.divParent}>
                <div class="upload-btn-wrapper">
                    <button class="btn">Upload a image</button>
                    <input type="file" name="myfile" onChange={handleUpload}/>
                    <TextField value={name} onChange={handleName} label="Name Image" />
                </div>   
                {
                    !isHover ? 
                    <div className={classes.action}></div>
                    :
                    <div className={classes.action}>
                        <Avatar variant="rounded" onClick={saveText} className={classes.small}>
                            <Icon className="fas fa-check" color="primary"></Icon>
                        </Avatar>
                        <Avatar variant="rounded" onClick={deleteImage} className={classes.small}>
                            <Icon className="fas fa-times" color="secondary"></Icon>
                        </Avatar>
                    </div>
                }             
        </div>
        )
    }
    else if(state.isEdit === 3){
        return(
            <div onMouseEnter={handleHover} onMouseLeave={handleHoverFalse} 
            className={isHover ? classes.divParentHover : classes.divParent}>
                <div class="upload-btn-wrapper">
                    {allFiles.map((file, i) => {
                        return <img key={i} src={file.base64} className="img-fluid" width="500" height="350" />
                    })}
                    <img src="" />
                    <TextField value={name} onChange={handleName} label="Name Image" />
                </div>   
                {
                    !isHover ? 
                    <div className={classes.action}></div>
                    :
                    <div className={classes.action}>
                        <Avatar variant="rounded" onClick={saveText} className={classes.small}>
                            <Icon className="fas fa-check" color="primary"></Icon>
                        </Avatar>
                        <Avatar variant="rounded" onClick={deleteImage} className={classes.small}>
                            <Icon className="fas fa-times" color="secondary"></Icon>
                        </Avatar>
                        <Avatar variant="rounded" onClick={removeImage} className={classes.small}>
                            <Icon className="fas fa-image" color="secondary"></Icon>
                        </Avatar>
                    </div>
                }             
        </div>
        )
    }
    
}