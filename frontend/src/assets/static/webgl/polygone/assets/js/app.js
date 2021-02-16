var isFullscreen = false;

// update canvas size
var refreshCanvas = function(){
  var newHeight = $( ".webgl-content" ).height();
  var newWidth = (9/16) * newHeight;
  $("#unityContainer").width(newWidth);
  $("#unityContainer").height(newHeight);
};

$(function() {
  // scale canvas correctly once on start
  refreshCanvas();
});

// on window resize, apply width to game
$( window ).resize(function() {
  refreshCanvas();
});

// check for fullscreen toggle
$(document).keydown(function(event) {
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(keycode == '70'){
    if (!isFullscreen) {
      unityInstance.SetFullscreen(1);
      isFullscreen = true;
    }
    else {
      unityInstance.SetFullscreen(0);
      isFullscreen = false;
    }
  }
});
