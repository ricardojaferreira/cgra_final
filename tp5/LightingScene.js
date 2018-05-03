var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

var FPS = 10;

class LightingScene extends CGFscene
{
	constructor()
	{
		super();
	};

	init(application)
	{
		super.init(application);

		this.initCameras();

		this.initLights();

		this.enableTextures(true);

		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		// Scene elements
		this.table = new MyTable(this);
		this.wall = new MyQuad(this, -0.5, 1.5, -0.5, 1.5);
		this.floor = new MyQuad(this, 0, 10, 0, 12);

		this.boardA = new Plane(this, BOARD_A_DIVISIONS);
		this.boardB = new Plane(this, BOARD_B_DIVISIONS);

		this.cylinder = new MyCylinder(this,8,20);
		this.cylinder2 = new MyCylinder(this,8,20);

		this.circle = new MyCircle(this,8,0,1,0,1);

		this.clock = new MyClock(this,12,1);

		this.paperPlane = new MyPaperPlane(this);
		this.pPlaneInitXpos = 14;
		this.pPlaneInitYpos = 4.2;
		this.pPlaneRotation = 0;

		//this.clockHand = new MyClockHand(this);

		// Materials
		this.materialDefault = new CGFappearance(this);

		// Floor Appearance
		this.floortexture = new CGFappearance(this);
    this.floortexture.setAmbient(0.3,0.3,0.3,1);
		this.floortexture.setDiffuse(0.8,0.8,0.8,1);
		this.floortexture.setSpecular(0.33,0.18,0.05,1); //alinea 8
		this.floortexture.setShininess(1);
    this.floortexture.loadTexture('../resources/images/floor.png');

		//Window Appearance
		this.windowAppearance = new CGFappearance(this);
    this.windowAppearance.setAmbient(0.3,0.3,0.3,1);
		this.windowAppearance.setDiffuse(0.8,0.8,0.8,1);
		this.windowAppearance.setSpecular(0.33,0.18,0.05,1); //alinea 8
		this.windowAppearance.setShininess(1);
    this.windowAppearance.loadTexture('../resources/images/window.png');
		this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

		//slides Appearance
		this.slidesAppearance = new CGFappearance(this);
    this.slidesAppearance.setAmbient(0.8,0.8,0.8,1);
		this.slidesAppearance.setDiffuse(0.8,0.8,0.8,1);
		this.slidesAppearance.setSpecular(0.1,0.1,0.1,1); //alinea 8
		this.slidesAppearance.setShininess(120);
    this.slidesAppearance.loadTexture('../resources/images/slides.png');

		//Board Appearance
		this.boardAppearance = new CGFappearance(this);
    this.boardAppearance.setAmbient(0.8,0.8,0.8,1);
		this.boardAppearance.setDiffuse(0.1,0.1,0.1,1);
		this.boardAppearance.setSpecular(0.5,0.5,0.5,1); //alinea 8
		this.boardAppearance.setShininess(1);
    this.boardAppearance.loadTexture('../resources/images/board.png');

		//Pillar Appearance
		this.pilartexture = new CGFappearance(this);
    this.pilartexture.setAmbient(0.3,0.3,0.3,1);
		this.pilartexture.setDiffuse(0.8,0.8,0.8,1);
		this.pilartexture.setSpecular(0.33,0.18,0.05,1); //alinea 8
		this.pilartexture.setShininess(1);
    this.pilartexture.loadTexture('../resources/images/window.png');

		this.setUpdatePeriod(1000/FPS);

	};

	update(currTime){
		this.lastTime = this.lastTime || 0;

		this.deltaTime = currTime - this.lastTime;
		this.lastTime = currTime;

		this.clock.update(this.deltaTime);

		//this.paperPlane.update(this.deltaTime);

	}

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		this.setGlobalAmbientLight(0,0,0, 1.0);

		// Positions for four lights
		this.lights[0].setPosition(4.0, 6.0, 1.0, 1.0);
		//this.lights[0].setVisible(true);
		this.lights[0].setSpecular(1.0,1.0,1.0,1.0);
		this.lights[0].setAmbient(0, 0, 0, 1.0);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setConstantAttenuation(1.0);
		this.lights[0].setLinearAttenuation(0);
		this.lights[0].setQuadraticAttenuation(0);

		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		//this.lights[1].setVisible(true);
		this.lights[1].setAmbient(0, 0, 0, 1.0);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].setConstantAttenuation(1.0);
		this.lights[1].setLinearAttenuation(0);
		this.lights[1].setQuadraticAttenuation(0);

		this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
		//this.lights[2].setVisible(true);
		this.lights[2].setAmbient(0, 0, 0, 1.0);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setConstantAttenuation(0);
		this.lights[2].setLinearAttenuation(1.0);
		this.lights[2].setQuadraticAttenuation(0);

		this.lights[3].setPosition(4.0, 6.0, 5.0, 1.0);
		//this.lights[3].setVisible(true);
		this.lights[3].setAmbient(0, 0, 0, 1.0);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setConstantAttenuation(0);
		this.lights[3].setLinearAttenuation(0);
		this.lights[3].setQuadraticAttenuation(0.1);

		this.lights[0].enable();
		this.lights[1].enable();
		this.lights[2].enable();
		this.lights[3].enable();
	};

	updateLights()
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}


	display()
	{
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
		this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		// Floor
		this.pushMatrix();
			this.translate(7.5, 0, 7.5);
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(15, 15, 0.2);
			this.floortexture.apply();
			this.floor.display();
		this.popMatrix();

		// Left Wall
		this.pushMatrix();
			this.translate(0, 4, 7.5);
			this.rotate(90 * degToRad, 0, 1, 0);
			this.scale(15, 8, 0.2);
			this.windowAppearance.apply();
			this.wall.display();
		this.popMatrix();

		// Plane Wall
		this.pushMatrix();
			this.translate(7.5, 4, 0);
			this.scale(15, 8, 0.2);
			this.materialDefault.apply();
			this.wall.display();
		this.popMatrix();

		// First Table
		this.pushMatrix();
			this.translate(5, 0, 8);
			this.table.display();
		this.popMatrix();

		// Second Table
		this.pushMatrix();
			this.translate(12, 0, 8);
			this.table.display();
		this.popMatrix();

		// Board A
		this.pushMatrix();
			this.translate(4, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
			this.slidesAppearance.apply();
			this.boardA.display();
		this.popMatrix();

		// Board B
		this.pushMatrix();
			this.translate(10.5, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
			this.boardAppearance.apply();
			this.boardB.display();
		this.popMatrix();

		this.pushMatrix();
			this.scale(1, 8, 1);
			this.rotate(-90*degToRad, 1, 0, 0);
			this.translate(5, -12, 0);
			this.pilartexture.apply();
			this.cylinder.display();
		this.popMatrix();


			this.pushMatrix();
				this.scale(1, 8, 1);
				this.rotate(-90*degToRad, 1, 0, 0);
				this.translate(10, -12, 0);
				this.pilartexture.apply();
				this.cylinder.display();
			this.popMatrix();

			this.pushMatrix();
				this.translate(7.5, 7, 0);
				this.materialDefault.apply();
				this.clock.display();
			this.popMatrix();

			// Paper Plane
			this.pushMatrix();
			this.translate(this.pPlaneInitXpos, this.pPlaneInitYpos, 8);

				if((this.pPlaneInitXpos - 1.5) > 0){
					this.pPlaneInitXpos-=0.1;
					this.pPlaneInitYpos+=0.02;
				} else {
					if((this.pPlaneInitYpos) > 0){
							this.pPlaneInitYpos-=0.04;
					}

					if(this.pPlaneRotation < 180){
							this.pPlaneRotation+=1;
					}
				}
				
				this.rotate(-90*degToRad, 0, 1, 0);
				this.rotate(this.pPlaneRotation*degToRad, 0, 0, 1);
				this.materialDefault.apply();
				this.paperPlane.display();
			this.popMatrix();




		// ---- END Scene drawing section
	};
};
