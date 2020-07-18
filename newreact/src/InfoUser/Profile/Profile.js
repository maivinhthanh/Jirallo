import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

function Profile(props) {
    const classes = useStyles();
    const { infouser } = props
        return (
            <div className='profile_wrapper'>
                <div className='content_profile'>
                <Grid container spacing={3}>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                    <div className='wrapper_total'>
                    <div className='wrapper-avatar' >
                <Avatar style={{ width: 100, height: 100}} src="https://64.media.tumblr.com/avatar_76339a619be6_128.pnj" />
                </div>
                <div className='info-content'>
                    <p>Name: <span>{infouser.name}</span></p>
                    <p>Email: <span>{infouser.email}</span></p>
                    <p>Gender: <span>{infouser.gender }</span></p>
                </div>
                </div>
                </Grid>
                <Grid item xs={4}>
                    <div className='list-icon'>
                    <ul>
                        <li><i className="fab fa-facebook" aria-hidden="true"></i></li>
                        <li><i className="fab fa-twitter" aria-hidden="true"></i></li>
                        <li> <i className="fab fa-instagram" aria-hidden="true"></i></li>
                        <li> <i className="fab fa-pinterest-p" aria-hidden="true"></i></li>
                    </ul>
                    </div>
                </Grid>
                </Grid>
            </div>
            </div>
        )
}

const mapStateToProps = (state) => {
    return {
        infouser: state.infouser
    }
}

export default connect(mapStateToProps, null)(Profile)
