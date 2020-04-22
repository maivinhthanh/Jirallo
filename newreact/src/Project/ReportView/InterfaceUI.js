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

export default function InterfaceUI(props) {
  const classes = useStyles();

  return (
    <div className="Cover">
      <div className={classes.A4} >
          <div className={classes.coverSubTitle} >
            4.3. THIẾT KẾ GIAO DIỆN
          </div>
          {
            _.map(props.info.ui, (group, indexGroup)=>{
              return(
                <div key={indexGroup}>
                  <div className={classes.coverSubTitle} >
                    <div>4.3.{indexGroup + 1}. {group.group}</div>
                  </div>
                  {
                    _.map(group.content, (ui, indexUI)=>{
                      return (
                        <div key={indexUI}>
                          
                          <div className={classes.coverSubTitle} >
                            <div>4.3.{indexGroup + 1}.{indexUI + 1}. {ui.title}</div>
                          </div>
                          {
                            _.map(ui.image, (image, ind)=>{
                              return(
                                <div key={ind}>
                                  <img src={`http://localhost:8088/${image.address}`} width="500" height="350"/>
                                  <p>{image.name}</p>
                                </div>
                                
                              )
                            })
                          }
                          <div>Mô tả:{ui.descript}</div>
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
                                          <div>{obj.type}</div>
                                        </td>
                                        <td>
                                          <div>{obj.descript}</div>
                                        </td>
                                      </tr>
                                    )
                                  })
                                }
                                
                              </table>
                              
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