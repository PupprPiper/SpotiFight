import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
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

function ButtonGrid(props) {

  {

  }

  const {classes} = props;

  return (<div className={classes.root}>
    <Grid container spacing={24}>

      {
        props.players.map((player) => {
          return (<Grid align="center" key={player.username}  item xs={6}>
            <Paper className={`${classes.paper}`} style={{ minWidth: '110px', maxWidth:'300px' }}>
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
