function html2dom( html ) {

var container = document.createElement('div');
container.innerHTML = html;
return container.firstChild;
}

$.fn.animateCss = function (animationName) {
	var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	$(this).addClass('animated ' + animationName).one(animationEnd, function() {
		$(this).removeClass('animated ' + animationName);
	});
}

$.fn.toggleAnimation = function()
{
	console.log("toggle animation for class : " + $(this).attr('class'));
	var classes = $(this).attr('class').split(" ");
	for(var i=0; i<classes.length; i++){
	  if(classes[i].indexOf("InLeft") >= 0)
	  {
	  	$(this).removeClass(classes[i]);
	  	$(this).addClass(classes[i].replace("InLeft", "OutLeft"));
	  	console.log("toggle class : " + classes[i]);
	  }
	  else if(classes[i].indexOf("InRight") >= 0)
	  {
	  	$(this).removeClass(classes[i]);
	  	$(this).addClass(classes[i].replace("InRight", "OutRight"));
	  	console.log("toggle class : " + classes[i]);
	  }
	  else if(classes[i].indexOf("OutLeft") >= 0)
	  {
	  	$(this).removeClass(classes[i]);
	  	$(this).addClass(classes[i].replace("OutLeft", "InLeft"));
	  	console.log("toggle class : " + classes[i]);
	  }
	  else if(classes[i].indexOf("OutRight") >= 0)
	  {
	  	$(this).removeClass(classes[i]);
	  	$(this).addClass(classes[i].replace("OutRight", "InRight"));
	  	console.log("toggle class : " + classes[i]);
	  }
	  else if(classes[i].indexOf("InUp") >= 0)
	  {
	  	$(this).removeClass(classes[i]);
	  	$(this).addClass(classes[i].replace("InUp", "OutDown"));
	  	console.log("toggle class : " + classes[i]);
	  }
	  else if(classes[i].indexOf("InDown") >= 0)
	  {
	  	$(this).removeClass(classes[i]);
	  	$(this).addClass(classes[i].replace("InDown", "OutUp"));
	  	console.log("toggle class : " + classes[i]);
	  }
	  else if(classes[i].indexOf("OutDown") >= 0)
	  {
	  	$(this).removeClass(classes[i]);
	  	$(this).addClass(classes[i].replace("OutDown", "InUp"));
	  	console.log("toggle class : " + classes[i]);
	  }
	  else if(classes[i].indexOf("OutUp") >= 0)
	  {
	  	$(this).removeClass(classes[i]);
	  	$(this).addClass(classes[i].replace("OutUp", "InDown"));
	  	console.log("toggle class : " + classes[i]);
	  }
	  else if((classes[i]+" ").indexOf("Out ") >= 0)
	  {
	  	$(this).removeClass(classes[i]);
	  	$(this).addClass(classes[i].replace("Out", "In"));
	  	console.log("toggle class : " + classes[i]);
	  }
	  else if((classes[i]+" ").indexOf("In ") >= 0)
	  {
	  	$(this).removeClass(classes[i]);
	  	$(this).addClass(classes[i].replace("In", "Out"));
	  	console.log("toggle class : " + classes[i]);
	  }
	}
}