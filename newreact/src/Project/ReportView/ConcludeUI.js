import React, {useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash'

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

export default function ConcludeUI(props) {
  const classes = useStyles();

  return (
    <div className="Cover">
      <div className={classes.A4} >
          <div className={classes.coverTitle}>
            PHẦN KẾT LUẬN
          </div>  
          <div className={classes.coverSubTitle} ref={props.resultRef}>
            1. Kết quả đạt được
          </div>
          <div className={classes.coverContent}>
          {
            _.map(props.info.conclude.result, (text, ind)=>{
              return(
                <div key={ind}>{text}</div>
              )
            })
          }
          
          </div> 
          <div className={classes.coverSubTitle} ref={props.advantagesRef}>
            2. Ưu điểm:
          </div>
          <div className={classes.coverContent}>
          {
            _.map(props.info.conclude.advantages, (text, ind)=>{
              return(
                <div key={ind}>{text}</div>
              )
            })
          }
          </div> 
          <div className={classes.coverSubTitle} ref={props.defectRef}>
            3. Hạn chế:
          </div>
          <div className={classes.coverContent}>
          {
            _.map(props.info.conclude.defect, (text, ind)=>{
              return(
                <div key={ind}>{text}</div>
              )
            })
          }
          </div> 
          <div className={classes.coverSubTitle} ref={props.developmentRef}>
            4. Hướng phát triển:
          </div>
          <div className={classes.coverContent}>
          {
            _.map(props.info.conclude.development, (text, ind)=>{
              return(
                <div key={ind}>{text}</div>
              )
            })
          }
          
          </div> 
        </div>
    </div>
  );
}