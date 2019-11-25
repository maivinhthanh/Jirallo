import React from 'react'
import { useDrag } from 'react-dnd'

export default function Issues({ name }) {
  const [{isDragging}, drag] = useDrag({
    item: { type: 'issues', id: name },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
  })
  return (
      <div ref={drag}
        style={{
          opacity: isDragging ? 1 : 1,
          fontSize: 25,
          fontWeight: 'bold',
          cursor: 'move',
          border: '1px solid',
          margin: '12px',
          borderRadius: '12px'
        }}>
          <h4>{name.name}</h4>
          <h4>{name.process}</h4>
      </div>
  )
}