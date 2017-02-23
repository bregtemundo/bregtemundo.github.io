(function ($) {
  $(document).ready(function () {

    //load video
    var videoPlayer = null;
    videojs('video').ready(function () {     
        videoPlayer = this;
        videoPlayer.src({type: 'video/mp4', src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'});
        //videoPlayer.src({type: 'video/webm', src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm'});
        
    });

    //fix ios video
    var video = document.getElementById('video');
    window.enableInlineVideo(video, {iPad: true});

    // init controls
  	var controlLayer = document.getElementById('control-layer');

  	var hammertime = new Hammer(controlLayer);
  	hammertime.on('tap', function(ev) {  		
      videoPlayer.play();
  	});

    hammertime.on('swipe', function(ev) {    
      videoPlayer.src({type: 'video/mp4', src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_2mb.mp4'}); 
      videoPlayer.play();
    });



  });
})(jQuery);


