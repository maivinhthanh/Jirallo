import React, {useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash'
import ListDivAction from '../../../Components/ListInputEdit/DivActionUI'
import DivAction from '../../../Components/InputEdit/DivActionUI'
import ImageUpload from '../../../Components/ImageEditor/ImageUpload'
import ImageEditor from '../../../Components/ImageEditor/ImageEditor'
import { Icon } from '@material-ui/core';
import './usecase.css'

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
  const saveImage = (image, name)=>{
    const iddiagram = props.info.usecase.descript[indexChange]._id
    props.saveImage(image, name, iddiagram)
  }
  const updateImage = (image, name, idimage)=>{
    const iddiagram = props.info.usecase.descript[indexChange]._id
    props.updateImage(image, name, iddiagram, idimage)
  }
  const deleteImage = (idimage) =>{
    const iddiagram = props.info.usecase.descript[indexChange]._id
    props.deleteImage(iddiagram, idimage)
  }
  
  const updateTitle = (name) =>{
    const iduscase = props.info.usecase.descript[indexChange]._id
    const nameslice = name.slice(6, name.length)
    props.updateTitle(nameslice, iduscase)
  }
  return (
    <div className="Cover">
      <div className={classes.A4} >
          <div className={classes.coverSubTitle} >
            2.2. CHI TIẾT USECASE
          </div>
          {
            _.map(props.info.usecase.descript, (item, index)=>{
              return(
                <div onMouseEnter={()=>IndexChangeAction(index)}>
                  <div className={classes.coverSubTitle} >
                    <DivAction size={20} marginBottom={3} margin={3} changeText={updateTitle} >2.2.{index + 1}. {item.title}</DivAction>
                  </div>
                  <table className="table-usecase table table-hover">
                    <tr>
                      <td width="30%">UsecaseID</td>
                      <td>fsdfas{item.key}</td>
                    </tr>
                    <tr>
                      <td>Tên usecase</td>
                      <td>{item.name}</td>
                    </tr>
                    <tr>
                      <td>Tóm tắt mô tả</td>
                      <td>{item.briefdescript}</td>
                    </tr>
                    <tr>
                      <td>Tác nhân</td>
                      <td>{item.actor}</td>
                    </tr>
                    <tr>
                      <td>Tiền điều kiện</td>
                      <td>{item.precondition}</td>
                    </tr>
                    <tr>
                      <td>Hậu điều kiện</td>
                      <td>{item.postcondition}</td>
                    </tr>
                    <tr>
                      <td colSpan="2">Luồng</td>
                    </tr>
                  </table>
                </div>
              )
            })
          }
          
          <div>
            <button className="btn btn-primary" onClick={props.AddUsecase}><Icon className="fa fa-plus"></Icon></button>
          </div>
      </div>
    </div>
  );
}