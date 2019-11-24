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
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}>
          <h4>{name.name}</h4>
          <h4>{name.process}</h4>
      </div>
  )
}