import React from 'react'

import ActiveSprintContainer from './ActiveSprint/ActiveSprintContainer'

export default function UI({idproject}) {

    return (
        <div >
            <div container spacing={0}>
                <ActiveSprintContainer idproject={idproject}/>
            </div>
        </div>
    )

  
}