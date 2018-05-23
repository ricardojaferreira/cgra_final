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

    this.craneTexture = new CGFappearance(scene);
    this.craneTexture.setAmbient(0.8,0.8,0.8,1);
    this.craneTexture.setDiffuse(0.8,0.8,0.8,1);
    this.craneTexture.setSpecular(0.1,0.1,0.1,1); //alinea 8
    this.craneTexture.setShininess(120);
    this.craneTexture.loadTexture('../resources/images/crane.jpg');
  }

  setAngle(jointAngle){
    this.jointAngle = jointAngle;
  }

  getAngle(){
    return this.jointAngle;
  }

  display(craneRotation, vehicle, displayCar){
    //Base
    this.scene.pushMatrix();
      this.scene.rotate(-90*Math.PI/180,1,0,0);
      this.scene.scale(0.5,0.5,0.75);
        this.craneTexture.apply();
        this.base.display();
    this.scene.popMatrix();

    //Base circle
    this.scene.pushMatrix();
      this.scene.translate(0,0.75,0);
      this.scene.rotate(-90*Math.PI/180,1,0,0);
      this.scene.scale(0.5,0.5,0.75);
        this.craneTexture.apply();
        this.circle.display();
    this.scene.popMatrix();

    //ARMBASEJOINT
    this.scene.pushMatrix();
      this.scene.translate(0,this.height/2-1.5*Math.cos(45*Math.PI/180),(-0.35+this.height/2)*Math.cos(45*Math.PI/180));
      this.scene.rotate(-45*Math.PI/180,1,0,0);
      this.scene.scale(0.5,0.5,this.height);
        this.craneTexture.apply();
        this.armBaseJoint.display();
    this.scene.popMatrix();

    //ARMJOINTCABLE
    this.scene.pushMatrix();
      this.scene.translate(0,this.height/1.3,this.height*Math.cos(45*Math.PI/180));
      this.scene.rotate(this.jointAngle*Math.PI/180,1,0,0);
      this.armJointCable.display(this.jointAngle,craneRotation,vehicle,displayCar);
    this.scene.popMatrix();

  }
}
