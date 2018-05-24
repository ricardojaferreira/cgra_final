class MyAxis extends CGFobject{

    /**
     * The constructor of class.
     * This class creates an axis to be applied between the wheels of the car.
     * It uses one class MyCylinder to create the axis.
     * It also sets one texture to apply to this class.
     * @param scene - The project scene
     * @param slices - The number of slices used to create the cylinder
     * @param stacks - The number of stacks to create the cylinder
     */
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
