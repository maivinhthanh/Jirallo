import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash'
import ListDivAction from '../../../Components/ListInputEdit/DivActionUI'

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
            CHƯƠNG 4: CÀI ĐẶT VÀ KIỂM THỬ
          </div>  
          <div className={classes.coverSubTitle} >
            4.1. CÀI ĐẶT
          </div>
          <div className={classes.coverSubTitle} >
            4.1.1. Ngôn ngữ cài đặt
          </div>
          {
            props.info.setting.language.length === 0
            ?
            <ListDivAction size={20} marginBottom={2} margin={2} changeText={props.EditLanguage} 
              addParagraph={()=>props.AddParagraph("language")}
              content={['................']}  />
            :
            <ListDivAction size={20} marginBottom={2} margin={2} changeText={props.EditLanguage}
             addParagraph={()=>props.AddParagraph("language")}
             content={props.info.setting.language}/>
          }
          <div className={classes.coverSubTitle} >
            4.1.2. Công nghệ sử dụng
          </div>  
          {
            props.info.setting.technology.length === 0
            ?
            <ListDivAction size={20} marginBottom={2} margin={2} changeText={props.EditTechnology} 
              addParagraph={()=>props.AddParagraph('technology')}
              content={['................']}  />
            :
            <ListDivAction size={20} marginBottom={2} margin={2} changeText={props.EditTechnology}
             addParagraph={()=>props.AddParagraph('technology')}
             content={props.info.setting.technology}/>
          } 
          <div className={classes.coverSubTitle} >
          4.1.3. Cấu trúc
        </div>  
        {
            props.info.setting.structure.length === 0
            ?
            <ListDivAction size={20} marginBottom={2} margin={2} changeText={props.EditStructure} 
              addParagraph={()=>props.AddParagraph('structure')}
              content={['................']}  />
            :
            <ListDivAction size={20} marginBottom={2} margin={2} changeText={props.EditStructure}
             addParagraph={()=>props.AddParagraph('structure')}
             content={props.info.setting.structure}/>
          } 
        </div>
        
    </div>
  );
}