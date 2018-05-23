/**
 * Class that represents the crane and its pick-up platform.
 */
class MyCrane extends CGFobject{
    /**
     * Constructor of the crane Class.
     * @param scene - The scene of the project.
     * @param xPos - The x coordinate
     * @param yPos - The y coordinate
     * @param zPos - The z coordinate
     * @param rotation - The initial rotation
     */
  constructor(scene, xPos, yPos, zPos, rotation){
    super(scene);

    this.xPos = xPos;
    this.yPos = yPos;
    this.zPos = zPos;
    this.rotation = rotation;

    this.baseToJointUnit = new MyBaseToJointUnit(scene);
    this.baseAngle = 0;
    this.baseMaxAngle = 180;
    this.baseMinAngle = 0;

    this.jointMinAngle = 0;
    this.jointMaxAngle = 85;
    this.holdPositionTimer = 0;
    this.HoldTime = 2;

    this.displayCar = false;

    this.liftPlatformZpos = (10+4)*Math.cos(45*Math.PI/180);

    this.RXPosition = this.liftPlatformZpos*(Math.sin(this.rotation)) + this.xPos;
    this.RZPosition = this.liftPlatformZpos*(Math.cos(-this.rotation)) + this.zPos;

    this.state = 0;

    //Lift Platform
    this.liftPlatform = new MyPlatform(scene);

    this.platformTexture = new CGFappearance(scene);
    this.platformTexture.setAmbient(0.8,0.8,0.8,1);
    this.platformTexture.setDiffuse(0.8,0.8,0.8,1);
    this.platformTexture.setSpecular(0.1,0.1,0.1,1);
    this.platformTexture.setShininess(60);
    this.platformTexture.loadTexture('../resources/images/platform.jpg');
  }

    /**
     * Function that defines the coordinates for the vehicle to start falling.
     * @param vehicle - The current vehicle
     */
  releaseVehicle(vehicle){
    vehicle.setXpos(this.xPos-this.liftPlatformZpos+4);
    vehicle.setYpos(this.yPos+5);
    vehicle.setZpos(this.zPos+0.5);
    vehicle.rotate=true;
    vehicle.falling=true;
    this.displayCar=false;
  }

    /**
     * Deals with the crane animation. Implemented with a state machine with 6 states.
     * Uses the time elapsed since the last update call.
     * @param deltaTime - time elapsed since the last update
     */
  update(deltaTime){
    if(deltaTime>100000)
      return;

    this.animationSpeed = deltaTime/(1000/5);
    if(this.state==0){
      let angle = this.baseAngle + this.animationSpeed*(360/60);
      if(angle<this.baseMaxAngle)
        this.baseAngle = angle;
      else{
          this.state = 1;
      }
    }
    else if(this.state==1){
      this.gotoMaxJointAngle(deltaTime, 2);
    }
    else if(this.state == 2){
        this.displayCar=true;
      this.holdPositionTimer += this.animationSpeed;
      if(this.holdPositionTimer>this.HoldTime){
        this.state = 3;
        this.holdPositionTimer = 0;
      }
    }
    else if(this.state == 3){
      this.gotoMinJointAngle(deltaTime, 4);
    }
    else if(this.state == 4){
      let angle = this.baseAngle - this.animationSpeed*(360/60);
      if(angle>this.baseMinAngle)
        this.baseAngle = angle;
      else
        this.state = 5;
    }
    else if(this.state == 5){ //LARGAR CARRO
      this.holdPositionTimer += this.animationSpeed;
      if(this.holdPositionTimer>this.HoldTime)
        this.state = 6;
    }

  }

    /**
     * Lowers the arm and its magnet towards the car.
     * @param deltaTime - The time elapsed since the last update
     * @param nextState - The value of the following state
     */
  gotoMaxJointAngle(deltaTime, nextState){
    let angle = this.baseToJointUnit.getAngle()+(this.animationSpeed)*(360/60);
    if(angle<this.jointMaxAngle)
      this.baseToJointUnit.setAngle(angle);
    else
      this.state = nextState;
  }

    /**
     * Raises the arm and its magnet toward the initial position.
     * @param deltaTime - The time elapsed since the last update
     * @param nextState - The value of the following state
     */
  gotoMinJointAngle(deltaTime, nextState){
    let angle = this.baseToJointUnit.getAngle()-(this.animationSpeed)*(360/60);
    if(angle>this.jointMinAngle)
      this.baseToJointUnit.setAngle(angle);
    else
      this.state = nextState;
  }

  display(vehicle){
    this.scene.pushMatrix();
      this.scene.translate(0,-this.yPos+0.2,-this.liftPlatformZpos);
      this.platformTexture.apply();
      this.liftPlatform.display();
    this.scene.popMatrix();

    //MyBaseToJointUnit
    this.scene.pushMatrix();
        this.scene.rotate(this.baseAngle*Math.PI/180,0,1,0);
        this.baseToJointUnit.display(this.rotation, vehicle, this.shouldDisplayCar());
    this.scene.popMatrix();
  }

  getCurrentState(){
    return this.state;
  }

  setState(state){
    this.state = state;
  }

  shouldDisplayCar(){
    return (this.displayCar);
  }

  getRXPosition(){
    return this.RXPosition;
  }

  getRZPosition(){
    return this.RZPosition;
  }

  getRotation(){
    return this.rotation;
  }

}
