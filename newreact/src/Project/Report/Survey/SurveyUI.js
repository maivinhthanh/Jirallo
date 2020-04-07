import React, {useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash'
import ListDivAction from '../../../Components/ListInputEdit/DivActionUI'
import DivAction from '../../../Components/InputEdit/DivActionUI'
import ImageUpload from '../../../Components/ImageEditor/ImageUpload'
import ImageEditor from '../../../Components/ImageEditor/ImageEditor'
import { Icon } from '@material-ui/core';

const useStyles = makeStyles({
  A4: {
    height: 842,
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

export default function ControlledTreeView(props) {
  const classes = useStyles();

  const [indexChange, setIndexChange] = React.useState(null);

  const IndexChangeAction = (index) =>{
    setIndexChange(index)
  }
  const EditAdvantages = (data, paragraph) =>{
    props.EditAdvantages(data, paragraph, indexChange)
  }
  const EditDefect = (data, paragraph) =>{
    props.EditDefect(data, paragraph, indexChange)
  }
  const saveImage = (image, name)=>{
    const idsurvey = props.info.survey[indexChange]._id
    props.saveImage(image, name, idsurvey)
  }
  const updateImage = (image, name, idimage)=>{
    const idsurvey = props.info.survey[indexChange]._id
    props.updateImage(image, name, idsurvey, idimage)
  }
  const deleteImage = (idimage) =>{
    const idsurvey = props.info.survey[indexChange]._id
    props.deleteImage(idsurvey, idimage)
  }
  const AddSurvey = ()=>{
    props.AddSurvey()
  }
  return (
    <div className="Cover">
      <div className={classes.A4} >
          <div className={classes.coverTitle}>
            CHƯƠNG 1: KHẢO SÁT HIỆN TRẠNG
          </div>  
          <div className={classes.coverSubTitle} >
            1.1. KHẢO SÁT MỘT SỐ TRANG WEB
          </div>
          {
            _.map(props.info.survey, (item, index)=>{
              return (
                <div onMouseEnter={()=>IndexChangeAction(index)}>
                  <div className={classes.coverSubTitle} >
                    <DivAction size={20} marginBottom={3} margin={3} >1.1.{index + 1} {item.name}</DivAction>
                  </div>
                  <div>
                    <p>Một số hình ảnh</p>
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
                    <p>Ưu điểm</p>
                    {
                      item.advantages.length === 0
                      ?
                      <ListDivAction size={20} marginBottom={2} margin={2} changeText={EditAdvantages}  
                        addParagraph={()=>props.AddParagraph('Advantages', index)}
                        content={['................']}  />
                      :
                      <ListDivAction size={20} marginBottom={2} margin={2} changeText={EditAdvantages}
                        addParagraph={()=>props.AddParagraph('Advantages', index)}
                        content={item.advantages}/>
                    }
                  </div>
                  <div>
                    <p>Nhược điểm</p>
                    {
                      item.defect.length === 0
                      ?
                      <ListDivAction size={20} marginBottom={2} margin={2} changeText={EditDefect} 
                        addParagraph={()=>props.AddParagraph('Defect', index)}
                        content={['................']}  />
                      :
                      <ListDivAction size={20} marginBottom={2} margin={2} changeText={EditDefect}
                      addParagraph={()=>props.AddParagraph('Defect', index)}
                      content={item.defect}/>
                    }
                    <div>
                      <button className="btn btn-primary" onClick={AddSurvey}><Icon className="fa fa-plus"></Icon></button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
    </div>
  );
}