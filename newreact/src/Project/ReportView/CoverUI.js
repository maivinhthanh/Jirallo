import React from 'react';
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
  cover:{
    alignContent: 'center'
  },
  coverTitle:{
    fontSize: 20,
    margin: 15,
    fontWeight: 'bold'
  },
  coverName: {
    fontSize: 35,
    margin: 20,
    fontWeight: 'bold'
  },
  coverFooter:{
    fontSize: 20,
    marginTop: 300,
    fontWeight: 'bold'
  },
  coverSubTitle:{
    fontSize: 18,
    marginBottom: 20,
    float: 'left',
    fontWeight: 'bold'
  },
  coverStudent: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: 'bold'
  }
});

export default function ControlledTreeView(props) {
  const classes = useStyles();
  return (
    <div className="Cover">
      <div className={classes.A4} >
        <div className={classes.coverBorder}>
          <div className={classes.coverTitle}>
            TRƯỜNG ĐẠI HỌC SƯ PHẠM KỸ THUẬT TP. HCM
          </div>  
          <div className={classes.coverTitle}>
            KHOA CÔNG NGHỆ THÔNG TIN
          </div>   
          <div className={classes.coverTitle}>
            BỘ MÔN CÔNG NGHỆ PHẦN MỀM
          </div>   
          <div className="cover-image">
            <img src="images/logo-spkt.jpg" alt="logo-spkt" />
          </div>
          
          {
            _.map(props.info.author, (item, index)=>{
              return (
                <div className="row">
                  <div className="col-6 text-right">
                    <div>{item.name}</div>
                  </div>
                  <div className="col-6 text-left">
                    <div>{item.code}</div>
                  </div>
                </div>
              )
            })
          }

          
          <div className={classes.coverSubTitle}>
            Đề tài
          </div>
          <div className={classes.coverName}>
            <div>{props.info.name}</div>
          </div>
          <div className={classes.coverTitle}>
            TIỂU LUẬN CHUYÊN NGÀNH CÔNG NGHỆ PHẦN MỀM
          </div>
          <div className={classes.coverTitle}>
            GIÁO VIÊN HƯỚNG DẪN:
          </div>
          <div className={classes.coverTitle}>
          <div>{props.info.teacher}</div>
          </div>
          <div className={classes.coverFooter}>
            KHÓA <div>{props.info.year}</div>
          </div>
        </div>
      </div>
    </div>
  );
}