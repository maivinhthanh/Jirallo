import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

export default function ControlledTreeView() {
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
          <div className="row">
            <div className="col-6 text-right">
              <h6 className={classes.coverStudent}>MAI VĨNH THÀNH</h6>
            </div>
            <div className="col-6 text-left">
              <h6 className={classes.coverStudent}>16110460</h6>
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-right">
              <h6 className={classes.coverStudent}>HUỲNH THỊ TUYẾT NHI</h6>
            </div>
            <div className="col-6 text-left">
              <h6 className={classes.coverStudent}>16110409</h6>
            </div>
          </div>
          <div className={classes.coverSubTitle}>
            Đề tài
          </div>
          <div className={classes.coverName}>
            XÂY DỰNG ỨNG DỤNG WEB QUẢN LÝ PHẦN MỀM
          </div>
          <div className={classes.coverTitle}>
            TIỂU LUẬN CHUYÊN NGÀNH CÔNG NGHỆ PHẦN MỀM
          </div>
          <div className={classes.coverTitle}>
            GIÁO VIÊN HƯỚNG DẪN:
          </div>
          <div className={classes.coverTitle}>
            ThS. NGUYỄN MINH ĐẠO
          </div>
          <div className={classes.coverFooter}>
            KHÓA 2016 - 2020
          </div>
        </div>
      </div>
    </div>
  );
}