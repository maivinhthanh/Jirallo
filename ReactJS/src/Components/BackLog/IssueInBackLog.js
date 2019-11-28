import React, { Component } from 'react';
import { useDrag } from 'react-dnd'
import _ from 'lodash'
import IssuesLog from '../BackLog/IssuesLog'
import WrapperDrop from '../BackLog/WrapperDrop'

export default function IssueInBackLog(props) {
    console.log(props.name)
    const [{ isDragging }, drag] = useDrag({
        item: { type: 'issue', id: props.name },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })
    const parentCallBack = (data, active) => {
        props.parentCallBack(data, active)
    }
    return (
        <div >
            {_.map(_.filter(_.compact(props.issues), (item, index) => item.hidden == false), (item, index) => {
                return (
                    <IssuesLog
                    drag={drag}
                    // ref={drag}
                    item={item}
                    modal={props.modal}
                    isDragging={isDragging}
                    sprint={props.sprint}
                    parentCallBack={parentCallBack}
                    />
                )
            })}
        </div>

    );
}