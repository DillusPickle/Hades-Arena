const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

var JumpCount = 0;

function controller(sprite, accel){
	if(keyDown("a")){
		sprite.velocityX -= accel;
	}
	else if(keyDown("d")){
		sprite.velocityX += accel;
	}
	else{
		sprite.velocityX = 0;
	}

	if (keyDown("w")&&JumpCount === 1){
		sprite.velocityY = -12;
		JumpCount = 0;
	}

	if (keyWentDown("space")){
		var Knife = loadImage("Knife.png")
		var knife = createSprite(sprite.x,sprite.y,40,10);
		knife.attractionPoint(12,mouseX,mouseY);
		knife.addImage(Knife);
		knife.scale = 3;
		knife.rotateToDirection = true;

		Knifes.add(knife);
	}
}

function Ground(){
	JumpCount = 1;
}