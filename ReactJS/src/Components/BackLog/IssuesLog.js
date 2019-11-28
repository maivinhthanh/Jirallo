import React, { Component } from 'react';
import {
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from "reactstrap";
import _ from 'lodash'
class IssuesLog extends Component {
    constructor(props){
        super(props)
        this.idIssue = "";
        this.itemACtive = [];
        this.idActive = ''
    }
    addIssueToSprint = id => {
        this.props.AddIssueIntoSprint(this.idIssue, id);
    };
    getIdIssue = idIssue => {
        this.idIssue = idIssue;
    };
    RedirectToUpdate = item => {
        this.setState({
            status: true
        });
        this.itemACtive = item;
    };
    showContent = (id) => {
        this.idActive = id;
        this.props.parentCallBack(this.props.modal, this.idActive);
    }
    render() {
        console.log(this.props)
        return (
                 <div ref={this.props.drag}
                    style={{
                        opacity: this.props.isDragging ? 1 : 1,
                        fontSize: 25,
                        fontWeight: 'bold',
                        cursor: 'move',
                        border: '1px solid',
                        margin: '12px',
                        borderRadius: '12px'
                    }}
                        className={`issues ${!this.props.modal ? "" : "custom"}`}
                        style={{
                            float: "left",
                            marginLeft: "75px",
                            marginBottom: "15px"
                        }}
                    >
                        <div className="nameIssue"
                        >
                            <span onClick={()=> this.showContent(this.props.item._id)}>
                                {this.props.item.name}
                            </span>
                        </div>
                        <i
                            data-toggle="modal"
                            data-target="#myModal"
                            className="fas fa-cog setting-issue"
                            onClick={() => this.RedirectToUpdate(this.props.item)}
                        ></i>
                        <div className="option-add">
                            <UncontrolledDropdown>
                                <DropdownToggle caret>
                                    <i
                                        className="fas fa-ellipsis-h setting-addsprint"
                                        onClick={() => this.getIdIssue(this.props.item._id)}
                                        style={{ color: "black", marginTop: "-7px" }}
                                    ></i>
                                </DropdownToggle>
                                <DropdownMenu>
                                    {_.map(this.props.sprint, (data, index) => {
                                        return (
                                            <DropdownItem
                                                onClick={() => this.addIssueToSprint(data._id)}
                                                key={index}
                                            >
                                                {data.name}
                                            </DropdownItem>
                                        );
                                    })}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </div>
        );
    }
}

export default IssuesLog;