import React, { Component } from 'react';
import { useDrop } from 'react-dnd'
function WrapperDrop(props) {
    let item = props.children[1]
    // let item = props.children[1]
    // const fill = props ? 'black' : 'white'
    const [{ isOver }, drop] = useDrop({
      accept: 'issue',
      drop: (item) =>{
        console.log(item)
        //handleChange(item.id._id, process)
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
                backgroundColor: '#B3C6E6',
            }}>
              <div style={{fontSize: '30px'}}>
                <b>sad</b>
              </div>
              <div ref={drop} style={{position: 'relative',width: '100%',height: '100%',}} >
                <div style={{ backgroundColor: 'black', width: '100%',
                height: '100%', border: '1px black solid',
                borderRadius: '12px'}} >
                      ABC
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