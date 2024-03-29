import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash'
import DivAction from '../../../Components/InputEdit/DivActionUI'
import ImageUpload from '../../../Components/ImageEditor/ImageUpload'
import ImageEditor from '../../../Components/ImageEditor/ImageEditor'
import { Icon, Button } from '@material-ui/core';

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

export default function DiagramUI(props) {
  const classes = useStyles();

  const [indexChange, setIndexChange] = React.useState(null);

  const IndexChangeAction = (index) =>{
    setIndexChange(index)
  }
  const saveImage = (image, name)=>{
    const iddiagram = props.info.usecase.diagram[indexChange]._id
    props.saveImage(image, name, iddiagram)
  }
  const updateImage = (image, name, idimage)=>{
    const iddiagram = props.info.usecase.diagram[indexChange]._id
    props.updateImage(image, name, iddiagram, idimage)
  }
  const deleteImage = (idimage) =>{
    const iddiagram = props.info.usecase.diagram[indexChange]._id
    props.deleteImage(iddiagram, idimage)
  }
  const AddDiagram = ()=>{
    props.AddDiagram()
  }
  const updateTitle = (name) =>{
    const iddiagram = props.info.usecase.diagram[indexChange]._id
    const nameslice = name.slice(6, name.length)
    props.updateTitle(nameslice, iddiagram)
  }
  return (
    <div className="Cover">
      <div className={classes.A4} >
          <div className={classes.coverTitle}>
            CHƯƠNG 3: MÔ HÌNH HÓA YÊU CẦU
          </div>  
          <div className={classes.coverSubTitle} >
            3.1. LƯỢC ĐỒ DIAGRAM
          </div>
          
          {
              _.map(props.info.usecase.diagram, (item, index)=>{
                return (
                  <div onMouseEnter={()=>IndexChangeAction(index)} key={index}>
                    <div>
                      <Button variant="contained" color="secondary" onClick={(id)=>props.deleteDiagram(item._id)}>
                        Xóa 3.1.{index + 1}.
                      </Button>
                    </div>
                    <div className={classes.coverSubTitle} >
                      <DivAction size={20} marginBottom={3} margin={3} changeText={updateTitle} >3.1.{index + 1}. {item.title}</DivAction>
                    </div>
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
                )
              })
          }
          <div>
            <button className="btn btn-primary" onClick={AddDiagram}><Icon className="fa fa-plus"></Icon></button>
          </div>
        </div>
    </div>
  );
}