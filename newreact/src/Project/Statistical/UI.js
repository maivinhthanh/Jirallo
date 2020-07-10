import React from 'react'

import StatisticalContainer from './StatisticalContainer/StatisticalContainer'

export default function UI({idproject}) {

    return (
        <div >
            <div container spacing={0}>
                <StatisticalContainer idproject={idproject}/>
            </div>
        </div>
    )

  
}