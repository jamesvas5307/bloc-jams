  var pointsArray = document.getElementsByClassName("point");
  function animatePoints(points){
  function revealPoint (){
    for(var i=0; i < points.length; i++){
      points[i].style.opacity = 1;
      points[i].style.transform = "scaleX(1) translateY(0) rotate(0deg)";
      points[i].style.msTransform = "scaleX(1) translateY(0) rotate(0deg)";
      points[i].style.Webkitransform = "scaleX(1) translateY(0) rotate(0deg)";
      }
    }
    revealPoint();

  }

  window.onload = function(){
    if(window.innerHeight > 950){
      animatePoints(pointsArray);
    }
    var sellingPoints = document.getElementsByClassName("selling-points")[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    window.addEventListener('scroll',function(event){
      if(document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance){
        animatePoints(pointsArray);
      }
  }
);
};
