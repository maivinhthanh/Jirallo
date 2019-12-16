import React, { Component, Fragment } from 'react'
import Process from './Process'
import Issues from './Issues'
import * as actions from '../../Store/actions/issues'
import { connect } from 'react-redux'
import _ from 'lodash'

class ActiveSprint extends Component {
    constructor(props) {
        super(props);        
        this.cloneO = this.props.listissues
        this.changeProcessIssue = this.props.changeProcessIssue
    }
    componentWillUpdate(nextProps, nextState, snapshot) {

        if (nextProps.listissues != this.props.listissues) {
            this.cloneO = nextProps.listissues            
        }
      }
    
    shouldComponentUpdate(nextProps, nextState){
        return this.props.listissues != nextProps.listissues;
    }
    
    render(){
        console.log(this.cloneO)
        const heightProcess = this.cloneO.lenght * 100
        return (
        
            <div className="row " style={{ width: '100%',height: '400px'}}>
                <div className="col-6" style={{ width: '100%',height: heightProcess}} >
                    <Process white process={'todo'} handleChange={(id, process) => this.props.changeProcessIssue(id, process)}>
                        {
                             _.map(this.cloneO, (item, index)=>{
                                if(item.process === 'todo'){
                                    return (
                                        <Issues name={item} key={index}/>
                                    )
                                }
                                
                            })
                       }
                    </Process>
                </div>
                <div className="col-6" style={{ width: '100%',height: heightProcess}} >
                    <Process white process={'done'} handleChange={(id, process) => this.props.changeProcessIssue(id, process)}>
                        {
                             _.map(this.cloneO, (item, index)=>{
                                if(item.process === 'done'){
                                    return (
                                        <Issues name={item} key={index}/>
                                    )
                                }
                                
                            })
                        }
                    </Process>
                </div>
            </div>    
        )
    }
    
}
const mapStateToProps = state => {
    return {
        listissues: state.listissues,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        changeProcessIssue: (id, process) => dispatch(actions.changeProcessIssue(id, process))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ActiveSprint)