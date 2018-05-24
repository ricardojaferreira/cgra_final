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

        //options
        this.showAxis=true;

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
        this.textureMap = new Map();
        this.textureMap.set(0,"Body");
        this.textureMap.set(1,"Windows");
        this.textureMap.set(2,"Wheels");
        this.textureMap.set(3,"Headlights");
        this.textures = [];

        this.Body = "redbull";
        this.Windows = "glass";
        this.Wheels = "wheelTexture";
        this.Headlights = "lamp";

        this.currentVehicleAppearance = [];
        this.vehicleAppearances = [];
        this.vehicleAppearecesList = [];

        this.fillAppearancesObjects(0,"redBull.jpg","dakar.jpg","redbull","dakar");
        this.fillAppearancesObjects(1,"glass.png","magnet.jpg","glass","magnet");
        this.fillAppearancesObjects(2,"wheelTexture.jpg","pointer.png","wheelTexture","pointer");
        this.fillAppearancesObjects(3,"lamp.jpg","donald.png","lamp","donald");
    }

    fillAppearancesObjects(index, textureFileName1, textureFileName2, texture1, texture2){
        let text1 = new CGFappearance(this);
        text1.setAmbient(0.8,0.8,0.8,1);
        text1.setDiffuse(0.8,0.8,0.8,1);
        text1.setSpecular(0.1,0.1,0.1,1);
        text1.setShininess(120);
        text1.loadTexture('../resources/images/'+textureFileName1);

        let text2 = new CGFappearance(this);
        text2.setAmbient(0.8,0.8,0.8,1);
        text2.setDiffuse(0.8,0.8,0.8,1);
        text2.setSpecular(0.1,0.1,0.1,1);
        text2.setShininess(120);
        text2.loadTexture('../resources/images/'+textureFileName2);

        this.vehicleAppearances[index] = [text1, text2];
        this.vehicleAppearecesList[index] = new Map();
        this.vehicleAppearecesList[index].set(texture1, 0);
        this.vehicleAppearecesList[index].set(texture2, 1);

        this.currentVehicleAppearance[index] = this.vehicleAppearecesList[index].get(texture1);
    }

    checkKeys(deltaTime) {
        if (this.gui.isKeyPressed("KeyW") && !this.crane.shouldDisplayCar())
        {
            if(this.speed<0.5)
                this.speed+=0.01;
        }
        if (this.gui.isKeyPressed("KeyS") && !this.crane.shouldDisplayCar())
        {
            if(this.speed>-0.5)
                this.speed-=0.01;
        }
        if (this.gui.isKeyPressed("KeyA"))
        {
            this.compensateDirection=false;
            this.keyAPressed=true;
            if(this.rotation<34){
                this.rotation+=0.2*deltaTime;
            } else{
                this.rotation=34;
            }
            this.steering+=0.3*this.speed*deltaTime;
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
                this.rotation-=0.2*deltaTime;
            } else{
                this.rotation=-34;
            }
            this.steering-=0.3*this.speed*deltaTime;
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
        this.textures[0] = this.Body;
        this.textures[1] = this.Windows;
        this.textures[2] = this.Wheels;
        this.textures[3] = this.Headlights;

        for(let i=0; i<this.textures.length; i++){
            let index = this.vehicleAppearecesList[i].get(this.textures[i]);
            if(index!=this.currentVehicleAppearance[i]){
                this.currentVehicleAppearance[i] = index;
                this.vehicles[this.activeVehicle].updateCarTexture(this.textureMap.get(i),this.vehicleAppearances[i][index]);
            }
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
                this.crane.releaseVehicle(this.vehicles[this.activeVehicle]);
                this.crane.setState(0);
            }
        }

        //Update car
        this.checkKeys(this.deltaTime);


        if(this.rotation > 0 && this.rotation < 3){
            this.compensateDirection=false;
            this.rotation=0;
            this.steering=Math.round(this.steering);
        }

        if(this.compensateDirection){
            if(this.rotation>0){
                this.rotation-=0.2*this.deltaTime;
                this.steering-=0.1*this.speed*this.deltaTime;
            } else {
                this.rotation+=0.2*this.deltaTime;
                this.steering+=0.1*this.speed*this.deltaTime;
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

        if(this.vehicles[this.activeVehicle].carDead){
            this.vehicleXPos = -5;
            this.vehicleYpos = 1.40;
            this.vehicleZPos = -10;
            this.steering=0;
            let v = new MyVehicle(this);
            this.vehicles.push(v);
            this.activeVehicle+=1;
            this.resetTextures();
        }

        this.vehicles[this.activeVehicle].update(this.deltaTime,this.speed, this.steering, this.rotation);
    }

    resetTextures(){
        this.textures[0] = this.Body;
        this.textures[1] = this.Windows;
        this.textures[2] = this.Wheels;
        this.textures[3] = this.Headlights;

        for(let i=0; i<this.textures.length; i++){
            let index = this.vehicleAppearecesList[i].get(this.textures[i]);
            this.currentVehicleAppearance[i] = index;
            this.vehicles[this.activeVehicle].updateCarTexture(this.textureMap.get(i),this.vehicleAppearances[i][index]);
        }
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

        this.pushMatrix();
        this.terrain.display();
        this.popMatrix();

        //Display active vehicles
        if(!this.crane.shouldDisplayCar()){
            this.pushMatrix();
            this.translate(this.vehicleXPos,this.vehicleYpos,this.vehicleZPos);
            this.vehicles[this.activeVehicle].display();
            this.popMatrix();
        }

        this.pushMatrix();
        this.materialDefault.apply();
        this.translate(this.craneXpos,this.craneYPos,this.craneZPos);
        this.rotate(-this.craneRotation,0,1,0);
        this.crane.display(this.vehicles[this.activeVehicle]);
        this.popMatrix();

        //Display dead vehicles
        for(let i=0; i<this.activeVehicle;i++){
            this.pushMatrix();
            this.translate(this.vehicleXPos,this.vehicleYpos,this.vehicleZPos);
            this.vehicles[i].display();
            this.popMatrix();
        }

        this.pushMatrix();
        this.translate(0,0,30);
        this.external.display();
        this.popMatrix();
        // ---- END Scene drawing section
    };
};