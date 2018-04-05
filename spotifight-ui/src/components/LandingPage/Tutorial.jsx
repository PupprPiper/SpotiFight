import React, {Component} from 'react';
import Carousel from 'nuka-carousel';
import './Tutorial.scss'

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
      // slideWidth={0.8}
      slidesToShow={1}
      cellSpacing={500}
      margin="200px"


    renderBottomCenterControls={false}

      >
        <img src="https://i.imgur.com/5gO6hun.png"/>
        <img src="https://i.imgur.com/SrHaZAQ.png"/>
        <img src="https://i.imgur.com/yRDFFS3.png"/>
      </Carousel>

    </div>);
  }

}
