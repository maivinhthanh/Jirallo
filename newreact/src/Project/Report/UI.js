import React, {useRef} from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Content from './Content/ContentContainer'
import Cover from './Cover/CoverContainer'
import Preface from './Preface/PrefaceContainer'
import Introduce from './Introduce/IntroduceContainer'
import Survey from './Survey/SurveyContainer'
import Diagram from './Usecase/DiagramContainer'
import Usecase from './Usecase/UsecaseContainer'

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
      else if(data === 'Preface'){
        window.scrollTo(0, preface.current.offsetTop)
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
      else if(data === 'Diagram'){
        window.scrollTo(0, diagram.current.offsetTop)
      }
      else if(data === 'Usecase'){
        window.scrollTo(0, usecase.current.offsetTop)
      }
    };

    const cover = useRef(null)
    const survey = useRef(null)
    const preface = useRef(null)
    const introduce = useRef(null)
    const diagram = useRef(null)
    const usecase = useRef(null)

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
                <div ref={preface}>
                  <Preface />     
                </div>
                <div >
                  <Introduce forwardedRef={introduce} />     
                </div>  
                <div ref={survey}>
                  <Survey />
                </div>    
                <div ref={diagram}>
                  <Diagram  />
                </div>
                <div ref={usecase}>
                  <Usecase />
                </div> 
              </div>
            </div>
        </div>
    )

  
})