import React from 'react';
import _ from 'lodash'
import { useDrag } from 'react-dnd'
import { useDrop } from 'react-dnd'

export default function IssueAdd(props) {
    const [{ isDragging }, drag] = useDrag({
        item: { type: 'issue', issue: props.item },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })
    // console.log(props)
    let item = props.item
    let modal = true
    const fill = props.white ? 'white' : 'white'
    const [{ isOver }, drop] = useDrop({
        accept: 'issuea',
        drop: (item) => {
            props.handleAdd(props, item)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
        accept: 'issue',
        drop: (item) => {
            props.handleAddIssueIntoSprint(props, item)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })
    const showInfomation = (id) => {
        modal = true
        props.showInfomationIssue(id, modal)
    }
    return (

        <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            padding: '7px 0px',
        }}>

            <div ref={drop} style={{ position: 'relative', width: '100%', height: '100%', }} >
                <div style={{
                    backgroundColor: fill, width: '100%',
                    height: '100%',
                }} >
                    <div
                        ref={drag}
                        style={{
                            opacity: isDragging ? 1 : 1,
                            fontSize: '1rem',
                            cursor: 'move',
                            border: '1px solid #ccaa', height: '40px',
                            padding: '5px'
                        }}
                        className="col-md-12">
                        <span onClick={()=> showInfomation(props.item._id)}>
                            <span className="mr-2">
                                {props.item.type === 'bug' ? <i className="fas fa-bug" style={{ color: 'red' }}></i> : <i className="fas fa-tasks" style={{ color: 'green' }}></i>}
                            </span>
                            {props.item.name}
                        </span>
                        
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