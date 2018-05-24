class MyBackWheels extends CGFobject{

    /**
     * The constructor of class.
     * This class creates the two back wheels plus the axys between them.
     * Two objects MyWheel for the wheels and one object MyAxis for the axis.
     * @param scene - The project scene
     * @param slices - The number of slices used to create the cylinder
     * @param stacks - The number of stacks to create the cylinder
     */
  constructor(scene, slices, stacks)
  {
    super(scene);
    this.blWheel = new MyWheel(scene, slices, stacks);
    this.brWheel = new MyWheel(scene, slices, stacks);

    //Create Axis
    this.rAxis = new MyAxis(scene,slices,stacks);
  };

    /**
     * Updates the texture of the wheels with the dat.gui interface
     * @param texture - The texture to apply
     */
  updateTexture(texture){
    this.blWheel.updateTexture(texture);
    this.brWheel.updateTexture(texture);
  }

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
