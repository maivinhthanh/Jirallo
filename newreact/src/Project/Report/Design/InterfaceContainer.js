import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './InterfaceUI'
import * as action from './action'

class InterfaceContainer extends Component {
    constructor(props) {
        super(props)
        
    }
    
    AddGroup = () => { 
        this.props.AddGroup(this.props.report._id)
    }
    addUI = (idgroup) => { 
        const data = {
            idgroup: idgroup,
        }
        this.props.AddInterface(this.props.report._id, data)
    }
    
    PushImage = (image, name, idgroup, idui)=>{
        
        let data = new FormData()
        data.append('avatar',image)
        data.append('name',name)
        data.append('idgroup',idgroup)
        data.append('idui',idui)
        this.props.PushImageInterface(this.props.report._id,data)
    }
    
    DeleteImage = (idgroup, idui, idimage) =>{
        const data = {
            idgroup: idgroup,
            idimage:idimage,
            idui: idui
        }
        this.props.DeleteImageInterface(this.props.report._id, data)
    }
    updateTitle = (title, descript, idgroup, idui) =>{
        const data = {
            idui: idui,
            title: title,
            descript: descript,
            idgroup: idgroup
        }
        this.props.UpdateInterface(this.props.report._id, data)
    }
    UpdateImage = (image, name, idgroup, idui, idimage) =>{
        let data = new FormData()
        if(image){
            data.append('avatar',image)
        }
        data.append('name',name)
        data.append('idgroup',idgroup)
        data.append('idui',idui)
        data.append('idimage',idimage)
        this.props.UpdateImageInterface(this.props.report._id,data)
    }
    
    updateContent = (title, descript, idgroup, idui)=>{
        const data = {
            idui: idui,
            descript: descript,
            title: title,
            idgroup: idgroup
        }
        this.props.UpdateInterface(this.props.report._id, data)
    }
    
    addObject = (indexChangeGroup, indexChangeUI) =>{
        this.props.AddObject(indexChangeGroup, indexChangeUI)
    }
    
    updateObject = (text, name, indexChangeGroup, indexChangeUI, indexObj) =>{
        let listobject = this.props.report.ui[indexChangeGroup].content[indexChangeUI].listobject
        listobject[indexObj][name] = text
        const data = {
            idui: this.props.report.ui[indexChangeGroup].content[indexChangeUI]._id,
            idgroup : this.props.report.ui[indexChangeGroup]._id,
            listobject: listobject
        }
        this.props.UpdateObject(this.props.report._id,data)
    }
    updateNameGroup = (name, idgroup)=>{
        const data = {
            name: name,
            idgroup: idgroup
        }
        this.props.UpdateNameGroup(this.props.report._id, data)
    }
    DeleteGroupInterface = (idgroup)=>{
        this.props.DeleteGroupInterface(this.props.report._id, idgroup)
    }
    DeleteInterface = (idgroup, idui)=>{
        this.props.DeleteInterface(this.props.report._id, idgroup, idui)
    }
    DeleteObject = (idgroup, idui, idobj)=>{
        this.props.DeleteObject(this.props.report._id, idgroup, idui, idobj)
    }
    render() {
        const { report } = this.props
        return (
            <div >
                <UI info={report} 
                    AddGroup={this.AddGroup}
                    updateTitle={this.updateTitle}
                    updateContent={this.updateContent}
                    addUI={this.addUI}
                    deleteImage={this.DeleteImage}
                    updateImage={this.UpdateImage}
                    saveImage={this.PushImage}
                    addObject={this.addObject}
                    updateObject={this.updateObject}
                    updateNameGroup={this.updateNameGroup}
                    deleteGroupInterface={this.DeleteGroupInterface}
                    deleteInterface={this.DeleteInterface}
                    deleteObject={this.DeleteObject}/>
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
        AddGroup: (id) => dispatch(action.AddGroup(id)),
        UpdateNameGroup: (id, data) => dispatch(action.UpdateNameGroup(id, data)),
        AddInterface: (id, data) => dispatch(action.AddInterface(id, data)),
        PushImageInterface: (id, data) => dispatch(action.PushImageInterface(id, data)),
        DeleteImageInterface: (id, data) => dispatch(action.DeleteImageInterface(id, data)),
        UpdateImageInterface: (id, data) => dispatch(action.UpdateImageInterface(id, data)),
        UpdateInterface: (id, data) => dispatch(action.UpdateInterface(id, data)),
        AddObject: (idgroup, idui) => dispatch(action.AddObject(idgroup, idui)),
        UpdateObject: (id, data) => dispatch(action.UpdateObject(id, data)),
        DeleteGroupInterface: (id ,idgroup) => dispatch(action.DeleteGroupInterface(id ,idgroup)),
        DeleteInterface: (id ,idgroup,idui) => dispatch(action.DeleteInterface(id ,idgroup,idui)),
        DeleteObject: (id ,idgroup,idui, idobj) => dispatch(action.DeleteInterfaceObject(id ,idgroup,idui, idobj)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InterfaceContainer)