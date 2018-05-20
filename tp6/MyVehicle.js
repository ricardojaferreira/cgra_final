class MyVehicle extends CGFobject{
  constructor(scene)
  {
    super(scene);
    this.car = new MyCar(scene);

    //lights
    //scene.lights[5].setPosition(2.3, 1.3, 0.8, 1.0);
    scene.lights[5].setVisible(false);
    scene.lights[5].setSpecular(1.0,1.0,1.0,1.0);
    scene.lights[5].setAmbient(0, 0, 0, 1.0);
    scene.lights[5].setDiffuse(1.0, 1.0, 1.0, 1.0);
    scene.lights[5].setConstantAttenuation(1.0);
    scene.lights[5].setLinearAttenuation(0);
    scene.lights[5].setQuadraticAttenuation(0);

    //lights
    //scene.lights[6].setPosition(2.3, 1.3, -0.8, 1.0);
    scene.lights[6].setVisible(false);
    scene.lights[6].setSpecular(1.0,1.0,1.0,1.0);
    scene.lights[6].setAmbient(0, 0, 0, 1.0);
    scene.lights[6].setDiffuse(1.0, 1.0, 1.0, 1.0);
    scene.lights[6].setConstantAttenuation(1.0);
    scene.lights[6].setLinearAttenuation(0);
    scene.lights[6].setQuadraticAttenuation(0);

    //Time Variables
    this.elapsed = 0;
    this.time = 0;

    //init Positions
    this.xPos = 0;
    this.yPos = 0;
    this.zPos = 0;

    this.steering=0;

  };

  updateCarTexture(texture){
    this.car.updateTexture(texture);
  }

  lights(onoff){
    if(onoff){
      this.scene.lights[5].enable();
      this.scene.lights[6].enable();
    } else {
      this.scene.lights[5].disable();
      this.scene.lights[6].disable();
    }
  }

  controlLights(onoff){
    this.lights(onoff);
  }

  getXpos(){
    return this.xPos;
  }

  setXpos(xPos){
    this.xPos = xPos;
  }

  getZpos(){
    return this.zPos;
  }

  setZpos(zPos){
    return this.zpos = zPos;
  }

  getYpos(){
    return this.yPos;
  }

  setYpos(yPos){
    this.yPos = yPos;
  }

  getRotation(){
    return this.steering;
  }

  setRotation(rotation){
    this.steering = rotation;
  }

  update(speed, steering, rotation){

    this.car.update(speed*10, rotation*degToRad);
    this.xPos+=(Math.cos(steering*degToRad)*speed);
    this.zPos+=(Math.sin(steering*degToRad)*speed);
    this.steering = steering*degToRad;

  }

  display(){
    //this.scene.lights[5].setPosition(2.3+this.xPos, 1.3, 0.8+this.zPos, 1.0);
    //this.scene.lights[6].setPosition(2.3+this.xPos, 1.3, -0.8+this.zPos, 1.0);


    this.scene.pushMatrix();
      this.scene.translate(this.xPos,this.yPos,-this.zPos);
      this.scene.rotate(this.steering, 0,1,0);
      this.car.display();
    this.scene.popMatrix();
  };
}
