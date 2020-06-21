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

export default function TheoryUI(props) {
  const classes = useStyles();

  return (
    <div className="Cover">
      <div className={classes.A4} >
          <div className={classes.coverTitle}>
            CHƯƠNG 1: CƠ SỞ LÝ THUYẾT
          </div>  
          
          {
            _.map(props.info.theory, (item, index)=>{
              return (
                <div key={index}>
                  <div className={classes.coverSubTitle} >
                    <div>1.{index + 1}. {item.title}</div>
                  </div>
                  <div>
                    {
                      _.map(item.image, (image, ind)=>{
                        return(
                          <div key={ind}>
                            <img src={`http://localhost:8088/${image.address}`} alt="a" width="500" height="350"/>
                            <p>{image.name}</p>
                          </div>
                          
                          
                        )
                      })
                    }
                    
                  </div>
                  
                  <div>
                    {
                      _.map(item.content, (text, ind)=>{
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