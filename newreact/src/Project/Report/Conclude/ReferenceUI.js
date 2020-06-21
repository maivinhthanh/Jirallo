import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

export default function ReferenceUI(props) {
  const classes = useStyles();

  return (
    <div className="Cover">
      <div className={classes.A4} >
          <div className={classes.coverTitle}>
            TÀI LIỆU THAM KHẢO
          </div>  
          
          {
            props.info.references.length === 0
            ?
            <DivAction size={20} marginBottom={2} margin={2} changeText={props.EditReferences} 
              addParagraph={props.AddParagraph}
              content={['................']}  />
            :
            <DivAction size={20} marginBottom={2} margin={2} changeText={props.EditReferences}
             addParagraph={props.AddParagraph}
             content={props.info.references}/>
          }          
        </div>
    </div>
  );
}