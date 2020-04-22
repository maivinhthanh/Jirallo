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

export default function DiagramUI(props) {
  const classes = useStyles();

  return (
    <div className="Cover">
      <div className={classes.A4} >
          <div className={classes.coverTitle}>
            CHƯƠNG 3: MÔ HÌNH HÓA YÊU CẦU
          </div>  
          <div className={classes.coverSubTitle} >
            3.1. LƯỢC ĐỒ DIAGRAM
          </div>
          
          {
              _.map(props.info.usecase.diagram, (item, index)=>{
                return (
                  <div key={index}>
                    <div className={classes.coverSubTitle} >
                      <div>3.1.{index + 1}. {item.title}</div>
                    </div>
                    {
                      _.map(item.image, (image, ind)=>{
                        return(
                          <div key={ind}>
                            <img src={`http://localhost:8088/${image.address}`} width="500" height="350"/>
                            <p>{image.name}</p>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
          }
          
        </div>
    </div>
  );
}