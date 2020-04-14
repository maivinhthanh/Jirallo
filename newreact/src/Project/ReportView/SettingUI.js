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

export default function SettingUI(props) {
  const classes = useStyles();
  return (
    <div className="Cover">
      <div className={classes.A4} > 
      <div className={classes.coverTitle}>
            CHƯƠNG 5: CÀI ĐẶT VÀ KIỂM THỬ
          </div>  
          <div className={classes.coverSubTitle} >
            5.1. CÀI ĐẶT
          </div>
          <div className={classes.coverSubTitle} >
            5.1.1. Ngôn ngữ cài đặt
          </div>
          {
            _.map(props.info.setting.language, (item, index)=>{
              return(
                <div key={index}>{item}</div>
              )
            })
          }
          
          <div className={classes.coverSubTitle} >
            5.1.2. Công nghệ sử dụng
          </div> 
          {
            _.map(props.info.setting.technology, (item, index)=>{
              return(
                <div key={index}>{item}</div>
              )
            })
          }
          <div className={classes.coverSubTitle} >
            5.1.3. Cấu trúc
          </div> 
          {
            _.map(props.info.setting.structure, (item, index)=>{
              return(
                <div key={index}>{item}</div>
              )
            })
          } 
        
        </div>
        
    </div>
  );
}