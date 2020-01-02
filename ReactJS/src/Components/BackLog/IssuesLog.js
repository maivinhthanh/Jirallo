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
       
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                padding: '7px 0px',
            }}
        >
            <div ref={drop} style={{ position: 'relative', width: '100%', height: '100%', }} >
                <div style={{
                    backgroundColor: fill, width: '100%',
                    height: '100%',
                }} >
                    <div ref={drag}
                        style={{
                            opacity: isDragging ? 1 : 1,
                        }}
                        // className={`row issues ${props.modal ? "" : "col-md-12"}` 
                        className="row issues"
                    >
                            <div className="col-md-11">
                                <div className="nameIssue">
                               
                                    <span onClick={() => showContent(props.item._id)}>
                                        <span className={`${props.item.type === 'bug' ? 'bug' : 'task'}`}></span>
                                    {props.item.name}
                                    </span>
                                </div>
                            </div>  
                            <div className="col-md-1" style={{display:'flex'}}>
                                <i
                                    data-toggle="modal"
                                    data-target="#myModal"
                                    className="fas fa-cog"
                                    onClick={() => RedirectToUpdate(props.item)}
                                ></i>
                                {/* <div className={`option-add ${!props.modal ? "" : "option"}`}> */}
                                <div className='option-add'>
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
                        {/* Nut update issue */}
                    </div>
                </div>
                {isOver && (
                    <div style={{
                        position: 'absolute', top: 0, left: '71px', height: '100%', width: '90%', zIndex: 1,
                        opacity: 1, border: '4px black dotted', backgroundColor: 'whitesmoke',
                    }}
                    />
                )}
            </div>
        </div>
    );
}
export default IssuesLog;