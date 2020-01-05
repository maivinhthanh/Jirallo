import React, { Component } from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import IteamHeader from '../IteamHeader'
import AddMember from './AddMember'
import AddProcess from './AddProcess'
import EditProject from './EditProject'
import HeaderProject from './HeaderProject'
import * as action from '../../Store/actions/project'
import _ from 'lodash'

class ConfigProject extends Component {
    constructor(props){
        super(props)
    }
    componentWillMount() {
        this.props.getInfoProject(this.props.params)
    }
  render() {
    const { params, auth, project } = this.props
    
    return (
        <div className="row">
            <div className="col-12">
            <HeaderProject/>
            </div>
            
            <div className="col-1" >
                <IteamHeader params={params}/>
            </div>
            {
                auth?(
                    <div className="col-11 container" >
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <Link className="nav-link" to={{ pathname: `/config/${params}/edit` }}>
                                    <p>Edit Project</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={{ pathname: `/config/${params}/addmember` }}>
                                    <p>Add Member</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={{ pathname: `/config/${params}/addprocess` }}>
                                    <p>Add Process</p>
                                </Link>
                            </li>
                        
                        </ul>
                        <Switch>
                                <Route exact path={`/config/${params}/edit`} >
                                    {
                                    !_.isEqual(project.id, '') &&
                                    _.map(project, (item,index) => {
                                       return <EditProject params={params} projectAct={item} />
                                    })
                                    }
                                </Route>
                                <Route path={`/config/${params}/addmember`} >
                                    <AddMember params={params} />
                                </Route>
                                <Route path={`/config/${params}/addprocess`} >
                                    <AddProcess params={params} />
                                </Route>
                        </Switch>
                    </div>
                ):
                (<div></div>)
            }
            
        </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    error: state.error,
    project: state.project
  };
};
const mapDispatchToProps = dispatch => {
    return {
        getInfoProject: (id) => dispatch(action.getInfoProject(id)),
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigProject)