import $ from 'jquery';

const animate = () => {
  console.log('masher animate fires')


$(".masher-counter").hide( 0, function() {
        $(".masher-counter").show();
      });
}

module.exports = {
  animate

}
