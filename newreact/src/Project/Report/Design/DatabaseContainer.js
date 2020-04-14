import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './DatabaseUI'
import * as action from './action'

class DatabaseContainer extends Component {
    constructor(props) {
        super(props)
        
    }
    
    PushImageDatabase = (image, name)=>{
        
        let data = new FormData()
        data.append('avatar',image)
        data.append('name',name)
        this.props.PushImageDatabase(this.props.report._id,data)
    }
    
    DeleteImageDatabase = (idimage) =>{
        const data = {
            idimage:idimage,
        }
        this.props.DeleteImageDatabase(this.props.report._id, data)
    }
    
    UpdateImageDatabase = (image, name, idimage) =>{
        let data = new FormData()
        if(image){
            data.append('avatar',image)
        }
        data.append('name',name)
        data.append('idimage',idimage)
        this.props.UpdateImageDatabase(this.props.report._id,data)
    }
    
    render() {
        const { report } = this.props
        return (
            <div >
                <UI info={report} 
                    deleteImage={this.DeleteImageDatabase}
                    updateImage={this.UpdateImageDatabase}
                    saveImage={this.PushImageDatabase}/>
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
        PushImageDatabase: (id, data) =>dispatch(action.PushImageDatabase(id, data)),
        DeleteImageDatabase: (id, data) =>dispatch(action.DeleteImageDatabase(id, data)),
        UpdateImageDatabase: (id, data) =>dispatch(action.UpdateImageDatabase(id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseContainer)