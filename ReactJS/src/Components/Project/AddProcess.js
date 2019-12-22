import React, { Component } from 'react'
import { connect } from "react-redux"
import _ from 'lodash'

import * as action from '../../Store/actions/project'

class AddProcess extends Component {
  constructor(props) {
    super(props)
    this.state = {
      process: [],
      name: ''
    }
  }
  componentWillMount() {
    this.props.getInfoProject(this.props.params)
  }
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.project !== this.props.project
  }
  add = () =>{
    if(this.state.name !== ''){
      const listprocess = [...this.props.project[0].process, (this.state.name).toLowerCase()]
      if(listprocess.length >=5){
        return
      }
      this.props.AddProcess(this.props.params,listprocess)
    }
    
  }
  handleName = (e) =>{
    e.preventDefault();
    this.setState({
      name: e.target.value
    })
  }
  render() {
    let process = []
    if (this.props.project[0] !== undefined){
      process = this.props.project[0].process
      this.setState({
        process : this.props.project[0].process
      })
      
    }
    else{
      process = []
      this.setState({
        process : []
      })
    }
    
    return (
      <div>
          {
            _.map(process, (item, index)=>{
              return(
                <div className="process text-lowercase align-middle" key={index}
                style={{margin: '30px', backgroundColor:'#B3C6E6', height: '80px'}}>
                  {item}
                </div>
              )
            })
          }
          <div className="process text-lowercase align-middle" 
          style={{margin: '30px', backgroundColor:'#B3C6E6', height: '80px'}}>
            <input className="form-control"  onChange={this.handleName} />
            <i className="fas fa-plus-circle" style={{fontSize: '40px'}} onClick={()=>this.add()}/>
          </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    project: state.project,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    AddProcess: (id, name) => dispatch(action.AddProcessAct(id, name)),
    getInfoProject: (id) => dispatch(action.getInfoProject(id)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProcess)