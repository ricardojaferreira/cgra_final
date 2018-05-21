
class LightingScene extends CGFscene
{
	constructor(myInterface)
	{
		super();
		this.myInterface = myInterface;
	};

	init(application)
	{
		super.init(application);

		this.initCameras();

		this.initLights();

		this.enableTextures(true);

		this.gl.clearColor(0.2, 0.6, 1.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		//Axis
		this.axis = new CGFaxis(this);

		// Materials
		this.materialDefault = new CGFappearance(this);

		//External Solids
		this.external = new SolidosExternos(this);

		//altimetry
						//	   0	   1	 2    3    4    5    6    7     8
        this.altimetry= [ 	[ 12.0 , 12.0 , 0.0, 0.0, 8.0, 8.0, 0.0, 0.0, 32.0 ],	//0
            				[ 18.0 , 18.0 , 0.0, 0.0, 8.0, 8.0, 0.0, 0.0, 32.0 ],	//1
            				[ 32.0 , 32.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 32.0 ],	//2
            				[ 32.0 , 32.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 32.0 ],	//3
            				[ 24.0 , 24.0 , 0.0, 0.0, 12.0, 12.0, 0.0, 0.0, 18.0 ],	//4
            				[ 18.0 , 18.0 , 0.0, 0.0, 24.0, 24.0, 0.0, 0.0, 18.0 ],	//5
            				[ 12.0 , 12.0 , 0.0, 0.0, 18.0, 18.0, 0.0, 0.0, 12.0 ],	//6
            				[ 18.0 , 18.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 32.0 ],	//7
            				[ 12.0 , 12.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 32.0 ] 	//8
        				];


		// Terrain elements
        let altSize = this.altimetry.length;
		this.terrain = new MyTerrain(this, altSize-1, this.altimetry);

		//Vehicle
		this.vehicleXPos = -5;
		this.vehicleYpos = 1.40;
		this.vehicleZPos = -10;

		//vehicles Array
		this.activeVehicle = 0; //indice
		this.vehicles = [];
		this.vehicle = new MyVehicle(this);
		this.vehicles.push(this.vehicle);

		//Crane
		//Please specify here the crane position, don't change anywhere else
		    this.craneXpos = 5;
		    this.craneYPos = 1.3;
		    this.craneZPos = -20;
		    this.craneRotation = 90*degToRad;
		this.crane = new MyCrane(this,this.craneXpos,this.craneYPos,-this.craneZPos, this.craneRotation);
		this.craneDisplaysCar = false;


		this.setTextureDropDown();

		//FPS
		this.FPS = 100;
		this.oldFps = 100;
		this.setUpdatePeriod(1000/this.FPS);

		//Luzes
		this.luz1 = true;
		this.luz2 = true;
		this.luz3 = true;
		this.luz4 = true;

		//Vehicle
		this.luzes = false;

		//options
		this.showAxis=true;
		this.option1=true;
		this.option2=false;

		this.keyAPressed = false;
		this.keyDPressed = false;
		this.keyWPressed = false;
		this.keySPressed = false;

		this.rotation=0;
		this.steering = 0;
		this.speed=0.1;
		this.compensateDirection = false;
	};

	setTextureDropDown(){
		this.currentVehicleAppearance = [];
		this.vehicleAppearances = [];
		this.vehicleAppearecesList = [];
		this.setTextureBodyDropDown();
		this.setTextureWindowsDropDown();
		this.setTextureWheelsDropDown();
		this.setTextureHeadlightsDropDown();
	}

	setTextureBodyDropDown(){
		let text1 = new CGFappearance(this);
  	text1.setAmbient(0.8,0.8,0.8,1);
		text1.setDiffuse(0.8,0.8,0.8,1);
		text1.setSpecular(0.1,0.1,0.1,1);
		text1.setShininess(120);
  	text1.loadTexture('../resources/images/redBull.jpg');

		let text2 = new CGFappearance(this);
    text2.setAmbient(0.8,0.8,0.8,1);
		text2.setDiffuse(0.8,0.8,0.8,1);
		text2.setSpecular(0.1,0.1,0.1,1);
		text2.setShininess(120);
    text2.loadTexture('../resources/images/dakar.jpg');

		this.vehicleAppearances[0] = [text1, text2];
		this.vehicleAppearecesList[0] = new Map();
		this.vehicleAppearecesList[0].set("redbull", 0);
		this.vehicleAppearecesList[0].set("dakar", 1);

		this.vehicleAppearancesB = [text1, text2];
		this.vehicleAppearecesListB = new Map();
		this.vehicleAppearecesListB.set("redbull", 0);
		this.vehicleAppearecesListB.set("dakar", 1);

		this.Body = "redbull";
		this.currentVehicleAppearanceB = this.vehicleAppearecesListB.get(this.Body);
	}

	setTextureWindowsDropDown(){
		let text1 = new CGFappearance(this);
  	text1.setAmbient(0.8,0.8,0.8,1);
		text1.setDiffuse(0.8,0.8,0.8,1);
		text1.setSpecular(0.1,0.1,0.1,1);
		text1.setShininess(120);
  	text1.loadTexture('../resources/images/glass.png');

		let text2 = new CGFappearance(this);
    text2.setAmbient(0.8,0.8,0.8,1);
		text2.setDiffuse(0.8,0.8,0.8,1);
		text2.setSpecular(0.1,0.1,0.1,1);
		text2.setShininess(120);
    text2.loadTexture('../resources/images/magnet.jpg');

		this.vehicleAppearances[1] = [text1, text2];
		this.vehicleAppearecesList[1] = new Map();
		this.vehicleAppearecesList[1].set("glass", 0);
		this.vehicleAppearecesList[1].set("magnet", 1);

		this.Windows = "glass";
		this.currentVehicleAppearance[1] = this.vehicleAppearecesList[1].get(this.Windows);
	}

	setTextureWheelsDropDown(){
		let text1 = new CGFappearance(this);
  	text1.setAmbient(0.8,0.8,0.8,1);
		text1.setDiffuse(0.8,0.8,0.8,1);
		text1.setSpecular(0.1,0.1,0.1,1);
		text1.setShininess(120);
  	text1.loadTexture('../resources/images/wheelTexture.jpg');

		let text2 = new CGFappearance(this);
    text2.setAmbient(0.8,0.8,0.8,1);
		text2.setDiffuse(0.8,0.8,0.8,1);
		text2.setSpecular(0.1,0.1,0.1,1);
		text2.setShininess(120);
    text2.loadTexture('../resources/images/pointer.png');

		this.vehicleAppearances[2] = [text1, text2];
		this.vehicleAppearecesList[2] = new Map();
		this.vehicleAppearecesList[2].set("wheelTexture", 0);
		this.vehicleAppearecesList[2].set("pointer", 1);

		this.Wheels = "wheelTexture";
		this.currentVehicleAppearance[2] = this.vehicleAppearecesList[2].get(this.Wheels);
	}

	setTextureHeadlightsDropDown(){
		let text1 = new CGFappearance(this);
  	text1.setAmbient(0.8,0.8,0.8,1);
		text1.setDiffuse(0.8,0.8,0.8,1);
		text1.setSpecular(0.1,0.1,0.1,1);
		text1.setShininess(120);
  	text1.loadTexture('../resources/images/lamp.jpg');

		let text2 = new CGFappearance(this);
    text2.setAmbient(0.8,0.8,0.8,1);
		text2.setDiffuse(0.8,0.8,0.8,1);
		text2.setSpecular(0.1,0.1,0.1,1);
		text2.setShininess(120);
    text2.loadTexture('../resources/images/donald.png');

		this.vehicleAppearances[3] = [text1, text2];
		this.vehicleAppearecesList[3] = new Map();
		this.vehicleAppearecesList[3].set("lamp", 0);
		this.vehicleAppearecesList[3].set("donald", 1);

		this.Headlights = "lamp";
		this.currentVehicleAppearance[3] = this.vehicleAppearecesList[3].get(this.Headlights);
	}

	checkKeys() {
		if (this.gui.isKeyPressed("KeyW") && !this.crane.shouldDisplayCar())
		{
				if(this.speed<1)
						this.speed+=0.01;
		}
		if (this.gui.isKeyPressed("KeyS") && !this.crane.shouldDisplayCar())
		{
				if(this.speed>-1)
					this.speed-=0.01;
		}
		if (this.gui.isKeyPressed("KeyA"))
		{
			this.compensateDirection=false;
			this.keyAPressed=true;
			if(this.rotation<34){
					this.rotation+=2;
			}
			this.steering+=10*this.speed;
		}

	if(this.keyAPressed && !this.gui.isKeyPressed("KeyA")){
		this.keyAPressed = false;
		this.compensateDirection=true;
	}

	if (this.gui.isKeyPressed("KeyD"))
		{
			this.compensateDirection=false;
			this.keyDPressed=true;
			if(this.rotation>-34){
					this.rotation-=2;
			}
			this.steering-=10*this.speed;
		}

		if(this.keyDPressed && !this.gui.isKeyPressed("KeyD")){
			this.keyDPressed = false;
			this.compensateDirection=true;
		}

		if (this.gui.isKeyPressed("KeyZ")){
			this.speed=0;
		}

}

	update(currTime){
		this.lastTime = this.lastTime || 0;

		this.deltaTime = currTime - this.lastTime;
		this.lastTime = currTime;

		//Update FPS
		if(this.FPS!=this.oldFps){
			this.setUpdatePeriod(1000/this.FPS);
			this.oldFps = this.Fps;
		}


		//Update texture car
		let index = this.vehicleAppearecesList[0].get(this.Body);
		if(index!=this.currentVehicleAppearance[0]){
			this.currentVehicleAppearance[0] = index;
			this.vehicles[this.activeVehicle].updateCarTexture("Body",this.vehicleAppearances[0][index]);
		}
		index = this.vehicleAppearecesList[1].get(this.Windows);
		if(index!=this.currentVehicleAppearance[1]){
			this.currentVehicleAppearance[1] = index;
			this.vehicles[this.activeVehicle].updateCarTexture("Windows",this.vehicleAppearances[1][index]);
		}
		index = this.vehicleAppearecesList[2].get(this.Wheels);
		if(index!=this.currentVehicleAppearance[2]){
			this.currentVehicleAppearance[2] = index;
			this.vehicles[this.activeVehicle].updateCarTexture("Wheels",this.vehicleAppearances[2][index]);
		}
		index = this.vehicleAppearecesList[3].get(this.Headlights);
		if(index!=this.currentVehicleAppearance[3]){
			this.currentVehicleAppearance[3] = index;
			this.vehicles[this.activeVehicle].updateCarTexture("Headlights",this.vehicleAppearances[3][index]);
		}

		
		//Update crane angle
		let xDif =  Math.abs(this.vehicles[this.activeVehicle].getXpos() - this.crane.getRXPosition());
		xDif += this.vehicleXPos;
		//console.log("xDif" + xDif);
		let zDif =  Math.abs(this.vehicles[this.activeVehicle].getZpos() - this.crane.getRZPosition());
		zDif += this.vehicleZPos;
		//console.log("RXPos: " + this.crane.getRXPosition());
        //console.log("RZPos: " + this.crane.getRZPosition());

		//console.log("zDif" + zDif);
		//console.log("Value -> " + (xDif<2 && zDif<2 && this.speed==0));
		if(xDif<2 && zDif<2 && this.speed==0){
			this.crane.update(this.deltaTime);
			if(this.crane.getCurrentState()==6){
				this.crane.setState(0);
			}
		}

		//Update car
		this.checkKeys();

		if(this.rotation == 0){
			this.compensateDirection=false;
		}

		if(this.compensateDirection){
			if(this.rotation>0){
				this.rotation-=2;
				this.steering+=10*this.speed;
			} else {
				this.rotation+=2;
				this.steering-=10*this.speed;
			}
		}

		//prevent speed when crane has the car
		if(!this.crane.shouldDisplayCar()){
						this.craneDisplaysCar = false;
            this.myInterface.speedSlider.domElement.style.pointerEvents = "click";
            this.myInterface.speedSlider.domElement.style.opacity = 1;
		} else {
            this.myInterface.speedSlider.domElement.style.pointerEvents = "none";
            this.myInterface.speedSlider.domElement.style.opacity = .5;
						this.craneDisplaysCar = true;
		}

		this.vehicles[this.activeVehicle].update(this.speed, this.steering, this.rotation);


	}

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		this.setGlobalAmbientLight(1,1,1, 1.0);

		// Positions for four lights
		this.lights[0].setPosition(-12.0, 5.0, 12.0, 1.0);
		//this.lights[0].setVisible(true);
		this.lights[0].setSpecular(1.0,1.0,1.0,1.0);
		this.lights[0].setAmbient(0, 0, 0, 1.0);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setConstantAttenuation(1.0);
		this.lights[0].setLinearAttenuation(0);
		this.lights[0].setQuadraticAttenuation(0);

		this.lights[1].setPosition(-12, 5.0, -12.0, 1.0);
		this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
		//this.lights[1].setVisible(true);
		this.lights[1].setAmbient(0, 0, 0, 1.0);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].setConstantAttenuation(1.0);
		this.lights[1].setLinearAttenuation(0);
		this.lights[1].setQuadraticAttenuation(0);

		this.lights[2].setPosition(12.0, 5.0, 12.0, 1.0);
		this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
		//this.lights[2].setVisible(true);
		this.lights[2].setAmbient(0, 0, 0, 1.0);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setConstantAttenuation(1.0);
		this.lights[2].setLinearAttenuation(0);
		this.lights[2].setQuadraticAttenuation(0);

		this.lights[3].setPosition(12.0, 5.0, -12.0, 1.0);
		this.lights[3].setSpecular(1.0, 1.0, 1.0, 1.0);
		//this.lights[3].setVisible(true);
		this.lights[3].setAmbient(0, 0, 0, 1.0);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setConstantAttenuation(1.0);
		this.lights[3].setLinearAttenuation(0);
		this.lights[3].setQuadraticAttenuation(0);

	};

	updateLights()
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}


	display()
	{

		//check Lights
		if(this.luz1){
				this.lights[0].enable();
		} else {
			this.lights[0].disable();
		}

		if(this.luz2){
				this.lights[1].enable();
		} else {
			this.lights[1].disable();
		}

		if(this.luz3){
				this.lights[2].enable();
		} else {
			this.lights[2].disable();
		}

		if(this.luz4){
				this.lights[3].enable();
		} else {
			this.lights[3].disable();
		}
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		if(this.showAxis){
			this.axis.display();
		}


		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		//this.pos-=0.1;
		this.pushMatrix();
			this.terrain.display();
		this.popMatrix();

		// this.pushMatrix();
         // 	this.translate(15,1.35,15);
         // 	this.rotate(90*degToRad,0,1,0);
		// 	this.vehicle.display();
		// this.popMatrix();
		// this.vehicle.controlLights(this.luzes);

        if(!this.craneDisplaysCar){
			this.pushMatrix();
				this.translate(this.vehicleXPos,this.vehicleYpos,this.vehicleZPos);
				//this.translate(0,1.35,0);
				//this.rotate(90*degToRad,0,1,0);
				this.vehicles[this.activeVehicle].display();
			this.popMatrix();
			//this.vehicle.controlLights(this.luzes);
        }

        this.pushMatrix();
			this.materialDefault.apply();
			this.translate(this.craneXpos,this.craneYPos,this.craneZPos);
        	//this.translate(0,1.3,0);
        	this.rotate(-this.craneRotation,0,1,0);
			this.crane.display(this.vehicles[this.activeVehicle]);
        this.popMatrix();

				this.pushMatrix();
				this.translate(0,0,30);
				this.external.display();
				this.popMatrix();
		// ---- END Scene drawing section
	};
};
