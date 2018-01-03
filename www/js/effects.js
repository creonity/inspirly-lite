function Particle( x, y, radius ) {
	this.init( x, y, radius );
}

Particle.prototype = {

	init: function( x, y, radius ) {

		this.alive = true;

		this.radius = radius || 10;
		this.wander = 0.15;
		this.theta = random( TWO_PI );
		this.drag = 0.92;
		this.color = '#fff';

		this.x = x || 0.0;
		this.y = y || 0.0;

		this.vx = 0.0;
		this.vy = 0.0;
	},

	move: function() {

		this.x += this.vx;
		this.y += this.vy;

		this.vx *= this.drag;
		this.vy *= this.drag;

		this.theta += random( -0.5, 0.5 ) * this.wander;
		this.vx += sin( this.theta ) * 0.1;
		this.vy += cos( this.theta ) * 0.1;

		this.radius *= 0.96;
		this.alive = this.radius > 0.5;
	},

	draw: function( ctx ) {

		ctx.beginPath();
		ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
		ctx.fillStyle = this.color;
		ctx.fill();
	}
};

// ----------------------------------------
// Example
// ----------------------------------------


function add_effect()
{
swipe_effect.setup = function() {

	// Set off some initial particles.
	var i, x, y, start_y;

	for ( i = 0; i < 20; i++ ) {
		x = ( swipe_effect.width * 0.5 ) + random( -100, 100 );
		y = ( swipe_effect.height * 0.5 ) + random( -100, 100 );
		swipe_effect.spawn( x, y );
	}
};

swipe_effect.spawn = function( x, y, direction ) {

	if ( particles.length >= MAX_PARTICLES )
		pool.push( particles.shift() );

	particle = pool.length ? pool.pop() : new Particle();
	particle.init( x, y, random( 5, 40 ) );

	particle.wander = random( 0.5, 2.0 );
if(direction==0){particle.color = random(['rgba(135, 135, 135,0.73)','rgba(183, 183, 183,0.12)','rgba(221, 221, 221,0.9)','rgba(206, 206, 206,0.12)','rgba(244, 244, 244,0.27)','rgba(211, 211, 211,0.21)','rgba(226, 226, 226,0.71)','rgba(216, 216, 216,0.65)','rgba(206, 206, 206,0.36)','rgba(130, 1, 14,0.46)','rgba(160, 25, 1,0.17)','rgba(142, 21, 12,0.06)','rgba(140, 22, 1,0.62)','rgba(153, 14, 12,0.44)','rgba(145, 13, 19,0.32)','rgba(178, 14, 71,0.11)','rgba(147, 2, 15,0.81)','rgba(181, 15, 7,0.7)']);}
if(direction==1){	particle.color = random(['rgba(211, 192, 21,0.78)','rgba(255, 230, 94,0.29)','rgba(239, 234, 93,0.56)','rgba(211, 180, 25,0.15)','rgba(234, 237, 71,0.42)','rgba(252, 249, 98,0.88)','rgba(218, 224, 53,0.57)','rgba(237, 237, 14,0.08)','rgba(222, 224, 92,0.79)','rgba(132, 1, 5,0.4)','rgba(242, 72, 137,0.51)','rgba(237, 92, 126,0.34)','rgba(173, 64, 24,0.81)','rgba(178, 42, 67,0.83)','rgba(226, 43, 119,0.65)','rgba(206, 29, 26,0.31)','rgba(221, 19, 36,0.28)','rgba(214, 87, 92,0.08)']);}

	particle.drag = random( 0.9, 0.99 );

	theta = random( TWO_PI );
	force = random( 2, 8 );

	particle.vx = sin( theta ) * force;
	particle.vy = cos( theta ) * force;

	particles.push( particle );
}

swipe_effect.update = function() {

	var i, particle;

	for ( i = particles.length - 1; i >= 0; i-- ) {

		particle = particles[i];

		if ( particle.alive ) particle.move();
		else pool.push( particles.splice( i, 1 )[0] );
	}
};

swipe_effect.draw = function() {

	swipe_effect.globalCompositeOperation  = 'lighter';

	for ( var i = particles.length - 1; i >= 0; i-- ) {
		particles[i].draw( swipe_effect );
	}
};


swipe_effect.mousedown = function() {
		touch = swipe_effect.touches[0];
    start_y = touch.y;
}

swipe_effect.mousemove = function() {
	var particle, theta, force, touch, max, i, j, n;
		touch = swipe_effect.touches[0];
if(start_y-touch.y>(image_width/10) && Math.abs(touch.dy)>3 && Math.abs(touch.dx)<1)
{
minus = 3-Math.abs(touch.dy);minus = minus < 0 ? 0 : minus;
max = (start_y-touch.y)/(image_width/3)-minus;
max = max < 0 ? 0 : Math.round(max)*streak;
for ( j = 0; j < max; j++ ){swipe_effect.spawn( touch.x, touch.y, 1 );}
}

else if(touch.y-start_y>(image_width/10) && Math.abs(touch.dy)>3 && Math.abs(touch.dx)<1)
{
minus = 3-Math.abs(touch.dy);minus = minus < 0 ? 0 : minus;
max = (touch.y-start_y)/(image_width/3)-minus;
max = max < 0 ? 0 : Math.round(max)*streak;
for ( j = 0; j < max; j++ ){swipe_effect.spawn( touch.x, touch.y, 0 );}
}


};
}