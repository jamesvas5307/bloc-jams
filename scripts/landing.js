  var pointsArray = document.getElementsByClassName("point");
  function revealPoint (point){
   point.style.opacity = 1;
   point.style.transform = "scaleX(1) translateY(0) rotate(0deg)";
   point.style.msTransform = "scaleX(1) translateY(0) rotate(0deg)";
   point.style.Webkitransform = "scaleX(1) translateY(0) rotate(0deg)";
 }
  function animatePoints(points){
    forEach(points,revealPoint);
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