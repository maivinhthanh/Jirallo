import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import * as action from './action'
import CustomPaginationActionsTable from './TableHistory'
import _ from 'lodash'
import './style.scss'

class Activities extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            activity: props.activity
        }
    }
    componentDidUpdate(nextProps) {
        const { activity } = this.props
        if(!_.isEqual(nextProps.activity, activity)) {
            this.setState({ activity })
        }
    }
    render() {
        const { activity } = this.state
        return ( 
            <div>
                <div className="_content">
                <h4>Activities</h4>
                <p>History</p>
                </div>
                { 
                !_.isEmpty(activity) &&
                <CustomPaginationActionsTable activity={activity} handleGetList={this.props.handleGetList}/>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        activity: state.activity
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getListActivities : (page) => dispatch(action.getListActivities(page))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Activities)