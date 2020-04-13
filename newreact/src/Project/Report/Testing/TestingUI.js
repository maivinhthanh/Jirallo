import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash'
import DivAction from '../../../Components/InputEdit/DivActionUI'
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

export default function TestingUI(props) {
  const classes = useStyles();
  const [indexChange, setIndexChange] = React.useState(null);

  const IndexChangeAction = (index) =>{
    setIndexChange(index)
  }

  const updateTitle = (text) =>{
    const nameslice = text.slice(6, text.length)
    props.updateTitle(nameslice, indexChange)
  }
  const updateObject = (text, name, index) =>{
    props.updateObject(text, name, indexChange, index)

  }
  const addTesting = () =>{
    props.addTesting(indexChange)
  }
  return (
    <div className="Cover">
        <div className={classes.A4} >  
            <div className={classes.coverSubTitle} >
                4.2. KIỂM THỬ
            </div>
            {
                _.map(props.info.testing, (item, index)=>{
                    return(
                        <div onMouseEnter={()=>IndexChangeAction(index)} key={index}>
                            <div className={classes.coverSubTitle} >
                                <DivAction size={20} marginBottom={3} margin={3} changeText={updateTitle}>4.2.{index + 1}. {item.title}</DivAction>
                            </div>
                            <table className="table-usecase table table-hover">
                                <tr>
                                    <th width="5%">STT</th>
                                    <th width="10%">Tên kiểm thử</th>
                                    <th>Mô tả</th>
                                    <th>Kết quả mong muốn</th>
                                    <th width="10%">Kết quả thực tế</th>
                                </tr>
                                {
                                    _.map(item.content, (test, indexObj)=>{
                                        return(
                                            <tr>
                                                <td>{indexObj + 1}</td>
                                                <td>
                                                    <DivAction size={20} marginBottom={3} margin={3} 
                                                        changeText={(text, name, index)=>updateObject(text,'name', indexObj)} >
                                                            {test.name}
                                                    </DivAction>
                                                </td>
                                                <td>
                                                    <DivAction size={20} marginBottom={3} margin={3} 
                                                        changeText={(text, name, index)=>updateObject(text,'description', indexObj)} >
                                                            {test.description}
                                                    </DivAction>
                                                </td>
                                                <td>
                                                    <DivAction size={20} marginBottom={3} margin={3} 
                                                        changeText={(text, name, index)=>updateObject(text,'expect', indexObj)} >
                                                            {test.expect}
                                                    </DivAction>
                                                </td>
                                                <td>
                                                    <DivAction size={20} marginBottom={3} margin={3} 
                                                        changeText={(text, name, index)=>updateObject(text,'result', indexObj)} >
                                                            {test.result}
                                                    </DivAction>
                                                </td>
                                                
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td colSpan="5">
                                        <Button variant="contained" color="primary" onClick={addTesting}>
                                            Thêm kiểm thử
                                        </Button>
                                    </td>
                                </tr>
                            </table>
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