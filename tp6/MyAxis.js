class MyAxis extends CGFobject{
  constructor(scene, slices, stacks)
  {
    super(scene);
    this.axis = new MyCylinder(scene,slices,stacks);
  }

  display(){
    //Axis
    this.scene.pushMatrix();
      this.scene.scale(0.15, 0.15, 3.5);
      this.axis.display();
    this.scene.popMatrix();
  }
}
