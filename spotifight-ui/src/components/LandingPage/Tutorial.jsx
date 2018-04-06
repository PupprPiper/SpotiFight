import React, {Component} from 'react';
import Carousel from 'nuka-carousel';
import './Tutorial.scss';
import Best from './images/best_your_friends.png';
import Start from './images/start_a_party.png';
import PlaySong from './images/play_your_song.png';

export default class Tutorial extends Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (<div className="tutorial">
      <Carousel
      className="carousel" id="tutorial"
      cellAlign="center"
      slideWidth={0.8}
      slidesToShow={1}
      cellSpacing={500}
      margin="200px"
      renderBottomCenterControls={false}
      >
        <img src={Start}/>
        <img src={Best}/>
        <img src={PlaySong}/>
      </Carousel>

    </div>);
  }

}
