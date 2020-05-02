import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Avatar } from "@material-ui/core";
import '../assets/styles.css'
// import Topbar from "./TopBar";

const useStyles1 = makeStyles({
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100
  },
});
export default class HeaderUser extends Component {
  render() {
    return (
      <div>
        <Grid container className='wrapper'>
            <Grid xs={8}>

            </Grid>
          <Grid xs={4}>
          {/* <Topbar/> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}
