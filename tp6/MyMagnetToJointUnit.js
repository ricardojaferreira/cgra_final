class MyMagnetToJointUnit extends CGFobject{
  constructor(scene){
    super(scene);

    let slices = 12;
    let stacks = 6;

    this.joint = new MyCylinder(scene,slices,stacks);
    this.circle = new MyCircle(scene,slices,0,1,0,1);

    this.armJointCable = new MyUnitCubeQuad(scene,0,1,0,1);
    this.magnetAndCable = new MyMagnetAndCable(scene);
    this.length = 4;
  }

  display(jointAngle,vehicle,displayCar){

    //JOINT
    this.scene.pushMatrix();
      this.scene.translate(0.5,0,0);
      this.scene.rotate(-90*Math.PI/180,0,1,0);
      this.scene.scale(1,1,1);
        this.joint.display();
    this.scene.popMatrix();

    //Base RIGHT JOINT
    this.scene.pushMatrix();

      this.scene.translate(-0.5,0,0);
      this.scene.rotate(-90*Math.PI/180,0,1,0);
      this.scene.scale(1,1,1);
        this.circle.display();
    this.scene.popMatrix();

    //Base LEFT JOINT
    this.scene.pushMatrix();
      this.scene.translate(0.5,0,0);
      this.scene.rotate(90*Math.PI/180,0,1,0);
      this.scene.scale(1,1,1);
        this.circle.display();
    this.scene.popMatrix();

    //ArmJointCable
    this.scene.pushMatrix();
      this.scene.translate(0,this.length/2,this.length/2);
      this.scene.rotate(-45*Math.PI/180,1,0,0);
      this.scene.scale(0.5,0.5,this.length);
        this.armJointCable.display();
    this.scene.popMatrix();

    //Magnet and Cable - FALTAR CALCULAR O ANGULO EM QUE È INSERIDO
    let d = (this.length-0.7)/Math.cos(45*Math.PI/180);
    let y = Math.sin((45-jointAngle)*Math.PI/180)*d;
    let z = Math.cos((45-jointAngle)*Math.PI/180)*d;
    this.scene.pushMatrix();
          //this.scene.translate(0,0,-(this.length-0.7));
          this.scene.rotate(-jointAngle*Math.PI/180,1,0,0);
          this.scene.rotate(-jointAngle*Math.PI/180,1,0,0);
          this.scene.translate(0,-y,-z)
          this.scene.rotate(jointAngle*Math.PI/180,1,0,0);
          this.scene.translate(0,y,z)
          this.scene.translate(0,0,this.length-0.7);
          //this.scene.rotate(-1*jointAngle*Math.PI/180,1,0,0);
          this.magnetAndCable.display();

          if(displayCar){
            this.scene.pushMatrix();
              this.scene.translate(0,-1.3,0);
              vehicle.display();
            this.scene.popMatrix();
          }
    this.scene.popMatrix();
  }
}
