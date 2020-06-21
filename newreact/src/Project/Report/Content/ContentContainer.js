import React, { Component } from 'react'
import { connect } from 'react-redux'

import ContentUI from './ContentUI'

class ContentContainer extends Component {
  
    selectContent = (data) =>{
        this.props.selectContent(data)
    }
    render() {
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