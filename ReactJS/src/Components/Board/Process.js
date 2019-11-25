import React from 'react'
import { useDrop } from 'react-dnd'
import _ from 'lodash'
import CallApi from '../../until/apiCaller';

export default function Process({ black, process, children ,handleChange}) {
  let item = children[1]
  const fill = black ? 'black' : 'white'
  const [{ isOver }, drop] = useDrop({
    accept: 'issues',
    drop: (item) =>{
      handleChange(item.id._id, process)
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })
  return (
    <div className="row"
    ref={drop}
    style={{
        position: 'relative',
        width: '100%',
        height: '100%',
    }} 
    >
      <div style={{ backgroundColor: fill, width: '100%',
      height: '100%', border: '1px black solid',
      borderRadius: '12px'}} >
          {
            item
          }
      </div>
      {isOver && (
                <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'yellow',
                }}
                />
        )}
    </div>
  )
}