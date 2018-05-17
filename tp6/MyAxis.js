class MyAxis extends CGFobject{
  constructor(scene, slices, stacks)
  {
    super(scene);
    this.axis = new MyCylinder(scene,slices,stacks);

    this.axisTexture = new CGFappearance(scene);
    this.axisTexture.setAmbient(0.8,0.8,0.8,1);
    this.axisTexture.setDiffuse(0.8,0.8,0.8,1);
    this.axisTexture.setSpecular(0.1,0.1,0.1,1);
    this.axisTexture.setShininess(120);
    this.axisTexture.loadTexture('../resources/images/metalTexture.jpg');
  }

  display(){
    //Axis
    this.scene.pushMatrix();
      this.scene.scale(0.15, 0.15, 1.5);
      this.axisTexture.apply();
      this.axis.display();
    this.scene.popMatrix();
  }
}
