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
  cover:{
    alignContent: 'center'
  },
  coverTitle:{
    fontSize: 20,
    margin: 15,
    fontWeight: 'bold'
  },
  coverContent:{
    fontSize: 18,
    
  },
  coverFooter:{
    fontSize: 18,
    fontWeight: 'inherit',
    float: 'right'
  }
});

export default function PrefaceUI(props) {
  const classes = useStyles();
  return (
    <div className="Cover">
      <div className={classes.A4} >
        <div className={classes.coverTitle}>
          LỜI CÁM ƠN
        </div>  
        <div className={classes.coverContent}>{props.info.preface}</div> 
        <div className={classes.coverFooter}>
          Xin chân thành cảm ơn!
        </div> 
      </div>
    </div>
  );
}