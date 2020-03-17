import React, { Component } from 'react';
import _ from 'lodash'
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';

class DivAction extends Component {
  constructor(props){
    super(props);
    this.state ={
      isEdit: false,
      isHover: false
    }
  }
  editText = ()=>{
    this.setState({
      isEdit: true
    })
  }

  handleHover = () =>{
    this.setState({
      isHover: !this.state.isHover
    })
  }

  saveText = ()=>{
    this.setState({
      isEdit: false
    })
  }

  render() {
    const { isHover } = this.state
    if(this.state.isEdit){
      return (
        <div onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}
          style={{fontSize : this.props.size, marginBottom : this.props.arrow,
          display:'inline', margin: this.props.margin}} >
          <div>
            abc
          </div>
          {
            isHover ? 
            <div >
              <Avatar variant="rounded" onClick={this.editText}>
                <Icon className="fas fa-edit"></Icon>
              </Avatar>
            </div>
            :
            <div >
              <Avatar variant="rounded" onClick={this.saveText}>
                <Icon className="fas fa-check"></Icon>
              </Avatar>
            </div>
          }
        </div>
      );
    }
    else{
      return (
        <div onMouseEnter onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}
          style={{fontSize : this.props.size, marginBottom : this.props.arrow,
          display:'inline', margin: this.props.margin}} >
          <div>
            def
          </div>
          {
            isHover ? 
            <div >
              <Avatar variant="rounded" onClick={this.editText}>
                <Icon className="fas fa-edit"></Icon>
              </Avatar>
            </div>
            :
            <div >
              <Avatar variant="rounded" onClick={this.saveText} >
                <Icon className="fas fa-check"></Icon>
              </Avatar>
            </div>
          }
        </div>
      );
    }
    
  }
}
export default DivAction
