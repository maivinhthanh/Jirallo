import React from 'react'
export const IssueContext = React.createContext({
    contextIssue : ''
})
export const DataBeforeDrag = React.createContext({
    reload: () => {}
})