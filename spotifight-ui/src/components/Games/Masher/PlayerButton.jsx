import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';
import "./PlayerButton.scss";
import Subheader from 'material-ui/List/ListSubheader';
import Particle from './particles/Particles.jsx'

const classes = {
  image: "PlayerButton-image-190",
  imageBackdrop: "PlayerButton-imageBackdrop-193",
  imageButton: "PlayerButton-imageButton-191",
  imageMarked: "PlayerButton-imageMarked-195",
  imageSrc: "PlayerButton-imageSrc-192",
  imageTitle: "PlayerButton-imageTitle-194",
  root: "PlayerButton-root-189"
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%'
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100
    },
    '&:hover': {
      zIndex: 1
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15
    },
    '&:hover $imageMarked': {
      opacity: 0
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor'
    }
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%'
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity')
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity')
  }
});

const images = [
  {
    url: '/static/images/grid-list/breakfast.jpg',
    title: 'Breakfast',
    width: '40%'
  }, {
    url: '/static/images/grid-list/burgers.jpg',
    title: 'Burgers',
    width: '30%'
  }, {
    url: '/static/images/grid-list/camera.jpg',
    title: 'Camera',
    width: '30%'
  }
];

class PlayerButton extends Component {

  constructor(props) {
    super(props)
    this.state = {
      score: this.props.player.score,
      scoreDisplay: 0,
      player: this.props.player.userName,
      socket: this.props.socket
    }

    this.clearGameBoard = this.clearGameBoard.bind(this);
    this.buildGameBoard = this.buildGameBoard.bind(this);

    this.props.socket.on('displayUpdate', data => {
      if (this.state.player = data.player) {
        this.setState({
          scoreDisplay: data.score[this.props.player.username]
        });
      }
    });

  }

  clearGameBoard() {
    this.props.socket.emit('clearBoard', {})
  }

  buildGameBoard() {
    this.props.socket.emit('buildBoard', {
      localUser: this.props.player.userName,
      score: this.state.score
    });
  }

  componentWillMount() {
    this.clearGameBoard();
  }

  componentDidMount() {
    this.buildGameBoard();
  }

  updateScore() {
    let socket = this.state.socket;
    this.props.socket.emit('updateScore', {localUser: this.props.player.username});
  }

  render(props) {
    return (<div className="btn-div">
      <Particle  />
      <Subheader>{this.props.player.username}</Subheader>
      <button className="btn draw-border" onClick={() => this.updateScore()} >{this.state.scoreDisplay}</button>
    </div>);
  }
}

export default withStyles(styles)(PlayerButton);
