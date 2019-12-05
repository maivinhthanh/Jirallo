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
      drop: (item) =>{
        props.handleAdd(props, item)
        // props.handleAdd(props.filterSprint._id, item.issue._id)
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
            padding: '15px 0px',
            // backgroundColor: '#B3C6E6',
        }}>

            <div ref={drop} style={{ position: 'relative', width: '100%', height: '100%', }} >
                <div style={{
                    backgroundColor: fill, width: '100%',
                    height: '100%', 
                    // border: '1px black solid',
                }} >
                    <div
                        ref={drag}
                        style={{
                            opacity: isDragging ? 1 : 1,
                            fontSize: 20,
                            cursor: 'move',
                            border: '1px solid #ccaa',
                            // margin: '12px',
                            padding:'5px'
                        }}
                    >
                        {props.item.name}
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