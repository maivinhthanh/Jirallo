import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import ContentUI from './ContentUI'
import * as action from './action'

class ContentContainer extends Component {
  
    selectContent = (data) =>{
        this.props.selectContent(data)
    }
    render() {
        return (
            <div >
                <ContentUI selectContent={this.selectContent}/>
            </div>
        )
        
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer)