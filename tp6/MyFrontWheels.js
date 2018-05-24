class MyFrontWheels extends CGFobject{

    /**
     * The constructor of class.
     * This class creates the two front wheels plus the axys between them.
     * Two objects MyWheel for the wheels and one object MyAxis for the axis.
     * @param scene - The project scene
     * @param slices - The number of slices used to create the cylinder
     * @param stacks - The number of stacks to create the cylinder
     */
  constructor(scene, slices, stacks)
  {
    super(scene);
    this.flWheel = new MyWheel(scene, slices, stacks);
    this.frWheel = new MyWheel(scene, slices, stacks);

    //axis
    this.fAxis = new MyAxis(scene,slices,stacks);
    this.wheelRotation = 0;
    this.steering = 0;
  };

    /**
     * Updates the texture of the wheels with the dat.gui interface
     * @param texture - The texture to apply
     */
  updateTexture(texture){
    this.flWheel.updateTexture(texture);
    this.frWheel.updateTexture(texture);
  }

    /**
     * Updates the angle of rotation of the wheels
     * @param steering - the rotation angle in radians
     */
  updateSteering(steering){
    this.steering=steering;
  }

    /**
     * Creates the rotation animation for the wheels
     * @param rotIncrement - the angle to rotate the wheels in radians
     */
  update(rotIncrement){
    this.wheelRotation+=rotIncrement;
  }

  display(){
    //Front Axis
    this.scene.pushMatrix();
      this.scene.translate(0, 0, -0.75);
      this.scene.rotate(-this.wheelRotation, 0,0,1);
      this.fAxis.display();
    this.scene.popMatrix();

    //front left Wheel
    this.scene.pushMatrix();
      this.scene.translate(0,0,0.95);
      this.scene.scale(0.6,0.6,0.6);
      //turn left/right
      this.scene.rotate(this.steering,0,1,0);
      //wheel rotation
      this.scene.rotate(-this.wheelRotation, 0,0,1);
      this.flWheel.display();
    this.scene.popMatrix();

    //front right Wheel
    this.scene.pushMatrix();
      this.scene.translate(0,0,-0.95);
      this.scene.rotate(180*(Math.PI / 180), 0, 1, 0);
      this.scene.scale(0.6,0.6,0.6);
      //turn left/right
      this.scene.rotate(this.steering,0,1,0);
      //wheel rotation
      this.scene.rotate(this.wheelRotation, 0,0,1);
      this.frWheel.display();
    this.scene.popMatrix();
  }
}
