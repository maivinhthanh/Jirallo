import React, { Component } from 'react';
import { useDrop } from 'react-dnd'
function WrapperDrop(props) {
    let item = props.children[1]
    const fill = props.white ? 'white' : 'white'
    const [{ isOver }, drop] = useDrop({
      accept: 'issue',
      drop: (item) =>{
        console.log(item)
        props.handleChange(props.filterSprint._id, item.issue._id)
      },
      collect: monitor => ({
        isOver: !!monitor.isOver(),
      }),
    })
    console.log(item)
        return (
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                padding: '15px 0px',
                backgroundColor: '#B3C6E6',
            }}>
            
              <div ref={drop} style={{position: 'relative',width: '100%',height: '100%',}} >
                <div style={{ backgroundColor: fill, width: '100%',
                height: '100%', border: '1px black solid',
                borderRadius: '12px'}} >
                      {item}
                </div>
                {isOver && (
                  <div  style={{position: 'absolute',top: 0,left: 0,height: '100%',width: '100%',zIndex: 1,
                        opacity: 1,border: '4px black dotted',backgroundColor: 'whitesmoke',}}
                  />
                )}
              </div>
            </div>
        );
}

export default WrapperDrop;