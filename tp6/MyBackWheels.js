class MyBackWheels extends CGFobject{
  constructor(scene, slices, stacks)
  {
    super(scene);
    this.blWheel = new MyWheel(scene, slices, stacks);
    this.brWheel = new MyWheel(scene, slices, stacks);

    //Create Axis
    this.rAxis = new MyAxis(scene,slices,stacks);
  };

  display(){

    this.scene.pushMatrix();
      this.scene.translate(0, 0, -0.75);
      this.rAxis.display();
    this.scene.popMatrix();

    //back left Wheel
    this.scene.pushMatrix();
      this.scene.translate(0, 0, 0.95);
      this.scene.scale(0.6,0.6,0.6);
      this.blWheel.display();
    this.scene.popMatrix();

    //back right Wheel
    this.scene.pushMatrix();
      this.scene.translate(0, 0, -0.95);
      this.scene.rotate(180*(Math.PI / 180), 0, 1, 0);
      this.scene.scale(0.6,0.6,0.6);
      this.brWheel.display();
    this.scene.popMatrix();
  }
}
