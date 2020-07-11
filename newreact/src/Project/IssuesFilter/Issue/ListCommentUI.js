import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash'
import { Comment, Avatar } from 'antd';
import moment from "moment";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  wrapComment :{
    position: "relative",
    height: "50px",
    margin: "10px 0px"
  },
  avatarComment:{
    position: "absolute"
  },
  nameComment:{
    fontWeight: "bold",
  },
  contendComment:{
    wordBreak: "break-all",
  },
  wrapContentComment:{
    position: "absolute",
    left: "10%",
    top: "6%",
    backgroundColor: "whitesmoke",
    width: "85%",
    borderRadius: "30px",
    padding: "3px 25px",
  }
}));

export default function ListCommentUI({listcomment}) {
  const classes = useStyles();
  return (
    <div>
      
      <div className={classes.margin}>
        {
          listcomment.length !== 0 ?
          _.map(listcomment, (item, index)=>{
            return(
              <Comment
                author={<h6>{item.author.name}</h6>}
                avatar={
                  <Avatar
                    src={item.author.image}
                    alt={item.author.name}
                  />
                }
                content={
                  <p>{item.content}</p>
                }
                datetime={
                  <span>{moment(item.datecreate).fromNow()}</span>
                }
              />
              
            )
          })
          :<div></div>
        }
        
        
      </div>
    </div>
  );
}