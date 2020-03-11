import React, {useRef, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Content from './Content/ContentContainer'
import Cover from './Cover/ContentContainer'
import Preface from './Preface/PrefaceContainer'

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
        position: 'relative'
      },
    },
    content:{
      width: '100%'
    }
}));

export default function UI({idproject}) {
    const classes = useStyles();
    
    // const [selected, setSelected] = React.useState(null);
    const handleSelect = (data) => {
      console.log(data)
      if(data === 'Cover'){
        window.scrollTo(0, cover.current.offsetTop)
      }
      else if(data === 'Survey'){
        window.scrollTo(0, survey.current.offsetTop)
      }
    };

    const cover = useRef(null)
    const survey = useRef(null)

    return (
        <div>
            <div className="row">
              <div className="col-3" >
                <div className={`position-fixed + ${classes.content}`} >
                  <Content idproject={idproject} selectContent={handleSelect}/>
                </div>
              </div>

              <div className="col-9">
                <div ref={cover}>
                  <Cover />
                </div>
                <div ref={survey}>
                  <Preface />     
                </div>
                             
              </div>
            </div>
        </div>
    )

  
}