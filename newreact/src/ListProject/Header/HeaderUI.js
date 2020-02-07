import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    main:{
        backgroundColor: '#6A8DCD',
        height: '60px'
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
        iconButton: {
        padding: 10,
    },
        divider: {
        height: 28,
        margin: 4,
    },
}));

export default function HeaderUI() {

    const classes = useStyles();

    return (
        <div className={classes.main} >
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <Paper component="form" className={classes.root}>
                        
                        <InputBase
                            className={classes.input}
                            placeholder="Search Project"
                            inputProps={{ 'aria-label': 'Search Project' }}
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
  
}