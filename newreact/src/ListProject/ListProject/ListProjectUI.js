import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash'
import '../ListProject/style.css'
import SpringModal from '../SpringModal';
import Avatar from '@material-ui/core/Avatar';
import Toast from '../../Components/Toast'
import ModalAddMember from '../../Project/ConfigProject/AddMember/ModalAddMember';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Search from './Search';

const useStyles = makeStyles(theme => ({
  container_wr: {
    background: '#F2F2F2'
  },
  card: {
    maxWidth: 345,
    width: 285,
    height: 352,
    marginTop: 22,
    border: '1px solid cornflowerblue',
    textAlign: 'left',
    position: "relative",
    boxShadow: '0px 2px 10px 1px rgba(0, 0, 0, 0.13)',
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

export default function ListProjectUI(props) {
  const classes = useStyles();
  return (
    <Grid container className={classes.container_wr}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <div>
      <h4 style={{ margin: '40px'}}>Project list and Create </h4>
      </div>
      <Search findProjectLikeName={props.findProjectLikeName} ViewListProject={props.ViewListProject}/>
      </div>
     
    <Grid container direction="row" spacing={3} justify="center" alignItems="center">
      <Card className={classes.card} style={{ height: '357px', position: 'relative', borderStyle: 'dashed' }}>
        <CardHeader />
        <CardContent>
          <div className='text'>
            <SpringModal />
          </div>

        </CardContent>
      </Card>
      {
        _.map(props.listproject, (item, index) => {
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
                  subheader={item.datecreate.slice(0, 10)}
                />
                <div className='under-line'><span></span></div>
                <Typography variant="body2" color="textSecondary" component="p" style={{ marginLeft: '15px' }}>
                  {!_.isEmpty(item.description) ? item.description : 'not decription'}
                </Typography>


                <CardContent>
                  <div className='row'>
                    <div className='col-md-12' style={{ marginBottom: '20px'}}>
                      <div className='row'>
                      <div className='col-md-6'><span>Change user</span></div>
                    <div className='col-md-6' style={{ textAlign: 'right'}}>
                      <ModalAddMember 
                      AddMemberToProject={props.AddMemberToProject}
                      findUserLikeEmail={props.findUserLikeEmail}
                      auth={props.auth}
                      idProject={item._id} />
                    </div>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <ul style={{display: 'flex', width: '120px'}}>
                      {
                        _.map(item.idmembers, (child, index) => {
                          return <Fragment>
                          { index < 2 &&
                          <li>
                          <AvatarGroup max={4}>
                            <Avatar className={classes.large} ></Avatar>
                          </AvatarGroup>
                          </li>
                          }
                          </Fragment>
                        })
                      }
                      { item.idmembers.length > 2 && <span style={{ marginLeft: '10px'}}>{item.idmembers.length - 2}<i class="fas fa-plus"></i></span>}
                      </ul>
                    </div>
                    <div className='col-md-6'>
                      <div className='status_project'>
                      {
                        _.isEqual(item.process[item.process.length -1], 'in process') && 
                         <Fragment>
                         <i class='fa icon-dot fa-circle custom_1'/>
                        <span>{item.process[item.process.length - 1]} </span>
                         </Fragment>
                      }
                      {
                        _.isEqual(item.process[item.process.length -1], 'done') && 
                         <Fragment>
                         <i class='fa icon-dot fa-circle custom_2'/>
                        <span>{item.process[item.process.length - 1]} </span>
                         </Fragment>
                      }
                      {
                        _.isEqual(item.process[item.process.length -1], 'todo') && 
                         <Fragment>
                         <i class='fa icon-dot fa-circle custom_3'/>
                        <span>{item.process[item.process.length - 1]} </span>
                         </Fragment>
                      }
                      {
                        _.isEqual(item.process[item.process.length -1], 'review') && 
                         <Fragment>
                         <i class='fa icon-dot fa-circle custom_4'/>
                        <span>{item.process[item.process.length - 1]} </span>
                         </Fragment>
                      }
                        {/* <i class={`fa icon-dot fa-circle ${item.process[item.process.length - 1] === 'todo' ? 'custom_1' : (item.process === 'done' ? 'custom_2' : (item.process === 'in process' ? 'custom_3' : 'custom_4'))}`}></i>
                        {item.process[item.process.length - 1]} */}
                      </div>
                    </div>
                  </div>
                </CardContent>

              </Card>
              <Toast open={props.note.show} message={props.note.message} type={props.note.type} />
            </Grid>
          )
        })
      }
    </Grid>
    </Grid>
  );
}