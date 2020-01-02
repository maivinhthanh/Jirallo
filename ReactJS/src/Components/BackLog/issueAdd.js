import React, { Component } from 'react';
// import {
//     Button,
//     UncontrolledCollapse,
//     Card,
//     CardBody,
//     UncontrolledDropdown,
//     DropdownItem,
//     DropdownMenu,
//     DropdownToggle
// } from "reactstrap";
import _ from 'lodash'
import { useDrag } from 'react-dnd'
import WrapperDrop from './WrapperDrop';
import { useDrop } from 'react-dnd'

export default function IssueAdd(props) {
    const [{ isDragging }, drag] = useDrag({
        item: { type: 'issue', issue: props.item },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })
    let item = props.item[1]
    const fill = props.white ? 'white' : 'white'
    const [{ isOver }, drop] = useDrop({
        accept: 'issue',
        drop: (item) => {
            props.handleAdd(props, item)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
        accept: 'issueIn',
        drop: (item) => {
            props.handleAddIssueIntoSprint(props, item)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })
    return (
       
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            padding: '7px 0px', }}>
           
            <div ref={drop} style={{ position: 'relative', width: '100%', height: '100%', }} >
                <div style={{
                    backgroundColor: fill, width: '100%',
                    height: '100%', }} >
                    <div
                        ref={drag}
                        style={{
                            opacity: isDragging ? 1 : 1,
                            fontSize: 20,
                            cursor: 'move',
                            border: '1px solid #ccaa', height: '40px',
                            padding: '5px'}}
                        className={`${!props.modal ? "" : "col-md-12"}`}>
                            <span>
                        <span className={`${props.item.type === 'task' ? 'bug' : 'task'}`}></span>
                        {props.item.name}
                        </span>
                        {/* <div
                            className={`issues ${!props.modal ? "" : "custom"}`}
                            style={{ float: "left", marginLeft: "75px", marginBottom: '15px' }}
                        >
                            <div className="nameIssue">
                                <span>
                                    {props.item.name}
                                </span>
                            </div>
                            <i
                                data-toggle="modal"
                                data-target="#myModal"
                                className="fas fa-cog setting-issue"
                            // onClick={() => this.RedirectToUpdate(item)}
                            ></i>
                        </div> */}
                    </div>
                </div>
                {isOver && (
                    <div style={{
                        position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 1,
                        opacity: 1, border: '4px black dotted', backgroundColor: 'whitesmoke',
                    }}
                    />
                )}
            </div>
        </div>



    );
}