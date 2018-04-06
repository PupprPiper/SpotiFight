import $ from 'jquery';

const animate = () => {



$(".gameroom-counter").hide( 0, function() {
        $(".gameroom-counter").show();
      });
}

module.exports = {
  animate

}
