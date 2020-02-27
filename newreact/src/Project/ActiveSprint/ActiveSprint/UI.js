import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash'

import Process from './Process'
import Issues from './Issues'

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100%',
      },
      
    },
    process:{
      height: '500px',
    }
}));

export default function UI({idproject, project, listissues, ChangeProcessIssue}) {
    const classes = useStyles();
    let numberColumn = 12 / Number.parseInt(project.process.length)
    if(numberColumn < 3){
      numberColumn = 3
    }
    return (
        <Grid className={classes.root}>
            <Grid container spacing={2}>
              {
                _.map(project.process, (ip, idp) =>{
                  return(
                      <Grid item className={classes.process} xs={numberColumn} key={idp}>
                        <Process white process={ip} handleChange={(id, process) => ChangeProcessIssue(id, process)} >
                            {
                                _.map(listissues, (item, index)=>{
                                    if(item.process === ip){
                                        return (
                                            <Issues info={item} key={index}/>
                                        )
                                    }
                                    
                                })
                            }
                        </Process>
                      </Grid>
                  )
                })
              }
              
            </Grid>
        </Grid>
    )

  
}