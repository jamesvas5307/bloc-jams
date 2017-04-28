  function animatePoints(){
      var points = document.getElementsByClassName("point");
      function revealPoint (){
      for(var i=0; i < points.length; i++){
      points[i].style.opacity = 1;
      points[i].style.transform = "scaleX(1) translateY(0) rotate(0deg)";
      points[i].style.msTransform = "scaleX(1) translateY(0) rotate(0deg)";
      points[i].style.Webkitransform = "scaleX(1) translateY(0) rotate(0deg)"
    }
    }


  revealPoint();

  }
