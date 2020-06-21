import React from 'react';
import { useDrag } from 'react-dnd'
import { useDrop } from 'react-dnd'

export default function IssueAdd(props) {
    const [{ isDragging }, drag] = useDrag({
        item: { type: 'process', process: props.name },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })
    let item = props.item
    const fill = props.white ? 'white' : 'white'
    const [{ isOver }, drop] = useDrop({
        accept: 'process',
        drop: (item) => {
            props.changePosition(props, item)
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
                        <span >
                            {props.name}
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