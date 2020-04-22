import React, {useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash'

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
  const arrLength = props.info.usecase.descript.length;
  const elRefs = React.useRef([]);

  if (elRefs.current.length !== arrLength) {
    // add or remove refs
    elRefs.current = Array(arrLength).fill().map((_, i) => elRefs.current[i] || React.createRef());
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
                <div key={index}>
                  <div className={classes.coverSubTitle} >
                    <div>3.2.{index + 1}. {item.title}</div>
                  </div>
                  <table className="table-usecase table table-hover">
                    <tr>
                      <td width="30%">UsecaseID</td>
                      <td><div>{item.key}</div></td>
                    </tr>
                    <tr>
                      <td>Tên usecase</td>
                      <td><div>{item.name}</div></td>
                    </tr>
                    <tr>
                      <td>Tóm tắt mô tả</td>
                      <td>
                        {
                        _.map(item.briefdescript, (text, ind)=>{
                            return(
                              <div key={ind}>{text}</div>
                            )
                          })
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Tác nhân</td>
                      <td><div>{item.actor}</div></td>
                    </tr>
                    <tr>
                      <td>Tiền điều kiện</td>
                      <td><div>{item.precondition}</div></td>
                    </tr>
                    <tr>
                      <td>Hậu điều kiện</td>
                      <td><div>{item.postcondition}</div></td>
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
                          </tr>
                          {
                            _.map(item.basicflows, (flow, indexFlow)=>{
                              return (
                                <tr key={indexFlow}>
                                  <td>
                                    <div>
                                      {flow.user}
                                    </div>
                                  </td>
                                  <td>
                                    {
                                      _.map(flow.system, (text, ind)=>{
                                        return(
                                          <div key={ind}>{text}</div>
                                        )
                                      })
                                    }
                                  </td>
                                </tr>
                              )
                            })
                          }
                         
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
                          </tr>
                          
                          {
                            _.map(item.exception, (exception, indexException)=>{
                              return (
                                <tr key={indexException}>
                                  <td>
                                    <div>{exception.description}</div>
                                  </td>
                                  <td>
                                    {
                                      _.map(exception.system, (text, ind)=>{
                                        return(
                                          <div key={ind}>{text}</div>
                                        )
                                      })
                                    }
                                    
                                  </td>
                                </tr>
                              )
                            })
                          }
                          
                        </table>
                      </td>
                    </tr>
                  </table>
                  {
                      _.map(item.image, (image, ind)=>{
                        return(
                          <div key={ind}>
                            <img src={`http://localhost:8088/${image.address}`} width="500" height="350"/>
                            <p>{image.name}</p>
                          </div>
                        )
                      })
                    }
                    
                </div>
              )
            })
          }
      </div>
    </div>
  );
}