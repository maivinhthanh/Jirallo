import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ListProjectUI(listproject, gotoProject) {
  const classes = useStyles();
  
  console.log(listproject.listproject)
  return (
    <Grid container direction="row" spacing={3} justify="center" alignItems="center">
        {
          _.map(listproject.listproject, (item, index)=>{
            return (
              <Grid item cols={3} key={index}>
                <Card className={classes.card}>
                  <CardHeader
                    
                    action={
                      <Link to={{ pathname: `/backlog/${item._id}` }} >
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      </Link>
                    }
                    title={item.name}
                    subheader={item.datecreate}
                  />
                  <CardMedia
                    className={classes.media}
                    image="/static/images/cards/paella.jpg"
                    title="Logo"
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {item.description}
                    </Typography>
                  </CardContent>
                  
                </Card>
              </Grid>
            )
          })
        }
    </Grid>
  );
}