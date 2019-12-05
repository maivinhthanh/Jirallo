import React, { Component } from 'react'
import { connect } from "react-redux"

import Project from '../Containers/Project/ProjectContainer'
import ShowError from '../Components/Modal/ShowError'

class ListProjectPage extends Component {
  constructor(props) {
    super(props);        
    this.clone = this.props.error
  }
  shouldComponentUpdate(nextProps, nextState){
    return this.props.error != nextProps.error
  }
  // componentWillUpdate(nextProps, nextState, snapshot){
  //   if (nextProps.error != this.props.error) {
  //     this.clone = nextProps.error            
  //   }
    
  // }
  render() {
    console.log(this.props.error.message !== '')
    if(this.props.error.message !== ''){
      return(
        <ShowError isshow={true} type={'warning'} message={this.props.error.message}/>
      )
    }
    else{
      return (
        <div className="viewAll">
          <Project/>
        </div>
      )
    }
    
  }
}
const mapStateToProps = state => {
  return {
    error: state.error,
  };
};

export default connect(
  mapStateToProps,
  null
)(ListProjectPage)