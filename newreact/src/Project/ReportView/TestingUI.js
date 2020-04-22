import React from 'react';
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

export default function TestingUI(props) {
  const classes = useStyles();

  return (
    <div className="Cover">
        <div className={classes.A4} >  
            <div className={classes.coverSubTitle} >
                5.2. KIỂM THỬ
            </div>
            {
                _.map(props.info.testing, (item, index)=>{
                    return(
                        <div key={index}>
                            <div className={classes.coverSubTitle} >
                                <div>5.2.{index + 1}. {item.title}</div>
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
                                                    <div>{test.name}</div>
                                                </td>
                                                <td>
                                                    <div>{test.description}</div>
                                                </td>
                                                <td>
                                                    <div>{test.expect}</div>
                                                </td>
                                                <td>
                                                    <div>{test.result}</div>
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
    </div>
  );
}