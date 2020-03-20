import React, {useRef, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
        position: 'relative'
      },
    },

}));

export default function UI({idproject}) {
    const classes = useStyles();
        
    return (
        <div>
            <div className="row">
              <h1>Not found project's report </h1>
              <Button variant="contained" color="primary" >
                Add
              </Button>
              
            </div>
        </div>
    )

  
}