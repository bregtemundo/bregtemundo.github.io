(function ($) {
  $(document).ready(function () {

    //load video
    var videoPlayer = null;
    videojs('video').ready(function () {     
        videoPlayer = this;
        videoPlayer.src({type: 'video/mp4', src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'});
        videoPlayer.src({type: 'video/webm', src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm'});
        
    });

    // init controls
  	var controlLayer = document.getElementById('control-layer');

  	var hammertime = new Hammer(controlLayer);
  	hammertime.on('swipe', function(ev) {
  		console.log(ev);
      videoPlayer.play();
  	});



  });
})(jQuery);


