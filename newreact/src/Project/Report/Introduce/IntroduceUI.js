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

export default function ControlledTreeView(props) {
  const classes = useStyles();

  console.log(props.introduceRef)

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
            props.info.introduce.urgency.length === 0
            ?
            <DivAction size={20} marginBottom={2} margin={2} changeText={props.EditUrgency} 
              addParagraph={()=>props.AddParagraph('Urgency')}
              content={['................']}  />
            :
            <DivAction size={20} marginBottom={2} margin={2} changeText={props.EditUrgency}
             addParagraph={()=>props.AddParagraph('Urgency')}
             content={props.info.introduce.urgency}/>
          }
          
          </div> 
          <div className={classes.coverSubTitle} ref={props.targetRef}>
            2. MỤC TIÊU CỦA ĐỀ TÀI
          </div>
          <div className={classes.coverContent}>
          {
            props.info.introduce.target.length === 0
            ?
            <DivAction size={20} marginBottom={2} margin={2} changeText={props.EditTarget} 
              addParagraph={()=>props.AddParagraph('Target')}
              content={['................']}  />
            :
            <DivAction size={20} marginBottom={2} margin={2} changeText={props.EditTarget} 
              addParagraph={()=>props.AddParagraph('Target')}
              content={props.info.introduce.target} />
          }
          
          </div> 
          <div className={classes.coverSubTitle} ref={props.structureRef}>
            3. KẾT CẤU CỦA ĐỀ TÀI
          </div>
          <div className={classes.coverContent}>
          {
            props.info.introduce.structure.length === 0
            ?
            <DivAction size={20} marginBottom={2} margin={2} changeText={props.EditStructure}
              addParagraph={()=>props.AddParagraph('Structure')}
              content={['................']}  />
            :
            <DivAction size={20} marginBottom={2} margin={2} changeText={props.EditStructure}
              addParagraph={()=>props.AddParagraph('Structure')} 
              content={props.info.introduce.structure} />
          }
          
          </div> 
        </div>
    </div>
  );
}