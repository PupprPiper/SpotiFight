
import React, { Component } from 'react';
import './Arrow.scss';
import $ from "jquery";

class Arrow extends Component {
  constructor(props) {
    super(props)
this.state={
}

$(window).scroll(function() {
    if ($(this).scrollTop() > 500) { //use `this`, not `document`
        $('.arrow').css({
            'display': 'none'
        });
        $('.landing-title').css({
            'opacity': '0'
        });
        $('.logo').css({
            'opacity': '0'
        });
    } else if ($(this).scrollTop() < 500) { //use `this`, not `document`
          $('.arrow').css({
              'display': 'inline'
          });
          $('.landing-title').css({
              'opacity': '1'
          });
          $('.logo').css({
              'opacity': '1'
          });
    }
});




  }




  scrollPage () {

    $('html, body').animate({
        scrollTop: 800
    },800);


  }


  render() {
    return (
      <div onClick={()=> this.scrollPage()}
       className="arrow bounce">
      </div>
    );
  }
}

export default Arrow;
