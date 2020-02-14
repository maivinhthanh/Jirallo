import React from 'react'
import { useDrop } from 'react-dnd'
import _ from 'lodash'

export default function Process({ black, process, children, handleChange }) {
  let item = children
  const fill = black ? 'black' : 'white'
  const [{ isOver }, drop] = useDrop({
    accept: 'issues',
    drop: (item) => {
      console.log(item)
      handleChange(item.id._id, process)
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
      <div style={{ fontSize: '30px' }}>
        <b>{process}</b>
      </div>
      <div ref={drop} style={{ position: 'relative', width: '100%', height: '100%', }} >
        <div style={{
          backgroundColor: fill, width: '100%',
          height: '100%', border: '1px black solid',
          borderRadius: '12px'
        }} >
          {
            item
          }
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
  )
}