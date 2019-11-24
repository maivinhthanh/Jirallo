import React, { Component, Fragment } from 'react'
import Process from './Process'
import Issues from './Issues'
import { move } from './Move'
import { connect } from 'react-redux'
import _ from 'lodash'

class ActiveSprint extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.listissues)
        
        this.cloneO = this.props.listissues
    }
    componentWillUpdate(nextProps, nextState, snapshot) {
        console.log(nextProps.listissues)
        // debugger
        if (nextProps.listissues != this.props.listissues) {
            this.cloneO = nextProps.listissues
            console.log(this.cloneO)
            
        }
      }
    
    shouldComponentUpdate(nextProps, nextState){
        
        return this.props.listissues != nextProps.listissues;
    }
    
    render(){
        return (
        
            <div className="row " style={{ width: '100%',height: '400px'}}>
                <div className="col-6" style={{ width: '100%',height: '400px'}} >
                    <Process white process={'todo'}>
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
                <div className="col-6" style={{ width: '100%',height: '400px'}} >
                    <Process white process={'done'}>
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
        
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(ActiveSprint)