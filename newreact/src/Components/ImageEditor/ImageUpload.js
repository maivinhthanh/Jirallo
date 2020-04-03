import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash'

import './AddImage.css';
// import AddImage from './AddImage'
import { Icon } from '@material-ui/core';

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

}));
const initialState = {isEdit: false}

const todoReducer = (state, action) => {
  
  switch (action.type) {
    case 'EDIT':
      return {isEdit: false};
    case 'SAVE':
      return {isEdit: true}; 
    default:
      return state
  }
}
export default function ImageEditor(props ) {
    const classes = useStyles();

    const [state, dispatch] = React.useReducer(todoReducer, initialState)
    const [allFiles, setFile] = React.useState([]);
    const [avatar, setAvatar] = React.useState(null);
    const [name, setName] = React.useState(null);
    const handleName = (event) => {
        event.preventDefault();
        setName( event.target.value )
    }
    const saveImage = ()=>{
        props.saveImage(avatar, name)
    }
    const deleteImage = ()=>{
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
        dispatch({type: 'SAVE'})
        // console.log(this.state.avatar)
        // props.saveImage(avatar, name)

    }
    if(!state.isEdit){
        return (
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 text-center">
                    <div class="upload-btn-wrapper">
                        <button class="btn">Upload a image</button>
                        <input type="file" name="myfile" onChange={handleUpload}/>
                    </div>                  
                </div>
                <div className="col-3"></div>
            </div>
        )
    }
    else{
        return(
            <div className="row">
                <div className="col-12">
                    {allFiles.map((file, i) => {
                        return <img key={i} src={file.base64} className="img-fluid" width="500" height="350" />
                    })}
                    <img src="" />
                </div>
                <div className="col-12">
                    <button className="btn btn-danger" onClick={deleteImage}><Icon className="fa fa-minus"></Icon></button>
                </div>
                <div className="col-12">
                    <input className="form-control" onChange={handleName} />
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" onClick={saveImage}><Icon className="fa fa-check"></Icon></button>
                </div>
            </div>
        )
    }
    
}