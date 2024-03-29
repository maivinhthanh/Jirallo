import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {Row, Col} from "antd";
import _ from 'lodash'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginLeft: '35px',
    '& > *': {
      marginLeft: theme.spacing(6),
      marginRight: theme.spacing(6),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function ImageAvatars({listMember,selectUser}) {
  const classes = useStyles();

  return (
    <Row gutter={16}>
      {
        _.map(listMember, (item,index) =>{
          return(
            <Col xs={4} sm={4} key={index} onClick={()=>selectUser(item.id?item.id._id:item._id, index, item.active)} 
              style={item.active ? { backgroundColor :'#6A8DCD'}:{}}>
               {
                _.get(item, ['id', 'image'])
                ? <Avatar alt={ _.get(item, ['id', 'name'])} src={'/image/'+_.get(item, ['id', 'image'])} 
                    className={classes.large}  />
                : <Avatar alt={ _.get(item, ['id', 'name'])} src="images/logo-login.jpg" />
                 
              }
              <p> { _.get(item, ['id', 'name']) && _.get(item, ['id', 'name']).split(' ').pop()} </p>
            </Col>
            
          )
          
        })
      }
      
    </Row>
  );
}
