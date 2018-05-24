class MyVehicle extends CGFobject{

    /**
     * The constructor of the class.
     * This class is used has an interface between the scene and the car. It simplifies the calculation of the car
     * movements and position in relation to the scene. From this class all the car components are updated, wheel
     * rotation, wheel movement, car moving through the scene
     * @param scene - The project scene
     */
  constructor(scene)
  {
    super(scene);
    this.car = new MyCar(scene);

    //init Positions
    this.xPos = 0;
    this.yPos = 0;
    this.zPos = 0;

    this.steering=0;
    this.fallingSpeed = 0.5;

    this.rotate=false;
    this.falling=false;
    this.carDead=false;
  };


    /**
     * Function used to update the car texture using the dat.gui interface
     * @param name - The name of the car part to update
     * @param texture - The texture to apply
     */
  updateCarTexture(name,texture){
    this.car.updateTexture(name,texture);
  }

    /**
     * Returns the actual x position of the car
     * @returns {number| the x coordinate}
     */
  getXpos(){
    return this.xPos;
  }

    /**
     * Sets the x position of the car
     * @param - xPos the new xPos to set
     */
  setXpos(xPos){
    this.xPos = xPos;
  }

    /**
     * Returns the z position of the car
     * @returns {number| the z coordinate}
     */
  getZpos(){
    return this.zPos;
  }

    /**
     * Sets the z position of the car
     * @param zPos the zPos of the car
     */
  setZpos(zPos){
    this.zpos = zPos;
  }

    /**
     * Returns the actual y pos of the car
     * @returns {number| the y coordinate}
     */
  getYpos(){
    return this.yPos;
  }

    /**
     * Sets the y position of the car
     * @param - yPos
     */
  setYpos(yPos){
    this.yPos = yPos;
  }

    /**
     * Returns the actual position of the car
     * @returns {number| the degree of rotation in radians}
     */
  getRotation(){
    return this.steering;
  }

    /**
     * Sets a new degree of rotation for the car
     * @param rotation - the new degree in radians
     */
  setRotation(rotation){
    this.steering = rotation;
  }

    /**
     * Used to update the animation of the vehicle. This update is dependent of the execution time, this means that
     * changing the Frames per second will give the same result, only more slow. This method updates the car position,
     * rotation and the wheels animation.
     * @param deltaTime - The elapsed time between calls to this methos
     * @param speed - The new speed of the vehicle
     * @param steering - The new angle to rotate the vehicle
     * @param rotation - The new angle to rotate the wheels
     */
  update(deltaTime, speed, steering, rotation){
    if(deltaTime>10000)
      return;

    let time = deltaTime/50;

    this.car.update(speed*10*time, rotation*degToRad);
    this.xPos+=(Math.cos(steering*degToRad)*speed*time);
    if(this.yPos>0 && this.falling){
      this.yPos-=this.fallingSpeed*time;
    }
    this.zPos+=(Math.sin(steering*degToRad)*speed*time);
    this.steering = steering*degToRad;
    if(this.rotate){
      this.steering+=(180*degToRad);
    }

    if(this.falling && (this.yPos==0 || this.yPos<0)){
      this.carDead = true;
    }

  }

  display(){
    this.scene.pushMatrix();
      this.scene.translate(this.xPos,this.yPos,-this.zPos);
      this.scene.rotate(this.steering, 0,1,0);
      this.car.display();
    this.scene.popMatrix();
  };
}
