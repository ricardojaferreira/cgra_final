class MyBaseToJointUnit extends CGFobject{
  constructor(scene){
    super(scene);

    let slices = 12;
    let stacks = 6;

    this.base = new MyCylinder(scene,slices,stacks);
    this.circle = new MyCircle(scene,slices,0,1,0,1);

    this.armBaseJoint = new MyUnitCubeQuad(scene,0,1,0,1);
    this.armJointCable = new MyMagnetToJointUnit(scene);

    this.jointAngle = 0;

    this.height = 10;
  }

  setAngle(jointAngle){
    this.jointAngle = jointAngle;
  }

  getAngle(){
    return this.jointAngle;
  }

  display(vehicle, displayCar){
    //Base
    this.scene.pushMatrix();
      this.scene.rotate(-90*Math.PI/180,1,0,0);
      this.scene.scale(0.5,0.5,0.75);
        this.base.display();
    this.scene.popMatrix();

    //Base circle
    this.scene.pushMatrix();
      this.scene.translate(0,0.75,0);
      this.scene.rotate(-90*Math.PI/180,1,0,0);
      this.scene.scale(0.5,0.5,0.75);
        this.circle.display();
    this.scene.popMatrix();

    //ARMBASEJOINT
    this.scene.pushMatrix();
      this.scene.translate(0,this.height/2-1.5*Math.cos(45*Math.PI/180),(-0.35+this.height/2)*Math.cos(45*Math.PI/180));
      this.scene.rotate(-45*Math.PI/180,1,0,0);
      this.scene.scale(0.5,0.5,this.height);
        this.armBaseJoint.display();
    this.scene.popMatrix();

    //ARMJOINTCABLE
    this.scene.pushMatrix();
      this.scene.translate(0,this.height/1.3,this.height*Math.cos(45*Math.PI/180));
      /*this.scene.rotate(-this.jointAngle*Math.PI/180,1,0,0);
      this.scene.translate(0,-2,-4)
      this.scene.rotate(this.jointAngle*Math.PI/180,1,0,0);
      this.scene.translate(0,2,4)*/
      this.scene.rotate(this.jointAngle*Math.PI/180,1,0,0);
      this.armJointCable.display(this.jointAngle,vehicle,displayCar);
    this.scene.popMatrix();

  }
}
