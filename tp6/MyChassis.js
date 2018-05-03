//let degToRad = Math.PI / 180.0;

class MyChassis extends CGFobject{
  constructor(scene, slices, stacks)
  {
    super(scene);
    this.flWheel = new MyWheel(scene, slices, stacks);
    this.frWheel = new MyWheel(scene, slices, stacks);
    this.blWheel = new MyWheel(scene, slices, stacks);
    this.brWheel = new MyWheel(scene, slices, stacks);

    this.fAxis = new MyAxis(scene,slices,stacks);
    this.rAxis = new MyAxis(scene,slices,stacks);
  }

  display(){

    //Front Axis
    this.scene.pushMatrix();
      this.scene.translate(0, 0, -3);
      this.fAxis.display();
    this.scene.popMatrix();

    //Rear Axis
    this.scene.pushMatrix();
      this.scene.translate(4.5, 0, -3);
      this.rAxis.display();
    this.scene.popMatrix();

      //front left Wheel
      this.scene.pushMatrix();
        this.flWheel.display();
      this.scene.popMatrix();

      //front right Wheel
      this.scene.pushMatrix();
        this.scene.translate(0, 0, -3);
        this.scene.rotate(180*(Math.PI / 180), 0, 1, 0);
        this.frWheel.display();
      this.scene.popMatrix();

      //back left Wheel
      this.scene.pushMatrix();
        this.scene.translate(4.5, 0, 0);
        this.blWheel.display();
      this.scene.popMatrix();

      //back right Wheel
      this.scene.pushMatrix();
        this.scene.translate(4.5, 0, -3);
        this.scene.rotate(180*(Math.PI / 180), 0, 1, 0);
        this.brWheel.display();
      this.scene.popMatrix();

  }
}
