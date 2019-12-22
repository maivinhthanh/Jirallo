import React, { Component } from 'react'
import { connect } from "react-redux"
import {
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import _ from 'lodash'
import { Link } from 'react-router-dom'

import * as actions from '../../Store/actions/project'
import * as actionsissues from '../../Store/actions/issues'


class ListIssues extends Component {
    componentWillMount(){
        this.props.viewListIssuesInProject(this.props.params, null)
    }
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.listissues !== this.props.listissues
    }
    viewInfoIssues = (id) =>{
        console.log(id)
        this.props.viewInfoIssues(id)
    }
    render() {
        const {listissues} = this.props
        return (
            <div className="listissues" style={{
                overflow: 'auto', height:'500px'
            }}>
                {
                    _.map(listissues, (item, index) =>{
                        return(
                            <Link className="nav-link" to={{ pathname: `/issues/${this.props.params}/${item._id}` }}
                            onClick={()=>this.viewInfoIssues(item._id)} key={index}>
                                <Card >
                                    <CardTitle>{item.name}</CardTitle>
                                    <CardBody>
                                        <div className="row">
                                        <div className="col-4">
                                            {
                                            item.type === 'task'  
                                                ?<i className="fas fa-circle"></i>
                                                :<i className="fas fa-bug"></i>
                                            }
                                        </div>
                                        <div className="col-4">
                                        {
                                            item.priority == 'highest'  
                                                ?<i className="fas fa-arrow-up" style={{color: 'red'}}></i>: 
                                            item.priority == 'high'
                                                ?<i className="fas fa-up" style={{color: 'black'}}></i>:
                                            item.priority == 'medium'
                                                ?<i className="fas fa-minus" style={{color: 'black'}}></i>:
                                            item.priority == 'low'
                                                ?<i className="fas fa-arrow-down" style={{color: 'black'}}></i>:
                                                <i className="fas fa-arrow-down" style={{color: 'red'}}></i>
                                            }
                                        </div>
                                        <div className="col-4">
                                            <i className="fas fa-tag">{item.tag}</i>
                                        </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Link>
                        )
                    })
                }
            </div>
        )
    }
}
const mapStateToProps = state => {
  return {
    listissues: state.listissues
  };
};
const mapDispatchToProps = dispatch => {
  return {
    viewListIssuesInProject: (id, user) => dispatch(actions.viewListIssuesInProject(id, user)),
    viewInfoIssues: (id) => dispatch(actionsissues.viewInfoIssuesAct(id)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListIssues)