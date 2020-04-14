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

export default function IntroduceUI(props) {
  const classes = useStyles();

  return (
    <div className="Cover">
      <div className={classes.A4} >
          <div className={classes.coverTitle}>
            GIỚI THIỆU ĐỀ TÀI
          </div>  
          <div className={classes.coverSubTitle} ref={props.urgencyRef}>
            1. TÍNH CẤP THIẾT CỦA ĐỀ TÀI
          </div>
          <div className={classes.coverContent}>
          {
            _.map(props.info.introduce.urgency, (item, index)=>{
              return(
                <div key={index}>{item}</div>
              )
            })
          }
          
          </div> 
          <div className={classes.coverSubTitle} ref={props.targetRef}>
            2. MỤC TIÊU CỦA ĐỀ TÀI
          </div>
          <div className={classes.coverContent}>
          {
            _.map(props.info.introduce.target, (item, index)=>{
              return(
                <div key={index}>{item}</div>
              )
            })
          }
          
          </div> 
          <div className={classes.coverSubTitle} ref={props.structureRef}>
            3. KẾT CẤU CỦA ĐỀ TÀI
          </div>
          <div className={classes.coverContent}>
          {
            _.map(props.info.introduce.structure, (item, index)=>{
              return(
                <div key={index}>{item}</div>
              )
            })
          }
          </div> 
        </div>
    </div>
  );
}