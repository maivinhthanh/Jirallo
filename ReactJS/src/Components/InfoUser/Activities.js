import React, { Component } from 'react'
import { connect } from "react-redux"
import * as actions from "../../Store/actions/activities";
import _ from 'lodash'
import {
    Card, CardBody
} from "reactstrap";

import Pagination from '../Utinities/Pagination';

class Activities extends Component {
    constructor(props) {
        super(props);
        this.exampleItems = _.range(1, 10).map(i => { return { id: i, name: 'Item ' + i }; });
        this.state = {
            pageOfItems: []
        };
    }
    componentWillMount(){
        this.props.getAllActivities(1)
    }
    shouldComponentUpdate(nextProp, nextState){
        return nextProp.activities.activities !== this.props.activities.activities
    }
    onChangePage = (pageOfItems) => {
        this.setState({ pageOfItems: pageOfItems });
        this.props.getAllActivities(pageOfItems)
    }
    render() {
        if(!this.props.activities.totalpages ){
            this.exampleItems = _.range(1, 10).map(i => { return { id: i, name: 'Item ' + i }; });
        }
        else{
            this.exampleItems = _.range(1, this.props.activities.totalpages * 5 + 1).map(i => { return { id: i, name: 'Item ' + i }; });
        }
        const {activities} = this.props
        return (
            <div className="container">
                {
                    _.map(activities.activities, (item, index) =>{
                        return(
                            <Card key={index} >
                                <CardBody style={{ background: "#B3C6E6" }}>
                                    <p>You had {item.action} <u>{item.content}</u></p> 
                                </CardBody>
                            </Card>
                        )
                    })
                }
                <Pagination items={this.exampleItems} onChangePage={this.onChangePage} />
            </div>
        )
    }
}
const mapStateToProps = state => {
  return {
    activities: state.activities,
  };
};
const mapDispatchToProps = dispatch => {
    return {
        getAllActivities: (page) => dispatch(actions.getAllActivities(page))
    };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activities);
