import React, {useRef} from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Content from './Content/ContentContainer'
import Cover from './Cover/ContentContainer'
import Preface from './Preface/PrefaceContainer'
import Introduce from './Introduce/IntroduceContainer'

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

export default React.forwardRef( function UI({idproject}) {
    const classes = useStyles();
    
    // const [selected, setSelected] = React.useState(null);
    const handleSelect = (data) => {
      if(data === 'Cover'){
        window.scrollTo(0, cover.current.offsetTop)
      }
      else if(data === 'Survey'){
        window.scrollTo(0, survey.current.offsetTop)
      }
      else if(data === 'Urgency'){
        window.scrollTo(0, introduce.current.urgencyRef.offsetTop)
      }
      else if(data === 'Target'){
        window.scrollTo(0, introduce.current.targetRef.offsetTop)
      }
      else if(data === 'Structure'){
        window.scrollTo(0, introduce.current.structureRef.offsetTop)
      }
    };

    const cover = useRef(null)
    const survey = useRef(null)
    const introduce = useRef(null)

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
                <div >
                  <Introduce forwardedRef={introduce} />     
                </div>       
              </div>
            </div>
        </div>
    )

  
})