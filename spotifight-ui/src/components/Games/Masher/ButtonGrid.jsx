import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PlayerButton from './PlayerButton';
import './ButtonGrid.scss';
import players from './seed.js'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,

  }
});

const inLine = { minWidth: '200px', maxWidth:'200px', maxWidth:'200px', 'textAlign' : 'center' }

function ButtonGrid(props) {

  {

  }

  const {classes} = props;

  return (<div className={classes.root}>
    <Grid container spacing={24}>

      {
        props.players.map((player) => {
          return (<Grid align="center" key={player.username}  item xs={12} sm={3}>
            <Paper className={`${classes.paper}`} style={inLine}>
                <img src={player.avatar_url} className="buttonCard" />
              <PlayerButton player={player} socket={props.socket}/>
            </Paper>
          </Grid>)
        })
      }

    </Grid>
  </div>);
}

ButtonGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonGrid);
