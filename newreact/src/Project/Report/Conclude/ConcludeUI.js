import React, {useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash'
import DivAction from '../../../Components/ListInputEdit/DivActionUI'

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
            props.info.conclude.result.length === 0
            ?
            <DivAction size={20} marginBottom={2} margin={2} changeText={props.EditResult} 
              addParagraph={()=>props.AddParagraph('Result')}
              content={['................']}  />
            :
            <DivAction size={20} marginBottom={2} margin={2} changeText={props.EditResult}
             addParagraph={()=>props.AddParagraph('Result')}
             content={props.info.conclude.result}/>
          }
          
          </div> 
          <div className={classes.coverSubTitle} ref={props.advantagesRef}>
            2. Ưu điểm:
          </div>
          <div className={classes.coverContent}>
          {
            props.info.conclude.advantages.length === 0
            ?
            <DivAction size={20} marginBottom={2} margin={2} changeText={props.EditAdvantages} 
              addParagraph={()=>props.AddParagraph('Advantages')}
              content={['................']}  />
            :
            <DivAction size={20} marginBottom={2} margin={2} changeText={props.EditAdvantages} 
              addParagraph={()=>props.AddParagraph('Advantages')}
              content={props.info.conclude.advantages} />
          }
          
          </div> 
          <div className={classes.coverSubTitle} ref={props.defectRef}>
            3. Hạn chế:
          </div>
          <div className={classes.coverContent}>
          {
            props.info.conclude.defect.length === 0
            ?
            <DivAction size={20} marginBottom={2} margin={2} changeText={props.EditDefect}
              addParagraph={()=>props.AddParagraph('Defect')}
              content={['................']}  />
            :
            <DivAction size={20} marginBottom={2} margin={2} changeText={props.EditDefect}
              addParagraph={()=>props.AddParagraph('Defect')} 
              content={props.info.conclude.defect} />
          }
          
          </div> 
          <div className={classes.coverSubTitle} ref={props.developmentRef}>
            4. Hướng phát triển:
          </div>
          <div className={classes.coverContent}>
          {
            props.info.conclude.development.length === 0
            ?
            <DivAction size={20} marginBottom={2} margin={2} changeText={props.EditDevelopment}
              addParagraph={()=>props.AddParagraph('Development')}
              content={['................']}  />
            :
            <DivAction size={20} marginBottom={2} margin={2} changeText={props.EditDevelopment}
              addParagraph={()=>props.AddParagraph('Development')} 
              content={props.info.conclude.development} />
          }
          
          </div> 
        </div>
    </div>
  );
}