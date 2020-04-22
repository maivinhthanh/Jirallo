import React, {useRef} from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Content from './Content/ContentContainer'
import Cover from './CoverUI'
import Preface from './PrefaceUI'
import Introduce from './IntroduceUI'
import Theory from './TheoryUI'
import Survey from './SurveyUI'
import Diagram from './DiagramUI'
import Usecase from './UsecaseUI'
import DescriptionWebsite from './DescriptionUI'
import Database from './DatabaseUI'
import Interface from './InterfaceUI'
import Setting from './SettingUI'
import Testing from './TestingUI'
import Conclude from './ConcludeUI'
import Reference from './ReferenceUI'

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

export default React.forwardRef( function UI({idproject, report}) {
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
      else if(data === 'DescriptWebsite'){
        window.scrollTo(0, descript.current.offsetTop)
      }
      else if(data === 'Database'){
        window.scrollTo(0, database.current.offsetTop)
      }
      else if(data === 'Interface'){
        window.scrollTo(0, interfaces.current.offsetTop)
      }
      else if(data === 'Setting'){
        window.scrollTo(0, setting.current.offsetTop)
      }
      else if(data === 'Testing'){
        window.scrollTo(0, testing.current.offsetTop)
      }
      else if(data === 'References'){
        window.scrollTo(0, reference.current.offsetTop)
      }
      else if(data === 'Result'){
        window.scrollTo(0, conclude.current.resultRef.offsetTop)
      }
      else if(data === 'Advantages'){
        window.scrollTo(0, conclude.current.advantagesRef.offsetTop)
      }
      else if(data === 'Defect'){
        window.scrollTo(0, conclude.current.defectRef.offsetTop)
      }
      else if(data === 'Development'){
        window.scrollTo(0, conclude.current.developmentRef.offsetTop)
      }
      else if(data === 'Theory'){
        window.scrollTo(0, theory.current.offsetTop)
      }

    };

    const cover = useRef(null)
    const survey = useRef(null)
    const preface = useRef(null)
    const introduce = useRef(null)
    const theory = useRef(null)
    const diagram = useRef(null)
    const usecase = useRef(null)
    const descript = useRef(null)
    const database = useRef(null)
    const interfaces = useRef(null)
    const setting = useRef(null)
    const testing = useRef(null)
    const conclude = useRef(null)
    const reference = useRef(null)

    return (
        <div>
            <div className="row">
              <div className="col-3" >
                <div className={`position-fixed + ${classes.content}`} >
                  <Content selectContent={handleSelect}/>
                </div>
              </div>

              <div className="col-9">
                <div ref={cover}>
                  <Cover info={report}/>
                </div>
                <div ref={preface}>
                  <Preface info={report}/>     
                </div>
                <div >
                  <Introduce forwardedRef={introduce} info={report}/>     
                </div>  
                <div ref={theory}>
                  <Theory info={report}/>     
                </div>  
                <div ref={survey}>
                  <Survey info={report}/>
                </div>    
                <div ref={diagram}>
                  <Diagram info={report} />
                </div>
                <div ref={usecase}>
                  <Usecase info={report} />
                </div> 
                <div ref={descript}>
                  <DescriptionWebsite info={report}/>
                </div>
                <div ref={database}>
                  <Database info={report}/>
                </div>
                <div ref={interfaces}>
                  <Interface info={report}/>
                </div>
                <div ref={setting}>
                  <Setting info={report}/>
                </div>
                <div ref={testing}>
                  <Testing info={report}/>
                </div>
                <div >
                  <Conclude forwardedRef={conclude} info={report}/>     
                </div>  
                <div ref={reference}>
                  <Reference info={report}/>
                </div>
              </div>
            </div>
        </div>
    )

  
})