import React, {useRef} from 'react';
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

export default function DescriptionUI(props) {
  const classes = useStyles();
  
  return (
    <div className="Cover">
      <div className={classes.A4} >
          <div className={classes.coverTitle}>
            CHƯƠNG 4: THIẾT KẾ WEBSITE
          </div>  
          <div className={classes.coverSubTitle} >
            4.1. ĐẶC TẢ WEBSITE
          </div>
          <div className={classes.coverContent}>
          {
            props.info.descriptionWebsite.length === 0
            ?
            <ListDivAction size={20} marginBottom={2} margin={2} changeText={props.EditDescript} 
              addParagraph={()=>props.AddParagraph()}
              content={['................']}  />
            :
            <ListDivAction size={20} marginBottom={2} margin={2} changeText={props.EditDescript}
             addParagraph={()=>props.AddParagraph()}
             content={props.info.descriptionWebsite}/>
          }
          
        </div>
        </div>
    </div>
  );
}