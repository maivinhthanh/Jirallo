import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import ContentUI from './ContentUI'

class ContentContainer extends Component {
  
    selectContent = (data) =>{
        this.props.selectContent(data)
    }
    render() {
        console.log(this.props.report)
        return (
            <div >
                <ContentUI selectContent={this.selectContent} report={this.props.report}/>
            </div>
        )
        
    }
}

const mapStateToProps = (state) => {
    return {
        report: state.report
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer)