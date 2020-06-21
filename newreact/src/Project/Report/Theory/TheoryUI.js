import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash'
import ListDivAction from '../../../Components/ListInputEdit/DivActionUI'
import DivAction from '../../../Components/InputEdit/DivActionUI'
import ImageUpload from '../../../Components/ImageEditor/ImageUpload'
import ImageEditor from '../../../Components/ImageEditor/ImageEditor'
import {Button, Icon } from '@material-ui/core';

const useStyles = makeStyles({
  A4: {
    // height: 842,
    paddingLeft: 113,
    paddingRight: 75,
    paddingBottom: 75,
    paddingTop: 75
  },
  coverBorder:{
    borderImage: "url('public/images/border.png')"
  },
  coverTitle:{
    fontSize: 20,
    margin: 15,
    fontWeight: 'bold'
  },
  coverSubTitle:{
    fontSize: 18,
    margin: 15,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  coverContent:{
    fontSize: 18,
    
  },

});

export default function TheoryUI(props) {
  const classes = useStyles();

  const [indexChange, setIndexChange] = React.useState(null);

  const IndexChangeAction = (index) =>{
    setIndexChange(index)
  }
  const EditContent = (data, paragraph) =>{
    props.EditContent(data, paragraph, indexChange)
  }
  const saveImage = (image, name)=>{
    const idtheory = props.info.theory[indexChange]._id
    props.saveImage(image, name, idtheory)
  }
  const updateImage = (image, name, idimage)=>{
    const idtheory = props.info.theory[indexChange]._id
    props.updateImage(image, name, idtheory, idimage)
  }
  const deleteImage = (idimage) =>{
    const idtheory = props.info.theory[indexChange]._id
    props.deleteImage(idtheory, idimage)
  }
  const AddTheory = ()=>{
    props.AddTheory()
  }
  const updateTitle = (name) =>{
    const idtheory = props.info.theory[indexChange]._id
    const nameslice = name.slice(4, name.length)
    props.updateTitle(nameslice, idtheory)
  }
  return (
    <div className="Cover">
      <div className={classes.A4} >
          <div className={classes.coverTitle}>
            CHƯƠNG 1: CƠ SỞ LÝ THUYẾT
          </div>  
          
          {
            _.map(props.info.theory, (item, index)=>{
              return (
                <div onMouseEnter={()=>IndexChangeAction(index)} key={index}>
                  <div>
                    <Button variant="contained" color="secondary" onClick={(id)=>props.deleteTheory(item._id)}>
                      Xóa 1.{index + 1}.
                    </Button>
                  </div>
                  <div className={classes.coverSubTitle} >
                    <DivAction size={20} marginBottom={3} margin={3} changeText={updateTitle}>1.{index + 1}. {item.title}</DivAction>
                  </div>
                  <div>
                    {
                      _.map(item.image, (image, ind)=>{
                        return(
                          <ImageEditor image={image} key={ind} saveImage={updateImage}
                          deleteImage={deleteImage}/>
                          
                        )
                      })
                    }
                    {
                      <ImageUpload saveImage={saveImage}/>
                    }
                  </div>
                  
                  <div>
                    {
                      item.content.length === 0
                      ?
                      <ListDivAction size={20} marginBottom={2} margin={2} changeText={EditContent} 
                        addParagraph={()=>props.AddParagraph('Content', index)}
                        content={['................']}  />
                      :
                      <ListDivAction size={20} marginBottom={2} margin={2} changeText={EditContent}
                      addParagraph={()=>props.AddParagraph('Content', index)}
                      content={item.content}/>
                    }
                    
                  </div>
                </div>
              )
            })
          }
          <div>
            <button className="btn btn-primary" onClick={AddTheory}><Icon className="fa fa-plus"></Icon></button>
          </div>
        </div>
    </div>
  );
}