import React from 'react'
import InputBase from '@material-ui/core/InputBase'
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { IconButton } from '@material-ui/core'
import _ from 'lodash'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    top: '35px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 0
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))
export default function Search(props) {
  const classes = useStyles()
  const [value, setValue] = React.useState()


  const handleChangeInput = (e) => {
    setValue(e.target.value)
    if(_.isEmpty(e.target.value)){
      props.ViewListProject()
    }
  }

  const handleSearch = () => {
    props.findProjectLikeName(value)
  }

  return (
        <div className={classes.search}>
            <InputBase
                placeholder="Tìm kiếm…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={handleChangeInput}
                inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton className={classes.iconButton} aria-label="search" onClick={handleSearch}>
              <SearchIcon />
             </IconButton>
        </div>
  )
}
