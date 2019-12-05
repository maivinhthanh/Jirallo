import React, { Component } from 'react';
import {
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from "reactstrap";
import _ from 'lodash'
import { useDrag } from 'react-dnd'
import { useDrop } from 'react-dnd'
function IssuesLog(props) {
    // handleAddIssue: ƒ handleAddIssue(id, issue)
    // item: {idsprint: Array(0), image: null, comment: Array(0), watch: Array(1), hidden: false, …}
    // modal: false
    // parentCallBack: ƒ (data, active)
    // sprint: [{…}]
    // white: true
    let idIssue = "";
    let itemACtive = [];
    let idActive = ''
    const [{ isDragging }, drag] = useDrag({
        item: { type: 'issueIn', issue: props.item },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    let item = props.item[1]
    const fill = props.white ? 'white' : 'white'
    const [{ isOver }, drop] = useDrop({
        accept: 'issueIn',
        drop: (item) => {
            props.handleAddIssue(props, item)
            // props.handleAddIssue(props.sprint[0]._id, item.issue._id)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })
    const addIssueToSprint = id => {
        props.AddIssueIntoSprint(id, idIssue);
    };
    const getIdIssue = id => {
        idIssue = id;
    };
    const RedirectToUpdate = item => {
        itemACtive = item;
        props.showUpdateIssue()
    };
    const showContent = (id) => {
        idActive = id;
        props.parentCallBack(props.modal, idActive);
    }
    return (
        // <div
        // style={{
        //     position: 'relative',
        //     width: '100%',
        //     height: '100%',
        //     padding: '15px 0px',}}
        // >
        <div ref={drop} style={{ position: 'relative', width: '100%', height: '100%', }} >
            <div style={{
                backgroundColor: fill, width: '100%',
                height: '100%',
            }} >
                <div ref={drag}
                    style={{
                        opacity: isDragging ? 1 : 1,
                        fontSize: 25,
                        fontWeight: 'bold',
                        cursor: 'move',
                        border: '1px solid',
                        margin: '12px',
                        borderRadius: '12px'
                    }}
                    className={`issues ${!props.modal ? "" : "custom"}`}
                    style={{
                        float: "left",
                        marginLeft: "75px",
                        marginBottom: "15px"
                    }}
                >
                    <div className="nameIssue"
                    >
                        <span onClick={() => showContent(props.item._id)}>
                            {props.item.name}
                        </span>
                    </div>
                    <i
                            data-toggle="modal"
                            data-target="#myModal"
                            className="fas fa-cog setting-issue"
                            onClick={() => RedirectToUpdate(props.item)}
                        ></i>
                    <div className="option-add">
                        <UncontrolledDropdown>
                            <DropdownToggle caret>
                                <i
                                    className="fas fa-ellipsis-h setting-addsprint"
                                    onClick={() => getIdIssue(props.item._id)}
                                    style={{ color: "black", marginTop: "-7px" }}
                                ></i>
                            </DropdownToggle>
                            <DropdownMenu>
                                {_.map(props.sprint, (data, index) => {
                                    return (
                                        <DropdownItem
                                            onClick={() => addIssueToSprint(data._id)}
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
            </div>
            {isOver && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 1,
                    opacity: 1, backgroundColor: 'whitesmoke',
                }}
                />
            )}
        </div>
        // </div>
    );
}
export default IssuesLog;