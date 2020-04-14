import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import SpringModal from '../SpringModal'
import _ from 'lodash'

const useStyles = makeStyles(theme => ({
    main: {
        backgroundColor: '#6A8DCD',
        height: '60px'
    },
    root: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 8
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

export default function HeaderUI(props) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [projectName, setProject] = React.useState('');

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (e) => {
        setProject(e.target.value)
    }
    
    const handleSearchProject = () => {
        const { handleSearch, ViewListProject } = props
        
        if (!_.isEmpty(projectName)) {
            let filter = _.filter(props.listproject, (item) => item.name === projectName.replace(/\s/g, '') )
            if (!_.isEmpty(filter)) {
                handleSearch(filter[0]._id)
            }
            else {
                ViewListProject()
            }
        }
        else {
            ViewListProject()
        }
    }
  

    return (
        <div className={classes.main} >
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <Paper component="form" className={classes.root}>
                        <InputBase
                            value={projectName}
                            onChange={handleChange}
                            className={classes.input}
                            placeholder="Search Project"
                            inputProps={{ 'aria-label': 'Search Project' }}
                        />
                        <IconButton onClick={handleSearchProject} type="button" className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={6}style={{textAlign: 'right', paddingRight: '20px'}} >
                    <SpringModal/>
                </Grid>
            </Grid>
        </div>
    )

}