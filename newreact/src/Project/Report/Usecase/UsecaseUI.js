import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash'
import ListDivAction from '../../../Components/ListInputEdit/DivActionUI'
import DivAction from '../../../Components/InputEdit/DivActionUI'
import ImageUpload from '../../../Components/ImageEditor/ImageUpload'
import ImageEditor from '../../../Components/ImageEditor/ImageEditor'
import { Icon, Button } from '@material-ui/core';
import './usecase.css'

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

export default function UsecaseUI(props) {
  const classes = useStyles();

  const [indexChange, setIndexChange] = React.useState(null);

  const IndexChangeAction = (index) =>{
    setIndexChange(index)
  }
  const saveImage = (image, name)=>{
    const idusecase = props.info.usecase.descript[indexChange]._id
    props.saveImage(image, name, idusecase)
  }
  const updateImage = (image, name, idimage)=>{
    const idusecase = props.info.usecase.descript[indexChange]._id
    props.updateImage(image, name, idusecase, idimage)
  }
  const deleteImage = (idimage) =>{
    const idusecase = props.info.usecase.descript[indexChange]._id
    props.deleteImage(idusecase, idimage)
  }
  
  const updateTitle = (name) =>{
    const idusecase = props.info.usecase.descript[indexChange]._id
    const nameslice = name.slice(6, name.length)
    props.updateTitle(nameslice, idusecase)
  }
  const EditBrief = (data, paragraph)=>{
    props.EditBrief(data, paragraph, indexChange)
  }
  const updateUsecase = (text, name ) =>{
    props.updateUsecase(name, text, indexChange)
  }
  const addFlow = ()=>{
    props.addFlow(indexChange)
  }
  const addException = ()=>{
    props.addException(indexChange)
  }
  const updateFlowUser = (text, indexFlow) =>{
    props.updateFlowUser(text, indexChange, indexFlow)
  }
  const updateExceptionDescript = (text, indexException) =>{
    props.updateExceptionDescript(text, indexChange, indexException)
  }
  const EditSystem = (data, paragraph, indexFlow) =>{
    props.EditSystem(data, paragraph, indexChange, indexFlow)
  }
  const EditException = (data, paragraph, indexException) =>{
    props.EditException(data, paragraph, indexChange, indexException)
  }
  return (
    <div className="Cover">
      <div className={classes.A4} >
          <div className={classes.coverSubTitle} >
            3.2. CHI TIẾT USECASE
          </div>
          {
            _.map(props.info.usecase.descript, (item, index)=>{
              return(
                <div onMouseEnter={()=>IndexChangeAction(index)} key={index}>
                  <Button variant="contained" color="secondary" onClick={(id)=>props.deleteUsecase(item._id)}>
                    Xóa 3.2.{index + 1}.
                  </Button>
                  <div className={classes.coverSubTitle} >
                    <DivAction size={20} marginBottom={3} margin={3} changeText={updateTitle} >3.2.{index + 1}. {item.title}</DivAction>
                  </div>
                  <table className="table-usecase table table-hover">
                    <tr>
                      <td width="30%">UsecaseID</td>
                      <td><DivAction size={18} marginBottom={3} margin={3} changeText={(text,name)=>updateUsecase(text, 'key')} >{item.key}</DivAction></td>
                    </tr>
                    <tr>
                      <td>Tên usecase</td>
                      <td><DivAction size={18} marginBottom={3} margin={3} changeText={(text, name)=>updateUsecase(text, 'name')} >{item.name}</DivAction></td>
                    </tr>
                    <tr>
                      <td>Tóm tắt mô tả</td>
                      <td>
                        {
                          item.briefdescript.length === 0
                          ?
                          <ListDivAction size={18} marginBottom={2} margin={2} changeText={EditBrief}  
                            addParagraph={()=>props.addParagraph('Brief', index)}
                            content={['................']}  />
                          :
                          <ListDivAction size={18} marginBottom={2} margin={2} changeText={EditBrief}
                            addParagraph={()=>props.addParagraph('Brief', index)}
                            content={item.briefdescript}/>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Tác nhân</td>
                      <td><DivAction size={18} marginBottom={3} margin={3} changeText={(text, name)=>updateUsecase(text, 'actor')} >{item.actor}</DivAction></td>
                    </tr>
                    <tr>
                      <td>Tiền điều kiện</td>
                      <td><DivAction size={18} marginBottom={3} margin={3} changeText={(text, name)=>updateUsecase(text, 'precondition')} >{item.precondition}</DivAction></td>
                    </tr>
                    <tr>
                      <td>Hậu điều kiện</td>
                      <td><DivAction size={18} marginBottom={3} margin={3} changeText={(text, name)=>updateUsecase(text, 'postcondition')} >{item.postcondition}</DivAction></td>
                    </tr>
                    <tr>
                      <td colSpan="2">Luồng</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <table className="table-usecase table table-hover">
                          <tr>
                            <th width="50%">Người dùng</th>
                            <th>Hệ thống</th>
                            <th width="5%"></th>
                          </tr>
                          {
                            _.map(item.basicflows, (flow, indexFlow)=>{
                              return (
                                <tr key={indexFlow}>
                                  <td>
                                    <DivAction size={18} marginBottom={3} margin={3} 
                                      changeText={(text, index)=>updateFlowUser(text, indexFlow)} >
                                      {flow.user}
                                    </DivAction>
                                  </td>
                                  <td>
                                    {
                                      flow.system.length === 0
                                      ?
                                      <ListDivAction size={20} marginBottom={2} margin={2} 
                                        changeText={(text, paragraph, index)=>EditSystem(text, paragraph, indexFlow)}  
                                        addParagraph={()=>props.AddParagraphSystem(index, indexFlow)}
                                        content={['................']}  />
                                      :
                                      <ListDivAction size={20} marginBottom={2} margin={2} 
                                        changeText={(text, paragraph, index)=>EditSystem(text, paragraph, indexFlow)}
                                        addParagraph={()=>props.AddParagraphSystem(index, indexFlow)}
                                        content={flow.system}/>
                                    }
                                  </td>
                                  <td>
                                    <Button variant="contained" color="secondary" onClick={(id, idflow)=>props.deleteFlow(item._id, flow._id)}>
                                      <Icon className="fa fa-times"></Icon>
                                    </Button>
                                  </td>
                                </tr>
                              )
                            })
                          }
                          <tr>
                            <td>
                              <Button variant="contained" color="primary" onClick={addFlow}>
                                Thêm luồng
                              </Button>
                            </td>
                            <td></td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">Điều kiện ngoại lệ</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <table className="table-usecase table table-hover">
                          <tr>
                            <th width="50%">Mô tả</th>
                            <th>Hệ thống</th>
                            <th width="5%"></th>
                          </tr>
                          {
                            _.map(item.exception, (exception, indexException)=>{
                              return (
                                <tr key={indexException}>
                                  <td>
                                    <DivAction size={18} marginBottom={3} margin={3} 
                                      changeText={(text, index)=>updateExceptionDescript(text, indexException)} >
                                      {exception.description}
                                    </DivAction>
                                  </td>
                                  <td>
                                    {
                                      exception.system.length === 0
                                      ?
                                      <ListDivAction size={20} marginBottom={2} margin={2} 
                                        changeText={(text, paragraph, index)=>EditException(text, paragraph, indexException)}  
                                        addParagraph={()=>props.AddParagraphException(index, indexException)}
                                        content={['................']}  />
                                      :
                                      <ListDivAction size={20} marginBottom={2} margin={2} 
                                        changeText={(text, paragraph, index)=>EditException(text, paragraph, indexException)}
                                        addParagraph={()=>props.AddParagraphException(index, indexException)}
                                        content={exception.system}/>
                                    }
                                  </td>
                                  <td>
                                    <Button variant="contained" color="secondary" onClick={(id, idexception)=>props.deleteException(item._id, exception._id)}>
                                      <Icon className="fa fa-times"></Icon>
                                    </Button>
                                  </td>
                                </tr>
                              )
                            })
                          }
                          <tr>
                            <td>
                              <Button variant="contained" color="primary" onClick={addException}>
                                Thêm ngoại lệ
                              </Button>
                            </td>
                            <td></td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
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
            <button className="btn btn-primary" onClick={props.AddUsecase}><Icon className="fa fa-plus"></Icon></button>
          </div>
      </div>
    </div>
  );
}