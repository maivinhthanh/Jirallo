import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash'
import DivAction from '../../../Components/InputEdit/DivActionUI'

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
                    <DivAction size={25} marginBottom={3} margin={3} >{item.name}</DivAction>
                  </div>
                  <div className="col-6 text-left">
                    <DivAction size={25} marginBottom={3} margin={3} >{item.code}</DivAction>
                  </div>
                </div>
              )
            })
          }

          
          <div className={classes.coverSubTitle}>
            Đề tài
          </div>
          <div className={classes.coverName}>
            <DivAction size={30} marginBottom={3} margin={3} changeText={props.EditName} >{props.info.name}</DivAction>
          </div>
          <div className={classes.coverTitle}>
            TIỂU LUẬN CHUYÊN NGÀNH CÔNG NGHỆ PHẦN MỀM
          </div>
          <div className={classes.coverTitle}>
            GIÁO VIÊN HƯỚNG DẪN:
          </div>
          <div className={classes.coverTitle}>
            <DivAction size={25} marginBottom={3} margin={3} changeText={props.EditTeacher}  >{props.info.teacher}</DivAction>
          </div>
          <div className={classes.coverFooter}>
            KHÓA <DivAction size={25} marginBottom={3} margin={3} changeText={props.EditYear}  >{props.info.year}</DivAction>
          </div>
        </div>
      </div>
    </div>
  );
}