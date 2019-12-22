import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import * as action from '../../Store/actions/project'
import * as actions from '../../Store/actions/issues'
import Issues from './Issues'
import Process from './Process'

class ActiveSprint extends Component {
    constructor(props) {
        super(props);        
        this.cloneO = this.props.listissues
        this.changeProcessIssue = this.props.changeProcessIssue
    }
    componentWillMount() {
        this.props.getInfoProject(this.props.params)
    }
    componentWillUpdate(nextProps, nextState, snapshot) {

        if (nextProps.listissues != this.props.listissues) {
            this.cloneO = nextProps.listissues            
        }
      }
    
    shouldComponentUpdate(nextProps, nextState){
        return this.props.listissues != nextProps.listissues ||
        this.props.project != nextProps.project
    }
    
    render(){
        let process = []
        if (this.props.project[0] !== undefined){
            process = this.props.project[0].process
        }
        else{
            process = []
        }
        const numberColumn = 12 / Number.parseInt(process.length)
        const heightProcess = this.cloneO.length * 100 + 200 
        return (
            <div className="row " style={{ width: '100%',height: '400px'}}>
                {
                    _.map(process, (ip, idp) =>{
                        return(
                            <div className={`col-${numberColumn}`} style={{ width: '100%',height: heightProcess + 'px'}} key={idp}>
                                <Process white process={ip} handleChange={(id, process) => this.props.changeProcessIssue(id, process)}>
                                    {
                                        _.map(this.cloneO, (item, index)=>{
                                            if(item.process === ip){
                                                return (
                                                    <Issues name={item} key={index}/>
                                                )
                                            }
                                            
                                        })
                                }
                                </Process>
                            </div>
                        )
                    })
                }
            

            </div>    
        )
    }
    
}
const mapStateToProps = state => {
    return {
        listissues: state.listissues,
        project: state.project
    }
}
const mapDispatchToProps = dispatch => {
    return {
        changeProcessIssue: (id, process) => dispatch(actions.changeProcessIssue(id, process)),
        getInfoProject: (id) => dispatch(action.getInfoProject(id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ActiveSprint)