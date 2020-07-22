import React from 'react'
import { connect } from "react-redux";
import * as action from './action'
import Activities from './Activities'
import _ from 'lodash'

class ActivitiesContainer extends React.Component {
    constructor(props){
        super(props)
        this.handleGetList = this.handleGetList.bind(this)
    }
    componentDidMount() {
        this.props.getListActivities('1')
    }
    handleGetList(page) {
        this.props.getListActivities(page)
    }
    render() {
        const { activity } = this.props
        return (
            !_.isEmpty(activity) && 
            <Activities activity={activity} handleGetList={this.handleGetList} />
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
export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesContainer)
