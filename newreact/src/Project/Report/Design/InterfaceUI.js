import React, {useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash'
import DivAction from '../../../Components/InputEdit/DivActionUI'
import ImageUpload from '../../../Components/ImageEditor/ImageUpload'
import ImageEditor from '../../../Components/ImageEditor/ImageEditor'
import { Icon, Button } from '@material-ui/core';
// import './usecase.css'

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

export default function InterfaceUI(props) {
  const classes = useStyles();

  const [indexChangeGroup, setIndexChangeGroup] = React.useState(null);

  const IndexChangeGroupAction = (indexGroup) =>{
    setIndexChangeGroup(indexGroup)
  }
  const [indexChangeUI, setIndexChangeUI] = React.useState(null);

  const IndexChangeUIAction = (indexUI) =>{
    setIndexChangeUI(indexUI)
  }
  
  const updateContent = (text) =>{
    const idgroup = props.info.ui[indexChangeGroup]._id
    const idui = props.info.ui[indexChangeGroup].content[indexChangeUI]._id
    const title = props.info.ui[indexChangeGroup].content[indexChangeUI].title
    const nameslice = text.slice(6, text.length)
    props.updateContent(title, nameslice, idgroup, idui)
  }
  const addObject = ()=>{
    props.addObject(indexChangeGroup, indexChangeUI)
  }
  const updateObject = (text, name, indexObj) =>{
    props.updateObject(text, name, indexChangeGroup, indexChangeUI, indexObj)
  }
  const updateNameGroup = (name) =>{
    const idgroup = props.info.ui[indexChangeGroup]._id
    const nameslice = name.slice(6, name.length)
    props.updateNameGroup(nameslice, idgroup)
  } 
  const updateTitle = (name) =>{
    const idgroup = props.info.ui[indexChangeGroup]._id
    const idui = props.info.ui[indexChangeGroup].content[indexChangeUI]._id
    const nameslice = name.slice(8, name.length)
    const descript = props.info.ui[indexChangeGroup].content[indexChangeUI].descript
    props.updateTitle(nameslice, descript, idgroup, idui)
  }
  const saveImage = (image, name)=>{
    const idgroup = props.info.ui[indexChangeGroup]._id
    const idui = props.info.ui[indexChangeGroup].content[indexChangeUI]._id
    props.saveImage(image, name, idgroup, idui)
  }
  const updateImage = (image, name, idimage)=>{
    const idgroup = props.info.ui[indexChangeGroup]._id
    const idui = props.info.ui[indexChangeGroup].content[indexChangeUI]._id
    props.updateImage(image, name, idgroup, idui, idimage)
  }
  const deleteImage = (idimage) =>{
    const idgroup = props.info.ui[indexChangeGroup]._id
    const idui = props.info.ui[indexChangeGroup].content[indexChangeUI]._id
    props.deleteImage(idgroup, idui, idimage)
  }
  const addUI = () =>{
    const idgroup = props.info.ui[indexChangeGroup]._id
    props.addUI(idgroup)
  }
  return (
    <div className="Cover">
      <div className={classes.A4} >
          <div className={classes.coverSubTitle} >
            4.3. THIẾT KẾ GIAO DIỆN
          </div>
          {
            _.map(props.info.ui, (group, indexGroup)=>{
              return(
                <div onMouseEnter={()=>IndexChangeGroupAction(indexGroup)} key={indexGroup}>
                  <div>
                    <Button variant="contained" color="secondary" onClick={(id)=>props.deleteGroupInterface(group._id)}>
                      Xóa 4.3.{group + 1}.
                    </Button>
                  </div>
                  <div className={classes.coverSubTitle} >
                    <DivAction size={20} marginBottom={3} margin={3} changeText={updateNameGroup} >4.3.{indexGroup + 1}. {group.group}</DivAction>
                  </div>
                  {
                    _.map(group.content, (ui, indexUI)=>{
                      return (
                        <div onMouseEnter={()=>IndexChangeUIAction(indexUI)} key={indexUI}>
                          <Button variant="contained" color="secondary" onClick={(id)=>props.deleteInterface(group._id, ui._id)}>
                            Xóa 4.3.{indexGroup + 1}.{indexUI + 1}.
                          </Button>
                          <div className={classes.coverSubTitle} >
                            <DivAction size={20} marginBottom={3} margin={3} changeText={updateTitle} >4.3.{indexGroup + 1}.{indexUI + 1}. {ui.title}</DivAction>
                          </div>
                          {
                            _.map(ui.image, (image, ind)=>{
                              return(
                                <ImageEditor image={image} key={ind} saveImage={updateImage}
                                  deleteImage={deleteImage}/>
                                
                              )
                            })
                          }
                          {
                            <ImageUpload saveImage={saveImage}/>
                          }
                          <DivAction size={18} marginBottom={3} margin={3} changeText={updateContent} >Mô tả:{ui.descript}</DivAction>
                                  <p>Danh sách đối tượng</p>
                                  <table className="table-usecase table table-hover">
                                    <tr>
                                      <th width="5%">STT</th>
                                      <th width="15%">Loại đối tượng</th>
                                      <th>Mô tả</th>
                                    </tr>
                                    {
                                      _.map(ui.listobject, (obj, indexObj)=>{
                                        return (
                                          <tr key={indexObj}>
                                            <td>{indexObj + 1}</td>
                                            <td>
                                              <DivAction size={18} marginBottom={3} margin={3} 
                                                changeText={(text, name, index)=>updateObject(text, 'type', indexObj)} >
                                                {obj.type}
                                              </DivAction>
                                            </td>
                                            <td>
                                              <DivAction size={18} marginBottom={3} margin={3} 
                                                changeText={(text, name, index)=>updateObject(text,'descript', indexObj)} >
                                                {obj.descript}
                                              </DivAction>
                                            </td>
                                          </tr>
                                        )
                                      })
                                    }
                                    <tr>
                                      <td colSpan="3">
                                        <Button variant="contained" color="primary" onClick={addObject}>
                                          Thêm đối tượng
                                        </Button>
                                      </td>
                                      
                                    </tr>
                                  </table>
                                  
                                </div>
                              )
                            })
                          }
                          
                          <div>
                            <Button variant="contained" color="primary" onClick={addUI}>
                              Thêm giao diện
                            </Button>
                          </div>
                        </div>
                      )
                    })
                  }
          <div>
            <button className="btn btn-primary" onClick={props.AddGroup}><Icon className="fa fa-plus"></Icon></button>
          </div>
      </div>
    </div>
  );
}