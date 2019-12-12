import React, { Component } from 'react'
import { connect } from "react-redux"

import Project from '../Containers/Project/ProjectContainer'
import MenuUser from '../Components/MenuUser/Menu'

class ListProjectPage extends Component {
  constructor(props) {
    super(props);        
    this.clone = this.props.error
  }
  shouldComponentUpdate(nextProps, nextState){
    return this.props.error != nextProps.error
  }

  render() {
      return (
        <div className="viewAll">
          <MenuUser/>
          <Project/>
        </div>
      )
    
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