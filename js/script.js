$(function() {

	$("#me-container").backstretch("images/French_Forest_Path.jpg");

	$(document).ready(function () {
		var length = 4;
	    var time = 0;
	    for (i=1; i <= length; i++){        
	        setTimeout("$('#quote" + i + "').fadeIn(1000)", time+2000);
	        time += 2000; 
	    }
	});

	// Scroll Down
	function scrollDown (item) {
		$('html, body').animate({
		    scrollTop: $(item).offset().top
		}, 1000);
	}

	$("#first-down").on('click', function (){
		scrollDown("#me-container");
	});

	$("#second-down").on('click', function(){
		scrollDown("#skills-container");
	});

	$("#third-down").on('click', function(){
		scrollDown("#projects-view");
	});

	//BUBBLES ANIMATION FROM TYMPANUS.NET

/*
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

	// MIT license

	(function() {
	    var lastTime = 0;
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
	            || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }

	    if (!window.requestAnimationFrame)
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
	                timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };

	    if (!window.cancelAnimationFrame)
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };
	}());
*/
	(function() {

	    var width, height, skillsContainer, canvas, ctx, circles, target, animateHeader = true;

	    // Main
	    initHeader();
	    addListeners();

	    function initHeader() {
	        width = window.innerWidth;
	        height = window.innerHeight;
	        target = {x: 0, y: height};

	        skillsContainer = document.getElementById('skills-container');
	        skillsContainer.style.height = height+'px';

	        canvas = document.getElementById('bubbles');
	        canvas.width = width;
	        canvas.height = height;
	        ctx = canvas.getContext('2d');

	        // create particles
	        circles = [];
	        for(var x = 0; x < width*0.5; x++) {
	            var c = new Circle();
	            circles.push(c);
	        }
	        animate();
	    }

	    // Event handling
	    function addListeners() {
	        //window.addEventListener('scroll', scrollCheck);
	        window.addEventListener('resize', resize);
	    }

	   /* function scrollCheck() {
	        if(document.body.scrollTop > height) animateHeader = false;
	        else animateHeader = true;
	    } */

	    function resize() {
	        width = window.innerWidth;
	        height = window.innerHeight;
	        skillsContainer.style.height = height+'px';
	        canvas.width = width;
	        canvas.height = height;
	    }

	    function animate() {
	        if(animateHeader) {
	            ctx.clearRect(0,0,width,height);
	            for(var i in circles) {
	                circles[i].draw();
	            }
	        }
	        requestAnimationFrame(animate);
	    }

	    // Canvas manipulation
	    function Circle() {
	        var _this = this;

	        // constructor
	        (function() {
	            _this.pos = {};
	            init();
	        })();

	        function init() {
	            _this.pos.x = Math.random()*width;
	            _this.pos.y = height+Math.random()*100;
	            _this.alpha = 0.1+Math.random()*0.3;
	            _this.scale = 0.1+Math.random()*0.3;
	            _this.velocity = Math.random();
	        }

	        this.draw = function() {
	            if(_this.alpha <= 0) {
	                init();
	            }
	            _this.pos.y -= _this.velocity;
	            _this.alpha -= 0.0005;
	            ctx.beginPath();
	            ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
	            ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
	            ctx.fill();
	        };
    	}

	})();


});