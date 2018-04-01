
import React, { Component } from 'react';
import './Arrow.scss';
import $ from "jquery";

class Arrow extends Component {
  constructor(props) {
    super(props)
this.state={
}

$(window).scroll(function() {
    if ($(this).scrollTop() > 150) { //use `this`, not `document`
        $('.arrow').css({
            'display': 'none'
        });
    } else if ($(this).scrollTop() < 150) { //use `this`, not `document`
          $('.arrow').css({
              'display': 'inline'
          });
    }
});




  }




  scrollPage () {
    console.log('clickity click')
    $('html, body').animate({
        scrollTop: 500
    },1200);


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
