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
  const [image, setImage] = React.useState([]);

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
  const AddDiagram = ()=>{
    props.AddDiagram()
  }
  console.log(props.info.usecase)
  return (
    <div className="Cover">
      <div className={classes.A4} >
          <div className={classes.coverTitle}>
            CHƯƠNG 2: MÔ HÌNH HÓA YÊU CẦU
          </div>  
          <div className={classes.coverSubTitle} >
            2.1. Lượt đồ diagram
          </div>
          
          {
              _.map(props.info.usecase.diagram, (item, index)=>{
                return (
                  <div>
                    <div className={classes.coverSubTitle} >
                      <DivAction size={20} marginBottom={3} margin={3} >2.1.{index + 1} {item.title}</DivAction>
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