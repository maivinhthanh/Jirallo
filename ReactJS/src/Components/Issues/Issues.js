import React, { Component } from 'react'
import { connect } from "react-redux"
import { Route, Switch } from "react-router-dom";

import ListIssues from './ListIssues'
import IteamHeader from '../IteamHeader'
import HeaderIssues from './HeaderIssues'
import InfoIssues from './InfoIssues'

class Issues extends Component {
    constructor(props) {
        super(props);  
        this.state = {
          idissues: null
        };     
      }
    
    // shouldComponentUpdate(nextProps, nextState){
    //     return nextState.idissues !== this.state.idissues
    // }
    render() {
        const {idproject, idissues} = this.props
        return (
            <div className="row">
                <div className="col-12">
                    <HeaderIssues />
                </div>
                
                <div className="col-1">
                    <IteamHeader params={idproject}/>
                </div>
                <div className="col-3">
                    <ListIssues params={idproject} />
                </div>
                <div className="col-8">
                  <Switch>
                    <Route exact path={`/issues/${idproject}/${idissues}`} >
                      <InfoIssues params={idissues}/>
                    </Route>
                    
                  </Switch>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
  return {
    issues: state.issues,
    listissues: state.listissues
  }
}

const mapDispatchToProps = dispatch => {
    return {
      
    }
  }
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Issues)