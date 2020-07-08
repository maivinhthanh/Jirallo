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

export default function SurveyUI(props) {
  const classes = useStyles();

  return (
    <div className="Cover">
      <div className={classes.A4} >
          <div className={classes.coverTitle}>
            CHƯƠNG 2: KHẢO SÁT HIỆN TRẠNG
          </div>  
          <div className={classes.coverSubTitle} >
            2.1. KHẢO SÁT MỘT SỐ TRANG WEB
          </div>
          {
            _.map(props.info.survey, (item, index)=>{
              return (
                <div key={index}>
                  <div className={classes.coverSubTitle} >
                    <div>2.1.{index + 1}. {item.name}</div>
                  </div>
                  <div>
                    <p>Một số hình ảnh</p>
                    {
                      _.map(item.image, (image, ind)=>{
                        return(
                          <div key={ind}>
                            <img alt="anh" src={`http://localhost:8088/${image.address}`} width="500" height="350"/>
                            <p>{image.name}</p>
                          </div>
                        )
                      })
                    }
                  </div>
                  <div>
                    <p>Ưu điểm</p>
                    {
                      _.map(item.advantages, (text, ind)=>{
                        return(
                          <div key={ind}>{text}</div>
                        )
                      })
                    }
                    
                  </div>
                  <div>
                    <p>Nhược điểm</p>
                    {
                      _.map(item.defect, (text, ind)=>{
                        return(
                          <div key={ind}>{text}</div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
    </div>
  );
}